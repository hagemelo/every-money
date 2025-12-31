import styled from 'styled-components';

export const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(to bottom right, rgb(225, 245, 248), rgb(211, 234, 238));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 25px; /* Adjust based on your sidebar width */

  h1 {
    color: #1f2937;
    margin-bottom: 1.5rem;
  }

  h3 {
    color: #374151;
    margin: 1.5rem 0;
  }
`;

export const OrcamentosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const HomeStyles = {
  HomeContainer,
  MainContent,
  OrcamentosGrid
};

export default HomeStyles;