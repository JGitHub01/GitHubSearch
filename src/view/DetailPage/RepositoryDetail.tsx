import {IRepository} from 'lib/models';

export default function RepositoryDetail(props: IRepository) {
  const {name, description, language, stargazers_count, owner } = props;
  return (
    <div className='repository'>
      <div className='repository-field'>
        <h3 className='repository-field__label'>Name</h3>
        <div className='repository-field__text'>{name}</div>
      </div>
      <div className='repository-field'>
        <h3 className='repository-field__label'>Description</h3>
        <div className='repository-field__text'>{description}</div>
      </div>
      <div className='repository-field'>
        <h3 className='repository-field__label'>Language</h3>
        <div className='repository-field__text'>{language}</div>
      </div>
      <div className='repository-field'>
        <h3 className='repository-field__label'>Stars</h3>
        <div className='repository-field__text'>{stargazers_count}</div>
      </div>
      <div className='repository-field'>
        <h3 className='repository-field__label'>Owner</h3>
        <div className='repository-field__text'>{owner?.login}</div>
      </div>
    </div>
  );
}
