import { Skeleton } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f1f5f2;
`;
const LoadingTable = () => {
  return (
    <Wrapper>
      <Skeleton variant="rounded" width="100%" height={40} />
      <Skeleton variant="rounded" width="100%" height={340} />
    </Wrapper>
  );
};

export default LoadingTable;
