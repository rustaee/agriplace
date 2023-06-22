import { ReactNode } from "react";
import styled from "styled-components";
import Sidebar from "./sidebar";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: grid;
  grid-template:
    "sidebar main"
    / 300px 1fr;
  height: 100vh;

  main {
    grid-area: main;
    background-color: #f1f5f2;
  }

  aside {
    grid-area: sidebar;
    background-color: #14281d;
  }

  header {
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
  }
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.split("/");
  return (
    <Wrapper>
      <main>
        <header>
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
        </header>
        {children}
      </main>
      <aside>
        <Sidebar />
      </aside>
    </Wrapper>
  );
};

export default Layout;
