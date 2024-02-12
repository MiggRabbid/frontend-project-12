import React, { useRef, useEffect } from 'react';
import {
  Button, FloatingLabel, Form,
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
      console.log('Login values -', values);
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
    !user && (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center position-relative">
                <img src={logo} alt="Simple Chat" className="rounded-circle" style={{ width: 200, height: 200 }} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group>
                  <FloatingLabel htmlFor="usernameInput" controlId="username" label="Ваш ник" className="mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Ваш ник"
                      autoComplete="username"
                      required
                      ref={usernameRef}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel htmlFor="passwordInput" controlId="password" label="Пароль" className="mb-4">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      className="form-control"
                      autoComplete="current-password"
                      required
                      ref={passwordRef}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                  Войти
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{'Нет аккаунта? '}</span>
                <a href="/signup">Регистрация</a>
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
