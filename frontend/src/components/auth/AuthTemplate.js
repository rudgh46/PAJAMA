import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    text-align: center;
    background-color: #FFE9EF;
`;

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;

    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

const Whitebox = styled.div`
    box-shadow: 0 0 8px rgba(0,0,0,0.025);
    padding: 2rem;
    width: 360px;
    background: #FDF1F3;
    border-radius: 20px;
`;

const AuthTemplate = ({children}) => {
    return (
        <>
        <Header>
        <a href='/'><img src='/pazamafont.png' alt='logo' width='120px' height='60px'></img></a>
        </Header>
        <AuthTemplateBlock>
            <Whitebox>
            {children}
            </Whitebox>
        </AuthTemplateBlock>
        </>
    )
}

export default AuthTemplate;