import React, { useRef, useEffect } from 'react';
import {
  Button, Overlay, FloatingLabel, Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

import { actions as authActions } from '../../slices/authSlice';
import logo from '../../img/logo800-800.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const usernameRef = useRef();

  const error = useSelector((state) => state.authReducer.error);
  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      axios.post('/api/v1/login', values)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
          dispatch(authActions.loginSuccess(response.data));
          navigate('/');
        })
        .catch((e) => {
          dispatch(authActions.loginFailed(e.response.data));
          console.error(e);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center position-relative">
                <img src={logo} alt="Simple Chat" className="rounded-circle" style={{ width: 200, height: 200 }} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0 d-grid gap-2" onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-4">
                  <FloatingLabel htmlFor="usernameInput" label="Ваш ник" className="mb-3">
                    <Form.Control
                      type="text"
                      id="usernameInput"
                      name="username"
                      placeholder="Ваш ник"
                      className="form-control"
                      autoComplete="username"
                      ref={usernameRef}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </FloatingLabel>
                </div>
                <div className="form-floating mb-4">
                  <FloatingLabel htmlFor="passwordInput" label="Пароль" className="mb-4">
                    <Form.Control
                      type="password"
                      id="passwordInput"
                      name="password"
                      placeholder="Пароль"
                      className="form-control"
                      autoComplete="current-password"
                      ref={passwordRef}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </FloatingLabel>
                  <Overlay
                    target={passwordRef.current}
                    show={error !== null}
                    placement="bottom"
                  >
                    {({
                      placement: _placement,
                      show: _show,
                      arrowProps: _arrowProps,
                      popper: _popper,
                      hasDoneInitialMeasure: _hasDoneInitialMeasure,
                      ...props
                    }) => (
                      <div
                          // eslint-disable-next-line react/jsx-props-no-spreading
                        {...props}
                        id="div-error"
                        className="invalid-div"
                        style={{
                          position: 'absolute',
                          backgroundColor: 'rgba(255, 100, 100, 0.85)',
                          padding: '2px 10px',
                          color: 'white',
                          borderRadius: 3,
                          ...props.style,
                        }}
                      >
                        Неверные имя пользователя или пароль
                      </div>
                    )}
                  </Overlay>
                </div>
                <Button type="submit" variant="primary" size="lg">
                  Войти
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
