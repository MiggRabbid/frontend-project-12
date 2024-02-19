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
import * as yup from 'yup';

import useAuth from '../../hooks/index';
import { actions as authActions } from '../../slices/authSlice';
import routes from '../../routes';

import logo from '../../assets/logo800-800.png';

const getValidationSchema = (t) => yup.object({
  username: yup.string().trim()
    .min(3, t('validationError.wronglengthName'))
    .max(20, t('validationError.wronglengthName'))
    .required(t('validationError.requiredField')),
  password: yup.string()
    .min(6, t('validationError.wronglengthPass'))
    .required(t('validationError.requiredField')),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], t('validationError.invalidPassConfirm')),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPassword = useRef();
  const { logIn } = useAuth();
  const error = useSelector((state) => state.authReducer.error);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: getValidationSchema(t),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      axios.post(routes.signupRequestPath(), {
        username: values.username,
        password: values.password,
      })
        .then((response) => {
          logIn(response.data);
          navigate(routes.chatPagePath());
        })
        .catch((e) => {
          console.error(e);
          if (!e.isAxiosError) {
            toast.error(t('toasts.auth.unknownErr'));
          } else if (e.response.status === 409) {
            dispatch(authActions.loginFailed(e.response.data));
          } else {
            toast.error(t('toasts.auth.networkErr'));
          }
        }).finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={logo} alt="Simple Chat" className="rounded-circle" style={{ width: 200, height: 200 }} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('authorization.signUp.title')}</h1>
                <Form.Group>
                  <FloatingLabel htmlFor="username" controlId="username" label={t('authorization.signUp.inputName.label')} className="mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder={t('authorization.signUp.inputName.placeholder')}
                      autoComplete="username"
                      ref={usernameRef}
                      required
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.username || !!error}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel htmlFor="password" controlId="password" label={t('authorization.signUp.inputPass.label')} className="mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder={t('authorization.signUp.inputPass.placeholder')}
                      autoComplete="new-password"
                      required
                      ref={passwordRef}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.password || !!error}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel htmlFor="confirmPassword" controlId="confirmPassword" label={t('authorization.signUp.inputConfirmPass.label')} className="mb-4">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder={t('authorization.signUp.inputConfirmPass.placeholder')}
                      autoComplete="current-password"
                      required
                      ref={confirmPassword}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.confirmPassword || !!error}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{(formik.errors.confirmPassword || t('validationError.thisUserExists'))}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                  {t('authorization.signUp.button')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
