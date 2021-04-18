import { Link } from 'react-router-dom';
import { ISearchResult } from 'lib/models';
import RepositoryItem from './RepositoryItem';

interface ISearchResultProps extends ISearchResult {
  keyword?: string
  isSearching?: boolean
}
export default function SearchResult(props: ISearchResultProps) {
  const {
    keyword,
    isSearching = false,
    total_count,
    items,
    success = true,
    msg
  } = props;
  return (
    <div className='github-search-result' data-testid='search-result'>
      {(total_count > 0 && items != null) ?
        <div className='github-search-result__list' key='list'>
          {items.map((r, idx) =>
            <Link className='detail-link'
              to={{ pathname: '/detail', state: { ...r } }}
              key={idx}
            >
              <RepositoryItem name={r.name} description={r.description} />
            </Link>)
          }
        </div> :
        <div>
          {!success ? `Trouble search GitHub: ${msg}` :
            isSearching ? 'Searching GitHub repositoies ...' :
              keyword ? 'No repositories are found!' : 'Please enter a keyword!'}
        </div>
      }
    </div>
  );
}
