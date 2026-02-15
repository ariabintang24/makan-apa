import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <SearchBox>
        <Icon />
        <Input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </SearchBox>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  display: flex;
  justify-content: center;

  margin: 2rem auto;
  padding: 0 1rem;
  max-width: 600px;
  width: 100%;
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 20px 14px 50px;

  border-radius: 999px;
  border: none;
  outline: none;

  font-size: 15px;
  font-weight: 500;

  color: #222;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);

  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);

  transition: all 0.25s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    background: white;
    box-shadow:
      0 8px 25px rgba(0, 0, 0, 0.15),
      0 0 0 3px rgba(255, 107, 107, 0.15);

    transform: scale(1.02);
  }
`;

const Icon = styled(FaSearch)`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 16px;
  pointer-events: none;
`;

export default Search;
