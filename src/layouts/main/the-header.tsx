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
  background-color: #fff;
`;
const TheHeader = () => {
  return (
    <Header>
      <Link to={"/admin"}>Dashboard</Link>
    </Header>
  );
};

export default TheHeader;
