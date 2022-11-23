import React from 'react';
import AuthRegisterForm from '../components/auth/AuthRegisterForm';
import AuthTemplate from '../components/auth/AuthTemplate';

const RegisterPage = () => {
    return (
        <AuthTemplate>
            <AuthRegisterForm />
        </AuthTemplate>
    )
};

export default RegisterPage;