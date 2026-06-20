import styled from 'styled-components';

export { ShellContainer as MainContainer, MainContent } from '../layout/app-shell.styles.jsx';

export const TableContainer = styled.div`
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: ${props => props.maxWidth || '900px'};
`;
