import styled from 'styled-components';

import { motion } from 'framer-motion';

import { Flex, FlexColumn } from '../../helpers/mixins';
import Button from '../../comps/temps/Button';
import { ReactComponent as TitleIcon } from '../../imgs/svg/title-icon.svg';

export const HeaderStyled = styled(motion.header)`
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

export const ProfileStyles = styled.button`
  padding: 0.8rem 3rem;
  border: var(--main-border);

  cursor: pointer;

  background-color: var(--main-theme-color);

  font-family: inherit;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.4rem var(--main-light-color);
  }

  ${Flex('center', 'flex-end')};
  gap: 2rem;

  background-color: ${props => {
    if (props.location.pathname.startsWith('/me')) return '#58b15a';
  }};

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

export const HeaderIconStyles = styled(TitleIcon)`
  height: 4rem;
  width: 4rem;
  color: var(--main-light-color);

  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.4rem var(--main-light-color);
  }
`;

export const LoginFormStyles = styled.div`
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

      & span {
        color: var(--main-dark-color);
        font-size: 1rem;

        align-self: center;
        cursor: pointer;
        text-decoration: underline;

        &:hover,
        &:active {
          color: var(--main-light-color);
          text-decoration: none;
        }
      }

      & a {
      }
    }
  }
`;

export const SigninSignupContainer = styled.div`
  ${Flex}
  gap: 2rem;
`;

export const HeaderLoginBtnStyles = styled(Button)`
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

export const HeaderLoginFormBtnStyles = styled(Button)`
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

export const HeaderSignupBtnStyles = styled(Button)`
  padding: 0.3rem;

  background-color: transparent;

  &:hover {
    background-color: var(--main-light-color);
  }
`;

export const Alert = styled(motion.div)`
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

export const LoggingInOnLoad = styled.span`
  font-size: 1.6rem;

  ${Flex()}
`;
