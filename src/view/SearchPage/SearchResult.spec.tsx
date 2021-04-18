import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchResult from './SearchResult';
import { search_result } from 'resources/tests-data/repository_data';

describe('SearchResult', () => {
  it('Should render the basic snapshot view with no keyword', () => {
    const { getByTestId } = render(
      <Router>
        <SearchResult total_count={0} />
      </Router>
    );
    expect(getByTestId('search-result')).toMatchSnapshot();
  });
  it('Should render the snapshot view with no repository found', () => {
    const { getByTestId } = render(
      <Router>
        <SearchResult total_count={0} keyword="blabla"/>
      </Router>
    );
    expect(getByTestId('search-result')).toMatchSnapshot();
  });
  it('Should render the snapshot view of successful search', () => {
    const { getByTestId } = render(
      <Router>
        <SearchResult {...search_result} />
      </Router>
    );
    expect(getByTestId('search-result')).toMatchSnapshot();
  });
  it('Should render the snapshot view of failed search', () => {
    const failed_search = {
      total_count: 0,
      success: false,
      msg: "Network failure!"
    }
    const { getByTestId } = render(
      <Router>
        <SearchResult {...failed_search} />
      </Router>
    );
    expect(getByTestId('search-result')).toMatchSnapshot();
  });
});
