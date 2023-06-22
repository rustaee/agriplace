import { ReactNode } from "react";
import styled from "styled-components";
import TheSidebar from "./the-sidebar";
import TheHeader from "./the-header";

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
      <main>
        <TheHeader />
        {children}
      </main>
      <aside>
        <TheSidebar />
      </aside>
    </Wrapper>
  );
};

export default Layout;
