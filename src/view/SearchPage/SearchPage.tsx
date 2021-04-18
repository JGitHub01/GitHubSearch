/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { useEffect, useState } from 'react';
import SortbyField from './SortbyField';
import SearchField from './SearchField';
import Pagination from './Pagination';
import LanguageFilter from './LanguageFilter';
import SearchResult from './SearchResult';
import { ISearchQuery, ISearchResult } from 'lib/models';
import { isScreenWidthAtLeast } from 'lib/responsive';

import './styles/search.scss';

interface ISearchPageProps {
  query: ISearchQuery
  result: ISearchResult
  onSearch: (query: ISearchQuery) => void
  isSearching?: boolean
}
const SearchPage = ({ query, result, onSearch, isSearching = false }: ISearchPageProps) => {
  const { language, perPage = 10, page, sort } = query;
  const { total_count } = result;
  const totalPages = Math.ceil(total_count / perPage);
  const numPagingButtons = usePagingButtons(totalPages);
  const [keyword, debouncedSearch] = useDebouncedSearch(query.keyword, onSearch);

  return (
    <div className='github-search' data-testid='search-page'>
      <h2>GitHub Repository Search</h2>
      <div className='github-search__toolbar'>
        <SortbyField
          sortby={sort}
          onSortbyChange={sort => onSearch({ sort, page: 1 })}
        />
        <LanguageFilter
          language={language}
          onLanguageChange={language => onSearch({ language, page: 1 })}
        />
      </div>
      <div className='github-search__sticky-header'>
        <SearchField
          keyword={keyword}
          onKeywordChange={keyword => debouncedSearch({ keyword, page: 1 })}
        />
        <div className='github-search__count'>
          <span>{`Total: ${total_count}`}</span>
          <span>{`${perPage}/page`}</span>
        </div>
      </div>
      <SearchResult
        keyword={keyword}
        isSearching={isSearching}
        {...result}
      />
      <div className='github-search__sticky-footer'>
        <Pagination page={page}
          totalPages={totalPages}
          numPagingButtons={numPagingButtons}
          onPaging={page => onSearch({ page })}
          key='pagination'
        />
      </div>
    </div>
  )
}

let searchDebouncer: NodeJS.Timeout;
function useDebouncedSearch(initKeyword: string | undefined, onSearch: (query: ISearchQuery) => void):
  [string | undefined, (query: ISearchQuery) => void] {
  const [keyword, setKeyword] = useState<string | undefined>(initKeyword);
  const debouncedSearch = (query: ISearchQuery) => {
    setKeyword(query.keyword);
    clearTimeout(searchDebouncer);
    searchDebouncer = setTimeout(() => {
      onSearch(query);
    }, 300);
  };
  return [keyword, debouncedSearch];
}
let resizeDebouncer: NodeJS.Timeout
function usePagingButtons(totalPages: number) {
  const [numPagingButtons, setNumPagingButtons] = useState<number>(() => {
    return isScreenWidthAtLeast('sm') ? 10 : 5;
  });

  useEffect(() => {
    const onResize = () => {
      clearTimeout(resizeDebouncer);
      resizeDebouncer = setTimeout(() => {
        const newNumPagingButtons = Math.min(totalPages, isScreenWidthAtLeast('sm') ? 10 : 5);
        if (newNumPagingButtons !== numPagingButtons) setNumPagingButtons(newNumPagingButtons);
      }, 300);
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [totalPages, numPagingButtons]);
  return numPagingButtons;
}

export default SearchPage;
