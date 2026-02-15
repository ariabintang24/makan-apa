import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={"/"}>Makan Apa</Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-familiy: "Lobster Two", cursive;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  font-size: 1.6rem;
  font-weight: 600;

  margin: 20px 0 30px 0;

  svg {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 15px 0 25px 0;
  }
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

export default App;
