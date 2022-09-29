import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useRequest from '../hooks/use-request';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Button from '../comps/temps/Button';
import { FlexColumn } from '../helpers/mixins';
import { ReactComponent as LeftArrow } from '../imgs/svg/left-arrow-servings.svg';
import { ReactComponent as RightArrow } from '../imgs/svg/right-arrow-servings.svg';
import Ingredient from '../comps/Ingredient';
import LinkSection from '../comps/LinkSection';
import GhostResult from '../comps/temps/GhostResult';

const Container = styled(motion.section)`
  ${FlexColumn()}
  gap: 3rem;

  margin-bottom: 4rem;
`;

const RecipeListingSection = styled(motion.section)`
  margin-top: 2rem;
  width: 100rem;
  padding: 1.6rem;
  border: 0.2rem solid black;
`;

const RecipeListingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'header header'
    'photo ing'
    'nooch ing'
    'nooch button';
  justify-items: center;
  row-gap: 2rem;

  & h2 {
    grid-area: header;
    font-family: goodlife-serif, sans-serif;
    font-weight: 700;
    font-size: 3rem;
  }
`;

const RecipeImageBox = styled.div`
  height: 40rem;
  width: 40rem;
  overflow: hidden;

  grid-area: photo;

  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    height: 40rem;
  }
`;

const RecipeServingsBox = styled.div`
  grid-column: 2/3;

  display: flex;
  align-items: center;
  gap: 1rem;

  & span {
    font-size: 1.8rem;
  }
`;

const ServingsBtn = styled(Button)`
  height: 4rem;
  width: 8rem;

  background-color: var(--main-theme-color);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowLeftIconStyles = styled(LeftArrow)`
  height: 20px;
  width: 20px;
`;

const ArrowRightIconStyles = styled(RightArrow)`
  height: 20px;
  width: 20px;
`;

const NutritionInfo = styled.div`
  grid-area: nooch;

  & div {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h3 {
      font-family: goodlife-serif, sans-serif;
      font-weight: 700;
      font-size: 2rem;
    }

    & h4 {
      font-family: inherit;
      font-size: 1rem;
    }

    & ul {
      list-style: none;

      display: flex;
      gap: 1.2rem;

      & li {
        height: 10rem;
        width: 6.4rem;
        padding: 0.4rem;
        border: 0.15rem solid black;
        text-align: center;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;

        & p:nth-child(1) {
          font-size: 1.2rem;
          text-decoration: underline;
        }
        & p:nth-child(2) {
          font-size: 1.6rem;
          font-weight: bold;
        }
        & p:nth-child(3) {
          height: 100%;
          width: 100%;
          padding: 1rem;
          border: 0.2rem solid black;
          border-radius: 50%;
          background-color: black;
          color: white;
          font-size: 1.6rem;

          display: flex;
          justify-content: center;
        }
      }
    }
  }
`;

const IngredientBox = styled.div`
  width: 100%;
  align-items: center;

  grid-area: ing;

  & h2 {
    grid-area: header;
    font-family: goodlife-serif, sans-serif;
    font-weight: 700;
    font-size: 3rem;

    text-align: center;
    align-self: center;
    grid-column: 1/3;
  }

  & ul {
    margin-top: 2rem;
    list-style: none;

    & li {
      display: flex;

      padding: 1rem;

      & span {
        font-size: 1.8rem;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        & p {
          padding-top: 0.5rem;
        }
      }
    }
  }
`;

const Kcal = styled.span`
  font-size: 1rem;
`;

const Result = () => {
  const params = useParams();

  const [result, setResult] = useState(null);

  const { isLoading, isError, errorMsg, sendRequest } = useRequest();

  useEffect(() => {
    const receiver = data => {
      setResult(data);
      console.log(data);
    };

    sendRequest({ url: `/api/v1/recipes/${params.resultId}` }, receiver);
  }, [params.resultId, sendRequest]);

  const DAILY_KCALS = 2500;
  const DAILY_CARBS = 325;
  const DAILY_FAT = 97;
  const DAILY_SATURATES = 30;
  const DAILY_SALT = 6;
  const calculateNutritionalPercs = (amount, base) => {
    return (amount / base) * 100;
  };

  return (
    <Container>
      {isLoading && (
        <GhostResult
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ repeatType: 'mirror', repeat: Infinity, duration: 0.8 }}
        />
      )}

      {isError && (
        <motion.p
          initial={{ opacity: 0, fontSize: '1.4rem', color: 'red' }}
          animate={{ opacity: 1 }}
          key="1"
        >
          {errorMsg}
        </motion.p>
      )}

      {result && (
        <RecipeListingSection
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', duration: 0.2 }}
        >
          <RecipeListingContainer>
            <RecipeImageBox>
              <img
                src={`/public/img/recipes/${result.data.recipe.coverImage}`}
                alt="Food"
              />
            </RecipeImageBox>

            <h2>{result.data.recipe.name}</h2>

            <RecipeServingsBox>
              <ServingsBtn btnSize="small" icon={true}>
                <ArrowLeftIconStyles />
              </ServingsBtn>
              <span>{result.data.recipe.servings} Servings</span>
              <ServingsBtn btnSize="small" icon={true}>
                <ArrowRightIconStyles />
              </ServingsBtn>
            </RecipeServingsBox>

            <NutritionInfo>
              <div>
                <h3>Nutritional Facts</h3>
                <h4>(Estimated per serving)</h4>
                <ul>
                  <li>
                    <p>Energy</p>
                    <p>
                      {result.data.recipe.nutrition.kcal.amount}
                      <Kcal>kcal</Kcal>
                    </p>
                    <p>
                      {calculateNutritionalPercs(
                        result.data.recipe.nutrition.kcal.amount,
                        DAILY_KCALS
                      ).toFixed()}
                      %
                    </p>
                  </li>
                  <li>
                    <p>Carb</p>
                    <p>
                      {result.data.recipe.nutrition.carbs.amount}
                      {result.data.recipe.nutrition.carbs.measurement}
                    </p>
                    <p>
                      {calculateNutritionalPercs(
                        result.data.recipe.nutrition.carbs.amount,
                        DAILY_CARBS
                      ).toFixed()}
                      %
                    </p>
                  </li>
                  <li>
                    <p>Fat</p>
                    <p>
                      {result.data.recipe.nutrition.fat.amount}
                      {result.data.recipe.nutrition.fat.measurement}
                    </p>
                    <p>
                      {calculateNutritionalPercs(
                        result.data.recipe.nutrition.fat.amount,
                        DAILY_FAT
                      ).toFixed()}
                      %
                    </p>
                  </li>
                  <li>
                    <p>Saturates</p>
                    <p>
                      {result.data.recipe.nutrition.saturates.amount}
                      {result.data.recipe.nutrition.saturates.measurement}
                    </p>
                    <p>
                      {calculateNutritionalPercs(
                        result.data.recipe.nutrition.saturates.amount,
                        DAILY_SATURATES
                      ).toFixed()}
                      %
                    </p>
                  </li>
                  <li>
                    <p>Salt</p>
                    <p>
                      {result.data.recipe.nutrition.salt.amount}
                      {result.data.recipe.nutrition.salt.measurement}
                    </p>
                    <p>
                      {calculateNutritionalPercs(
                        result.data.recipe.nutrition.salt.amount,
                        DAILY_SALT
                      ).toFixed()}
                      %
                    </p>
                  </li>
                </ul>
              </div>
            </NutritionInfo>

            <IngredientBox>
              <h2>Ingredients</h2>

              <ul>
                {result.data.recipe.ingredients.map(ingredient => (
                  <Ingredient
                    key={ingredient._id}
                    amount={ingredient.amount}
                    measurement={ingredient.measurement}
                    name={ingredient.name}
                  />
                ))}
              </ul>
            </IngredientBox>
          </RecipeListingContainer>
        </RecipeListingSection>
      )}

      {result && !result.data.recipe.methodsProvided && (
        <LinkSection
          publisher={result.data.recipe.author.username}
          url={result.data.recipe.methodsAlternative}
        />
      )}
    </Container>
  );
};

export default Result;
