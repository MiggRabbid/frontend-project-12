import { useRef, useEffect } from 'react';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';

import useAuth from '../../hooks/index';
import { actions as authActions } from '../../slices/authSlice';
import routes from '../../routes';
import logo from '../../img/logo800-800.png';

const TestErrorLogin = () => {
  const testErrorLogin = new Error('Тестовая ошибка для Rollbar в Login');
  throw testErrorLogin;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const passwordRef = useRef(null);
  const usernameRef = useRef();
  const { user, logIn } = useAuth();

  const error = useSelector((state) => state.authReducer.error);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      axios.post(routes.loginRequestPath(), values)
        .then((response) => {
          logIn(response.data);
          navigate(routes.chatPagePath());
        })
        .catch((e) => {
          console.error(e);
          if (!e.isAxiosError) {
            toast.error(t('toasts.auth.unknownErr'));
          } else if (e.response.status === 401) {
            dispatch(authActions.loginFailed(e.response.data));
          } else {
            toast.error(t('toasts.auth.networkErr'));
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate(routes.chatPagePath());
    } else {
      usernameRef.current.focus();
    }
  }, []);

  return (
    !user && (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <TestErrorLogin />
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center position-relative">
                <img src={logo} alt="Simple Chat" className="rounded-circle" style={{ width: 200, height: 200 }} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('authorization.login.title')}</h1>
                <Form.Group>
                  <FloatingLabel
                    htmlFor="usernameInput"
                    controlId="username"
                    label={t('authorization.login.inputName.label')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder={t('authorization.login.inputName.placeholder')}
                      autoComplete="username"
                      required
                      ref={usernameRef}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel htmlFor="passwordInput" controlId="password" label={t('authorization.login.inputPass.label')} className="mb-4">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder={t('authorization.login.inputPass.placeholder')}
                      className="form-control"
                      autoComplete="current-password"
                      required
                      ref={passwordRef}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t('authorization.login.errors.invalidNameOrPass')}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                  {t('authorization.login.button')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('authorization.login.footer.text')}</span>
                <a href="/signup">{t('authorization.login.footer.link')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  );
};

export default Login;
