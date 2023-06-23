import { ReactNode } from "react";
import styled from "styled-components";
import TheSidebar from "./the-sidebar";
import TheHeader from "./the-header";
import { Drawer } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
  drawerState?: boolean;
  drawerContent?: ReactNode;
  onDrawerClose?: (state: boolean) => void;
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

const Layout: React.FC<LayoutProps> = ({
  children,
  drawerState,
  drawerContent,
  onDrawerClose,
}) => {
  const closeDrawer = () => onDrawerClose;

  return (
    <Wrapper>
      <main>
        <TheHeader />
        {children}
      </main>
      <aside>
        <TheSidebar />
      </aside>
      <Drawer anchor="bottom" open={drawerState} onClose={closeDrawer()}>
        <div
          className="drawer"
          style={{ display: "grid", placeItems: "center" }}
        >
          {drawerContent}
        </div>
      </Drawer>
    </Wrapper>
  );
};

export default Layout;
