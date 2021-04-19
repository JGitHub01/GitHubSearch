import HighlightKeyword from 'view/components/HighlightKeyword';
import { IRepository } from 'lib/models';
import { keywordIndices } from 'lib/search';

export default function RepositoryItem(repo: IRepository) {
  const { name = "", description = "" } = repo;
  const indices = keywordIndices(repo);
  return (
    <div className='repository' data-testid='repository-item'>
      <div className='repository-name'>
        <span className='repository-name__label'>Name:</span>
        <div className='repository-name__text'>
          <HighlightKeyword
            content={name}
            highlightClass='highlight'
            indices={indices && indices.name}
          />
        </div>
      </div>
      <div className='repository-description'>
        <span className='repository-description__label'>Description:</span>
        <div className='repository-description__text'>
          <HighlightKeyword
            content={description}
            highlightClass='highlight'
            indices={indices && indices.description}
          />
        </div>
      </div>
    </div>
  );
}
