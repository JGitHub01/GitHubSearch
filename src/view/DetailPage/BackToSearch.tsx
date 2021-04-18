import { useHistory } from 'react-router-dom';

export default function BackToSearch() {
  const history = useHistory();

  return (
    <button type='button' data-testid='back-to-search'
      onClick={() => { history.goBack(); }}
    >
      Back to search
    </button>
  );
}
