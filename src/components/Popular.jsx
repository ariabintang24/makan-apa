import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    console.log("API KEY:", process.env.REACT_APP_API_KEY);

    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const check = localStorage.getItem("popular");

      // FIX: validasi localStorage
      if (check && check !== "undefined" && check !== "null") {
        try {
          const parsed = JSON.parse(check);

          if (Array.isArray(parsed)) {
            setPopular(parsed);
            return;
          }
        } catch (err) {
          console.log("localStorage corrupted, clearing...");
          localStorage.removeItem("popular");
        }
      }

      // Fetch dari API jika tidak ada cache valid
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`,
      );

      const data = await api.json();

      console.log("API RESPONSE:", data);

      if (data.recipes) {
        setPopular(data.recipes);

        localStorage.setItem("popular", JSON.stringify(data.recipes));
      } else {
        console.error("API returned no recipes");
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  return (
    <Wrapper>
      <h3>Popular Picks</h3>

      <Splide
        options={{
          perPage: 4,
          arrows: true,
          pagination: true,
          drag: "free",
          gap: "1.5rem",

          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <StyledLink to={`/recipe/${recipe.id}-${slugify(recipe.title)}`}>
              <Card>
                <img src={recipe.image} alt={recipe.title} />

                <Gradient />

                <Title>{recipe.title}</Title>
              </Card>
            </StyledLink>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

//
// Styled Components
//

const Wrapper = styled.div`
  margin: 4rem 0;
  margin-bottom: 40px;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: #222;s
  }

  .splide__arrow {
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  .splide__pagination__page.is-active {
    background: #ff6b6b;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  position: relative;
  height: 260px; /* samakan semua */
  width: 100%;
  border-radius: 20px;
  overflow: hidden;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;

  &:hover img {
    transform: scale(1.08);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  @media (max-width: 768px) {
    height: 220px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));

  z-index: 2;
`;

const Title = styled.p`
  position: absolute;
  bottom: 0;
  width: 100%;

  padding: 1rem;

  color: white;
  font-weight: 600;
  font-size: 1rem;

  z-index: 3;

  text-align: center;
`;

export default Popular;
