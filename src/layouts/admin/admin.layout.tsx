import { ReactNode } from "react";
import styled from "styled-components";
import Sidebar from "./sidebar";

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
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <main>{children}</main>
      <aside>
        <Sidebar />
      </aside>
    </Wrapper>
  );
};

export default Layout;
