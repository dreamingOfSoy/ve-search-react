import styled from 'styled-components';
import { motion } from 'framer-motion';

import Button from '../../comps/temps/Button';
import { Flex, FlexColumn } from '../../helpers/mixins';
import { ReactComponent as AddIcon } from '../../imgs/svg/add.svg';
import { ReactComponent as Upload } from '../../imgs/svg/upload.svg';

export const AccountContainerStyled = styled(motion.section)`
  margin-top: 2rem;
  width: auto;
  height: auto;
  padding: 1.6rem;
  padding-bottom: 3rem;
  border: 0.2rem solid black;
`;

export const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    'name name add'
    'deets edit avatar'
    'deets edit avatar'
    'deets edit avatar';
  row-gap: 4rem;
`;

export const Name = styled.div`
  grid-area: name;
  height: auto;
  width: 100%;

  ${FlexColumn()}

  & h1 {
    font-size: 4rem;
    font-family: goodlife-serif, sans-serif;
  }

  & span {
    font-size: 1.4rem;
  }
`;

export const Avatar = styled.div`
  grid-area: avatar;
  height: auto;
  width: 100%;

  ${FlexColumn('center', 'flex-start')}
  gap: 2rem;

  & div {
    width: 12rem;
    height: 12rem;
    background-color: black;
    border-radius: 50%;
    border: var(--main-border);

    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
    }
  }

  & span {
    font-size: 1.6rem;

    text-decoration: underline;

    cursor: pointer;

    &:hover,
    &:active {
      text-decoration: none;
    }
  }
`;

export const Details = styled.div`
  grid-area: deets;
  height: auto;
  width: 100%;

  ${FlexColumn('center', 'flex-start')}

  & ul {
    list-style: none;

    ${FlexColumn('flex-start')}
    gap: 2rem;

    & li:nth-child(1) {
      background-color: ${props => {
        if (props.location.pathname === '/me/my-recipes') return '#58b15a';
      }};
    }

    & li:nth-child(1) {
      background-color: ${props => {
        if (props.location.pathname === '/me/saved-recipes') return '#58b15a';
      }};
    }

    & li {
      ${Flex()}
      gap: 1rem;
      padding: 2rem;
      width: 100%;

      border: var(--main-border);

      background-color: var(--main-theme-color);

      cursor: pointer;

      &:hover {
        background-color: #58b15a;
      }

      & :first-child {
        height: 2rem;
      }

      & span {
        margin-top: 0.35rem;
        font-size: 1.4rem;
      }
    }
  }
`;

export const Edit = styled.div`
  grid-area: edit;
  height: auto;
  width: 30rem;

  ${FlexColumn('center', 'flex-start')}

  & ul {
    padding: 0 2rem;
    width: 100%;
    list-style: none;

    & li {
      margin-top: -2rem;
      width: 100%;
      padding: 2rem 0;

      ${FlexColumn()}
      align-items: flex-start;
      gap: 1rem;

      & div {
        width: 100%;
        display: flex;
        justify-content: space-between;

        & h2 {
          font-size: 1.6rem;
        }

        & span {
          font-size: 1.6rem;
          text-decoration: underline;

          cursor: pointer;

          &:hover {
            text-decoration: none;
          }
        }
      }

      & form {
        width: 100%;
        ${Flex('center', 'space-between')}

        & input {
          border: var(--main-border);
          padding: 1rem;
          height: 3rem;
          width: 18rem;
        }

        & button {
          background-color: var(--main-theme-color);
        }
      }

      & span {
        font-size: 1.6rem;
      }
    }
  }
`;

export const Add = styled.div`
  grid-area: add;

  height: 100%;
  width: 100%;

  ${FlexColumn()}
  gap: 2rem;

  & span:first-child {
    font-size: 1.8rem;
    text-decoration: underline;

    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
`;

export const AddIconStyles = styled(AddIcon)`
  height: 2rem;
`;

export const AddBtn = styled(Button)`
  ${Flex()}
  gap: 1rem;

  background-color: var(--main-theme-color);

  background-color: ${props => {
    if (props.location.pathname === '/me/add-a-recipe') return '#58b15a';
  }};

  cursor: pointer;

  &:hover {
    background-color: #58b15a;
  }

  & span {
    margin-top: 0.2rem;
  }
`;

export const EditPassDiv = styled(motion.div)`
  ${FlexColumn('center', 'flex-start')}
  gap: 1rem;

  & span {
    text-decoration: none !important;
    font-size: 1.2rem !important;
  }
`;

export const Password = styled.span`
  font-size: 1.6rem !important;
`;

export const UploadIconStyles = styled(Upload)`
  height: 2rem;
`;

export const UploadForm = styled(motion.form)`
  font-size: 1.4rem;
  background-color: var(--main-theme-color);

  & label {
    border: var(--main-border);
    display: inline-block;
    padding: 0.6rem 1.2rem;
    cursor: pointer;

    ${Flex()}
    gap: 1rem;
  }

  & input {
    display: none;
  }

  &:hover {
    background-color: #58b15a;
  }
`;
