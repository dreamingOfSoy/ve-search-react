import { useEffect, useRef, useState } from 'react';

import useRequest from '../../hooks/use-request';

import {
  ResultsBox,
  ResultStyled,
  ImgContainerStyled,
} from '../../styled/styledComps/styledTemps/styledResultsCard';

const ResultCard = props => {
  const resultBoxWidth = useRef();

  const onClickHandler = () => {
    props.getResult(props.id);
  };

  const PADDING_SIZE = 40;
  useEffect(() => {
    props.setScrollWidth(
      props.sliderEl.current.scrollWidth - props.sliderEl.current.offsetWidth,
      +resultBoxWidth.current.getBoundingClientRect().width + PADDING_SIZE
    );
  }, [props]);

  const { sendRequest } = useRequest();
  const [recipeRating, setRecipeRating] = useState(null);

  useEffect(() => {
    const receiver = data => {
      setRecipeRating(data.data.ratings[0].avgRatings);
    };

    sendRequest(
      { url: `/api/v1/reviews/ratingsAverage/${props.id}` },
      receiver
    );
  }, [sendRequest, props.id]);

  return (
    <ResultsBox
      onClick={onClickHandler}
      animate={{ opacity: 1 }}
      ref={resultBoxWidth}
    >
      <ResultStyled>
        <ImgContainerStyled>
          <img src={`/public/img/recipes/${props.image}`} alt="food" />
        </ImgContainerStyled>
        <span>{props.title}</span>
        <span>{props.author}</span>
        <span>{recipeRating ? `Rating: ${recipeRating}` : ''}</span>
      </ResultStyled>
    </ResultsBox>
  );
};

export default ResultCard;
