import { Link } from 'gatsby';
import React from 'react';

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
    <div>
      <Link disabled={!hasPrevPage} to={getPageUrl(prevPageNum)}>
        ← Previous
      </Link>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <Link to={getPageUrl(idx + 1)}>{idx + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={getPageUrl(nextPageNum)}>
        Next →
      </Link>
    </div>
  );
}
