import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import styled from "styled-components";

const Header = styled.header`
  padding: 20px;
  padding-bottom: 0;
  border-bottom: 1px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .breadcrumb {
    font-size: 0.9rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
`;
const TheHeader = () => {
  //Get the router path to show in the breadcrumbs
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Header>
      <div className="breadcrumb">
        <Breadcrumbs separator="›" aria-label="breadcrumbs">
          <Link to="/admin">
            <Icon path={mdiHome} size={1} />{" "}
          </Link>
          {path.map((item, index) => {
            if (index === 0) return null;
            return <span key={index}> {item} </span>;
          })}
        </Breadcrumbs>
      </div>
      <h1>{path[path.length - 1]}</h1>
    </Header>
  );
};

export default TheHeader;
