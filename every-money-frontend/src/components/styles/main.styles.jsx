import styled from 'styled-components';

export const MainContainer = styled.div`
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

export const TableContainer = styled.div`
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
`;