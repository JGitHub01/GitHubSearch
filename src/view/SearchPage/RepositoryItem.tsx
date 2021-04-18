interface IRepositoryItemProps {
  name?: string
  description?: string
}
export default function RepositoryItem(props: IRepositoryItemProps) {
  const { name, description } = props;
  return (
    <div className='repository' data-testid='repository-item'>
      <div className='repository-name'>
        <span className='repository-name__label'>Name:</span>
        <div className='repository-name__text'>{name}</div>
      </div>
      <div className='repository-description'>
        <span className='repository-description__label'>Description:</span>
        <div className='repository-description__text'>{description}</div>
      </div>
    </div>
  );
}
