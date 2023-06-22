import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiFruitCherries, mdiSprout } from "@mdi/js";

const Logo = styled.div`
  background-color: #14281d;
  width: 200px;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-bottom: 1px solid #fff;

  img {
    object-fit: cover;
    height: 100%;
    transform: translateX(-3px);
  }
`;

const Navigation = styled.ul`
  color: #fff;

  li {
    padding: 10px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: 40px;
    cursor: pointer;
    color: #fff;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const TheSidebar = () => {
  return (
    <>
      <Logo>
        <img src="/assets/logo.png" alt="Harvest Haven" />
      </Logo>

      <Navigation>
        <Link to="/admin/fruits">
          <li>
            <Icon path={mdiFruitCherries} size={1} /> <span>Fruits</span>
          </li>
        </Link>
        <Link to="/admin/vegetables">
          <li>
            <Icon path={mdiSprout} size={1} /> <span>Vegetables</span>
          </li>
        </Link>
      </Navigation>
    </>
  );
};

export default TheSidebar;
