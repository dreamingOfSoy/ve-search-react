import styled from 'styled-components';
import { motion } from 'framer-motion';

import Button from '../../comps/temps/Button';
import { Flex, FlexColumn } from '../../helpers/mixins';

export const SearchStyles = styled(motion.section)`
  margin-top: -2rem;
  width: 100%;

  ${FlexColumn()}
  gap: 3rem;
`;

export const SearchInputStyles = styled.div`
  width: 100%;

  ${Flex()}
  gap: 1rem;

  margin-top: -1rem;

  & input {
    padding: 1rem;
    height: 4rem;
    border: none;
    border: 0.2rem solid black;
    background-color: var(--main-light-color);

    font-family: inherit;
  }
`;

export const ButtonStyles = styled(Button)`
  height: 4rem;
  width: 8rem;
  border: none;
  border: 0.2rem solid black;
  background-color: #a4d2ac;

  cursor: pointer;

  line-height: 4rem;
`;
