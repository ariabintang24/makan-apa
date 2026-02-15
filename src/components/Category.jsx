import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";

import React from "react";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem 0;
  flex-wrap: wrap;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 90px;
  height: 90px;

  text-decoration: none;
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);

  box-shadow: 
    0 4px 12px rgba(0,0,0,0.08),
    inset 0 0 0 1px rgba(255,255,255,0.3);

  transition: all 0.25s ease;

  svg {
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 6px;
    transition: all 0.25s ease;
  }

  h4 {
    font-size: 0.85rem;
    font-weight: 600;
    color: #444;
    margin: 0;
    transition: all 0.25s ease;
  }

  &:hover {
    transform: translateY(-6px) scale(1.05);
    box-shadow: 
      0 10px 25px rgba(0,0,0,0.15),
      inset 0 0 0 1px rgba(255,255,255,0.4);

    svg {
      color: #ff6b6b;
      transform: scale(1.15);
    }

    h4 {
      color: #222;
    }
  }

  &.active {
    background: linear-gradient(135deg, #ff6b6b, #ffb347);

    box-shadow:
      0 10px 25px rgba(255,107,107,0.35);

    svg {
      color: white;
      transform: scale(1.2);
    }

    h4 {
      color: white;
      font-weight: 700;
    }
  }

  @media (max-width: 768px) {
    width: 75px;
    height: 75px;

    svg {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 0.75rem;
    }
  }
`;

export default Category;