import React, { useRef, useEffect } from 'react';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import logo from '../../img/logo800-800.png';
import { actions as authActions } from '../../slices/authSlice';

const validationSchema = yup.object({
  username: yup.string()
    .min(3, 'от 3 до 20 символов')
    .max(20, 'от 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPassword = useRef();
  const error = useSelector((state) => state.authReducer.error);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log('SignUp values  -', values);
      axios.post('/api/v1/signup', values)
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
    console.log('SignUp useEffect error -', error);
  }, [error]);

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
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group>
                  <FloatingLabel htmlFor="username" controlId="username" label="Имя пользователя" className="mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="От 3 до 20 символов"
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
                  <FloatingLabel htmlFor="password" controlId="password" label="Пароль" className="mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Не менее 6 символов"
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
                  <FloatingLabel htmlFor="confirmPassword" controlId="confirmPassword" label="Подтвердите пароль" className="mb-4">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Пароли должны совпадать"
                      autoComplete="current-password"
                      required
                      ref={confirmPassword}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.confirmPassword || !!error}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{(formik.errors.confirmPassword || 'Такой пользователь уже существует')}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                  Зарегистрироваться
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
