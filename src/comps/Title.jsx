import styled from 'styled-components';
import { ReactComponent as TitleIcon } from '../imgs/svg/title-icon.svg';
import { FlexColumn } from '../helpers/mixins';

const TitleStyles = styled.div`
  width: 100%;
  margin-top: 4rem;

  ${FlexColumn()}

  & h1 {
    font-family: goodlife-brush, sans-serif;
    font-size: 5rem;
  }

  & span {
    font-size: 1.8rem;
  }
`;

const TitleIconStyles = styled(TitleIcon)`
  height: 40px;
  width: 40px;
  color: #a4d2ac;

  margin-top: 0.5rem;
  align-self: flex-start;
`;

const Title = () => {
  return (
    <TitleStyles>
      <h1>
        VEsearch <TitleIconStyles />
      </h1>
      <span>Search for fully vegan recipes!</span>
    </TitleStyles>
  );
};

export default Title;
