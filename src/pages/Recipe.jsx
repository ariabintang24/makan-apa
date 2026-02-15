import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const params = useParams();

  const recipeId = params.slug?.split("-")[0];

  const [details, setDetails] = useState({
    extendedIngredients: [],
  });

  const [activeTab, setActiveTab] = useState("instructions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!recipeId) {
      setLoading(false);
      setError(true);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`,
        );

        if (!response.ok) {
          throw new Error("API error");
        }

        const detailData = await response.json();

        // jika API kirim error object
        if (!detailData || detailData.status === "failure") {
          throw new Error("Invalid recipe");
        }

        setDetails({
          ...detailData,
          extendedIngredients: detailData.extendedIngredients || [],
        });
      } catch (err) {
        console.error("FETCH ERROR:", err);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [recipeId]);

  // Loader
  if (loading) {
    return (
      <>
        <GlobalStyle />
        <DetailWrapper>
          <SkeletonWrapper>
            <SkeletonImage />

            <SkeletonContent>
              <SkeletonTitle />
              <SkeletonText />
              <SkeletonText />
              <SkeletonText />
            </SkeletonContent>
          </SkeletonWrapper>
        </DetailWrapper>
      </>
    );
  }

  // Error fallback
  if (error) {
    return (
      <>
        <GlobalStyle />

        <CenterWrapper>
          <ErrorBox>
            <h3>Recipe not available</h3>

            <p>
              This recipe could not be loaded. It may be removed, invalid, or
              API limit reached.
            </p>
          </ErrorBox>
        </CenterWrapper>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />

      <DetailWrapper>
        <ImageSection>
          <h2>{details.title}</h2>

          <img src={details.image} alt={details.title} />
        </ImageSection>

        <Info>
          <ButtonWrapper>
            <Button
              className={activeTab === "instructions" ? "active" : ""}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </Button>

            <Button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </Button>
          </ButtonWrapper>

          {activeTab === "instructions" && (
            <Content>
              {details.summary && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: details.summary,
                  }}
                />
              )}

              {details.instructions ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: details.instructions,
                  }}
                />
              ) : (
                <p>No instructions available.</p>
              )}
            </Content>
          )}

          {activeTab === "ingredients" && (
            <IngredientList>
              {details.extendedIngredients.length > 0 ? (
                details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))
              ) : (
                <p>No ingredients available.</p>
              )}
            </IngredientList>
          )}
        </Info>
      </DetailWrapper>
    </>
  );
}

export default Recipe;

//
// Global shimmer animation
//

const CenterWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  margin-top: 4rem;

  padding: 2rem;
`;

const ErrorBox = styled.div`
  padding: 2rem;
  justify-content: center;
  text-align: center;

  h3 {
    margin-bottom: 0.5rem;
    color: #e63946;
  }

  p {
    color: #555;
  }
`;

const GlobalStyle = createGlobalStyle`
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

//
// Layout
//

const DetailWrapper = styled.div`
  margin: 4rem auto;
  max-width: 1100px;

  display: grid;
  grid-template-columns: 1fr 1.2fr;

  gap: 3rem;

  padding: 2rem;

  background: white;
  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1.5rem;
  }
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    border-radius: 20px;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.4rem;

  border: none;
  border-radius: 999px;

  cursor: pointer;

  background: #f1f1f1;
  color: #555;

  font-weight: 500;

  transition: 0.2s;

  &.active {
    background: linear-gradient(135deg, #31363f, #4f5d75);
    color: white;
  }
`;

//
// Content
//

const Content = styled.div`
  line-height: 1.7;
  font-size: 1rem;
  color: #444;

  p {
    margin-bottom: 1rem;
  }

  b,
  strong {
    font-weight: 500;
  }
`;

const IngredientList = styled.ul`
  padding-left: 1rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

//
// Skeleton Loader
//

const shimmer = `
  background: linear-gradient(
    90deg,
    #eeeeee 25%,
    #dddddd 50%,
    #eeeeee 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
`;

const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;

  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonImage = styled.div`
  height: 300px;
  border-radius: 20px;
  ${shimmer}
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkeletonTitle = styled.div`
  height: 30px;
  width: 60%;
  border-radius: 8px;
  ${shimmer}
`;

const SkeletonText = styled.div`
  height: 16px;
  width: 100%;
  border-radius: 8px;
  ${shimmer}
`;
