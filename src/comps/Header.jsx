import styled from 'styled-components';
import { Flex, FlexColumn } from '../helpers/mixins';
import Button from './temps/Button';
import { ReactComponent as TitleIcon } from '../imgs/svg/title-icon.svg';
import { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/use-request';
import AuthContext from '../store/auth-context';
import { generateFramerElipsis } from '../helpers/generateFramerElipsis';

const HeaderStyled = styled(motion.header)`
  width: 100%;
  height: 8rem;
  padding: 2rem 8%;

  background-color: var(--main-theme-color);

  ${Flex('center', 'space-between')};

  & h1 {
    font-family: goodlife-brush, sans-serif;
    font-size: 4rem;
  }

  position: relative;
`;

const ProfileStyles = styled.div`
  padding: 0.8rem 3rem;
  border: var(--main-border);

  cursor: pointer;

  ${Flex('center', 'flex-end')};
  gap: 2rem;

  &:hover {
    background-color: #58b15a;
  }

  & div {
    background-color: blue;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;

    border: var(--main-border);

    overflow: hidden;

    & img {
      width: 100%;
    }
  }

  & p {
    margin-top: 0.3rem;
    font-size: 2rem;
  }
`;

const HeaderIconStyles = styled(TitleIcon)`
  height: 40px;
  width: 40px;
  color: var(--main-light-color);

  cursor: pointer;
`;

const LoginFormStyles = styled.div`
  & form {
    display: flex;
    align-items: center;
    gap: 2rem;

    & input {
      padding: 1rem;
      height: 4rem;
      border: none;
      border: 0.2rem solid black;
      background-color: var(--main-light-color);

      font-family: inherit;
    }

    & div {
      ${FlexColumn}
      gap: 0.5rem;

      & a {
        color: var(--main-dark-color);
        font-size: 1rem;

        align-self: center;

        &:hover,
        &:active {
          color: var(--main-light-color);
        }
      }

      & a {
      }
    }
  }
`;

const SigninSignupContainer = styled.div`
  ${Flex}
  gap: 2rem;
`;

const HeaderLoginBtnStyles = styled(Button)`
  width: 5rem;
  border: none;
  align-self: center;

  background-color: transparent;

  text-decoration: underline;

  &:hover {
    background-color: transparent;
    text-decoration: none;
  }
`;

const HeaderLoginFormBtnStyles = styled(Button)`
  padding: 0.3rem;
  align-self: center;

  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--main-light-color);
  }
`;

const HeaderSignupBtnStyles = styled(Button)`
  padding: 0.3rem;

  background-color: transparent;

  &:hover {
    background-color: var(--main-light-color);
  }
`;

const Alert = styled(motion.div)`
  height: 6rem;
  width: 40%;

  border: var(--main-border);
  border-top: none;

  ${Flex()}

  position: absolute;
  top: 0;
  left: 50%;

  & h2 {
    font-weight: 400;
  }
`;

const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [toLogin, setToLogin] = useState(false);

  const { userDetails } = authCtx;

  const { isLoading, isError, errorMsg, resetError, sendRequest } =
    useRequest();

  const toLoginHandler = () => {
    setToLogin(true);
  };

  const returnHomeHandler = () => {
    navigate('/');
  };

  const onLoginSubmitHandler = e => {
    e.preventDefault();

    const reciever = data => {
      authCtx.setIsLoggedInHandler();
      authCtx.setUserDetailsHandler(data);
      setToLogin(false);
    };

    sendRequest(
      {
        url: '/api/v1/users/login',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          email: email.current.value,
          password: password.current.value,
        },
      },
      reciever
    );
  };

  const toAccountPageHandler = () => {
    navigate('/me');
  };

  const tryAgainHandler = () => {
    if (isError) resetError(false);
  };

  return (
    <HeaderStyled
      transition={{ duration: 1 }}
      initial={{ translateY: -80, opacity: 0 }}
      animate={{
        opacity: 1,
        translateY: 0,
        height: toLogin || authCtx.isLoggedIn ? 120 : 80,
      }}
      onClick={tryAgainHandler}
    >
      <HeaderIconStyles onClick={returnHomeHandler} />

      <Alert
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: isError ? 0 : -80,
          x: '-50%',
          backgroundColor: isError ? '#e31212' : '#f0f8ff',
        }}
      >
        <h2>{errorMsg}</h2>
      </Alert>

      <div>
        {!toLogin && !authCtx.isLoggedIn && (
          <SigninSignupContainer>
            <HeaderLoginBtnStyles onClick={toLoginHandler} btnSize="medium">
              Login
            </HeaderLoginBtnStyles>

            <HeaderSignupBtnStyles btnSize="medium">
              Sign up
            </HeaderSignupBtnStyles>
          </SigninSignupContainer>
        )}

        {toLogin && !authCtx.isLoggedIn && (
          <LoginFormStyles>
            <form
              animate={{ opacity: toLogin ? 1 : 0 }}
              onSubmit={onLoginSubmitHandler}
            >
              <input ref={email} placeholder="email" />
              <input ref={password} placeholder="password" />
              <div>
                <HeaderLoginFormBtnStyles
                  display="flex"
                  type="submit"
                  btnSize="medium"
                  icon={true}
                >
                  {isLoading
                    ? generateFramerElipsis({
                        flexDirection: 'row',
                        marginTop: '-0.6rem',
                      })
                    : 'Login'}
                </HeaderLoginFormBtnStyles>
                <a href="/">Sign up</a>
                <a href="/">Forgot username or password?</a>
              </div>
            </form>
          </LoginFormStyles>
        )}

        {authCtx.isLoggedIn && (
          <ProfileStyles onClick={toAccountPageHandler}>
            <div>
              <img
                src={`/public/img/users/${userDetails.user.photo}`}
                alt="avatar"
              />
            </div>
            <p>{userDetails.user.username}</p>
          </ProfileStyles>
        )}
      </div>
    </HeaderStyled>
  );
};

export default Header;
