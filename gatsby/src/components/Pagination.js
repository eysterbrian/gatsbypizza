import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 2rem;
  text-align: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--grey);
  & > * {
    flex-grow: 1;
    padding: 1rem;
    border-right: 1px solid var(--grey);
    text-decoration: none;

    &.current,
    &[aria-current='page'] {
      color: var(--red);
    }

    &[disabled] {
      color: var(--grey);
      pointer-events: none;
    }
  }
`;

export default function Pagination({
  baseUrl,
  currentPage = 1,
  pageSize,
  totalCount,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPageNum = currentPage - 1;
  const nextPageNum = currentPage + 1;
  const hasPrevPage = prevPageNum >= 1;
  const hasNextPage = nextPageNum <= totalPages;

  function getPageUrl(pageNum) {
    // The first page doesn't have a pagenum in the url
    if (pageNum <= 1) {
      return baseUrl;
    }
    // Just for safety, don't ever let URL go past the valid  max page
    if (pageNum > totalPages) {
      return `${baseUrl}/${totalPages}`;
    }
    return `${baseUrl}/${pageNum}`;
  }

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={getPageUrl(prevPageNum)}>
        ← Previous
      </Link>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <Link key={idx} to={getPageUrl(idx + 1)}>
          {idx + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={getPageUrl(nextPageNum)}>
        Next →
      </Link>
    </PaginationStyles>
  );
}
