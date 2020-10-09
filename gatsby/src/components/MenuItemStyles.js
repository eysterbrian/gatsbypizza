import styled from 'styled-components';

export const MenuItemStyles = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  .gatsby-image-wrapper {
    grid-row: span 2;
    margin-right: 1rem;
    height: 100%;
  }
  button {
    margin: 0 1rem 1rem 0;
    font-size: 1.5rem;
    &.remove {
      background: none;
      color: var(--red);
      font-size: 3rem;
      box-shadow: none;
      line-height: 1rem;
      margin: 0;
    }
  }
  .name {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
  }
`;
