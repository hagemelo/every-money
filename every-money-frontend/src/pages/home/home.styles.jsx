import styled from 'styled-components';

export const DisplayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const HomeStyles = {
  DisplayGrid
};

export default HomeStyles;