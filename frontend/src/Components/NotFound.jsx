import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">{t('notFound.errorNumber')}</h1>
        <p className="fs-3">
          {' '}
          <span className="text-danger">{t('notFound.exclamation')}</span>
          {' '}
          {t('notFound.notFound')}
        </p>
        <p className="lead">
          {t('notFound.goOut')}
        </p>
        <br />
        <Button
          variant="outline-dark"
          onClick={() => navigate('/')}
        >
          {t('notFound.button')}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
