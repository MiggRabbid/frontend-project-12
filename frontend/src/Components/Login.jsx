import React, { useEffect, useRef } from 'react';
import { Overlay } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import { actions as authActions } from '../slices/authSlice';

const Login = () => {
  console.log('------------------------ Login start');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  const error = useSelector((state) => state.authReducer.error);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/chat');
    }
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Это поле обязательно'),
    password: Yup.string().required('Это поле обязательно'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      setSubmitting(true);
      const response = await axios.post('/api/v1/login', values);
      localStorage.setItem('token', response.data.token);
      const action = {
        token: response.data.token,
        username: values.username,
      };
      dispatch(authActions.loginSuccess(action));
      console.log('------------------------ Login end');
      navigate('/chat');
    } catch (e) {
      console.error(e);
      dispatch(authActions.loginFailed(e.response.data));
      console.log('------------------------ Login end');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      label="username"
                      placeholder="Ваш ник"
                      className="form-control"
                    />
                  </div>
                  <div className="form-floating mb-4">
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      label="password"
                      placeholder="Пароль"
                      className="form-control"
                      innerRef={passwordRef}
                    />
                    <Overlay
                      target={passwordRef.current}
                      show={error !== null}
                      placement="bottom"
                    >
                      {({
                        placement, arrowProps, show: _show, ...props
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
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                    Войти
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
