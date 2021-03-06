import styled from 'styled-components';

export const HomepageGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const SingleItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    /* border: 1px solid red; */
    height: auto;
  }
  p {
    position: absolute;
    transform: rotate(-2deg) translateY(-140%);
    width: 100%;

    .mark {
      display: inline;
    }
  }

  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 2s infinite linear;
  }
`;
