import React from 'react';
import {
  Formik, Field, Form,
} from 'formik';

const Login = () => (
  <div className="App">
    <h1>Войти</h1>
    <Formik
      initialValues={{ nickname: '', password: '' }}
    >
      <Form>
        <Field name="nickname" type="text" placeholder="Ваш ник" />
        <Field name="password" type="text" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </Form>
    </Formik>
  </div>
);

export default Login;
