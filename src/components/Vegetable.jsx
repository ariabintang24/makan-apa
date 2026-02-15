import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

function Vegetable() {
  const [vegetable, setVegetable] = useState([]);

  useEffect(() => {
    getVegetable();
  }, []);

  const getVegetable = async () => {
    try {
      const check = localStorage.getItem("vegetable");

      if (check && check !== "undefined" && check !== "null") {
        try {
          const parsed = JSON.parse(check);

          if (Array.isArray(parsed)) {
            setVegetable(parsed);
            return;
          }
        } catch {
          localStorage.removeItem("vegetable");
        }
      }

      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`,
      );

      const data = await api.json();

      console.log("API RESPONSE:", data);

      if (data.recipes && Array.isArray(data.recipes)) {
        setVegetable(data.recipes);

        localStorage.setItem("vegetable", JSON.stringify(data.recipes));
      } else {
        console.warn("API limit reached or no recipes returned");

        const oldCache = localStorage.getItem("vegetable");

        if (oldCache && oldCache !== "undefined") {
          try {
            const parsed = JSON.parse(oldCache);

            if (Array.isArray(parsed)) {
              setVegetable(parsed);
              return;
            }
          } catch {}
        }

        setVegetable([]);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);

      setVegetable([]);
    }
  };

  return (
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>

      <Splide
        options={{
          perPage: 3,
          arrows: true,
          pagination: true,
          drag: "free",
          gap: "1.5rem",

          breakpoints: {
            1024: { perPage: 2 },
            768: { perPage: 2 },
            480: { perPage: 1 },
          },
        }}
      >
        {vegetable.map((recipe) => (
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

export default Vegetable;

const Wrapper = styled.div`
  margin: 4rem 0;
  margin-bottom: 40px;
  padding: 0 1rem;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: #222;
  }

  .splide__arrow {
    background: white;
    width: 36px;
    height: 36px;
    z-index: 10;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .splide__arrow svg {
    width: 16px;
    height: 16px;
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
  height: 260px;
  border-radius: 20px;
  overflow: hidden;

  cursor: pointer;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }

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
    height: 240px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
`;

const Title = styled.p`
  position: absolute;
  bottom: 0;
  width: 100%;

  padding: 1rem;

  color: white;
  font-weight: 600;
  font-size: 1rem;

  text-align: center;
`;
