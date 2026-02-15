import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slugify } from "../utils/slugify";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let params = useParams();

  const getCuisine = async (name) => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=12`,
      );

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();

      // FIX: selalu array
      setCuisine(data.results || []);
    } catch (err) {
      console.error(err);

      setCuisine([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.type) {
      getCuisine(params.type);
    }
  }, [params.type]);

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
    <Grid>
      {cuisine.length > 0 ? (
        cuisine.map((item) => (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}-${slugify(item.title)}`}>
              <img src={item.image} alt={item.title} />

              <h4>{item.title}</h4>
            </Link>
          </Card>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </Grid>
  );
}

export default Cuisine;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;

  background: white;

  img {
    width: 100%;
  }

  h4 {
    padding: 1rem;
  }

  a {
    text-decoration: none;
    color: #222;
  }
`;

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

const CenterWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  margin-top: 4rem;

  padding: 2rem;
`;
