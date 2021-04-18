import { useState, useEffect } from 'react';

interface IPaginationProps {
  page?: number
  totalPages?: number
  numPagingButtons?: number
  onPaging?: (page: number) => void
}
export default function Pagination({ page = 1, totalPages = 1, numPagingButtons = 5, onPaging }: IPaginationProps) {
  const [pageRange, handleLeftPaging, handleRightPaging] = usePaging(page, totalPages, numPagingButtons, onPaging);
  const pageButtons = [];
  for (let k = pageRange[0]; k <= pageRange[1]; k++) {
    const pageButtonClasses = `pagination-page${k === page ? ' pagination-page--active' : ''}`;
    pageButtons.push(
      <button className={pageButtonClasses}
        onClick={() => { onPaging && onPaging(k); }} key={k}
      >
        {k}
      </button>)
  }

  return (
    totalPages === 1 ? null :
      <div className='pagination' data-testid='pagination'>
        <button className='pagination-left'
          disabled={pageRange[0] <= 1}
          onClick={handleLeftPaging}
          data-testid='pagination-left'
        >{'<'}</button>
        {pageButtons}
        <button className='pagination-right'
          disabled={pageRange[1] >= totalPages}
          onClick={handleRightPaging}
          data-testid='pagination-right'
        >{'>'}</button>
      </div>
  );
}

function usePaging(page: number, totalPages: number, numPagingButtons: number, onPaging?: (page: number) => void):
  [Array<number>, () => void, () => void] {
  const [pageRange, setPageRange] = useState<number[]>(() => {
    return calPageRange(page, totalPages, numPagingButtons);
  });

  const rangeLeft = pageRange[0];
  const rangeRight = pageRange[1];
  useEffect(() => {
    const newPagesInRange = Math.min(numPagingButtons, totalPages);
    if ((newPagesInRange !== rangeRight - rangeLeft + 1)
      || page < rangeLeft || page > rangeRight) {
      setPageRange(calPageRange(page, totalPages, numPagingButtons));
    }
  }, [page, rangeLeft, rangeRight, totalPages, numPagingButtons]);

  const handleLeftPaging = () => {
    if (pageRange[0] <= 1) {
      return;
    }
    const shift = Math.max(1, Math.floor(numPagingButtons / 2));
    const newPage = pageRange[0] - 1;
    const left = Math.max(1, newPage - shift);
    const right = Math.min(left + numPagingButtons - 1, totalPages);
    setPageRange([left, right]);
    onPaging && onPaging(newPage);
  }
  const handleRightPaging = () => {
    if (pageRange[1] >= totalPages) {
      return;
    }
    const shift = Math.max(1, Math.floor(numPagingButtons / 2));
    const newPage = pageRange[1] + 1;
    const right = Math.min(totalPages, newPage + shift);
    const left = Math.max(right - numPagingButtons + 1, 1);
    setPageRange([left, right]);
    onPaging && onPaging(newPage);
  }

  return [pageRange, handleLeftPaging, handleRightPaging];
}

function calPageRange(page: number, totalPages: number, numPagingButtons: number) {
  const pagesInRange = Math.min(numPagingButtons, totalPages);
  if (page >= 1 && page <= pagesInRange) {
    return [1, pagesInRange];
  }

  const right = Math.min(totalPages, page + Math.floor((numPagingButtons - 1) / 2));
  return [right - pagesInRange + 1, right];
}
