import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchPage from './SearchPage';

jest.mock('lib/responsive', () => {
  return {
    isScreenWidthAtLeast: () => true
  };
});
describe('SearchPage', () => {
  const query = {
    keyword: "",
    language: 'javascript',
    perPage: 15
  }
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('Should render the basic snapshot view', () => {
    const { getByTestId } = render(
      <Router>
        <SearchPage query={query}
          result={{ total_count: 0 }}
          onSearch={jest.fn()}
        />
      </Router>
    );
    expect(getByTestId('search-page')).toMatchSnapshot();
  });

  it('Should call onSearch when a keyword is entered', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const { getByTestId } = render(
      <Router>
        <SearchPage query={query}
          result={{ total_count: 0 }}
          onSearch={callback}
        />
      </Router>
    );
    const searchField = getByTestId('search-field');
    userEvent.type(searchField, "tetris");
    expect(getByTestId('search-field')).toHaveValue('tetris');
    jest.runAllTimers();
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith({keyword: "tetris", page: 1})
  });

  it('Should call onSearch when a new language is selected', () => {
    const callback = jest.fn();
    const { getByTestId, getByText } = render(
      <Router>
        <SearchPage query={query}
          result={{ total_count: 0 }}
          onSearch={callback}
        />
      </Router>
    );
    const lanList = getByTestId('language-list');
    const phpOption = getByText('PhP');
    userEvent.selectOptions(lanList, phpOption);
    expect(callback).toBeCalledWith({language: 'php', page: 1});
  });

    it('Should call onSearch when a new sort is selected', () => {
      const callback = jest.fn();
      const { getByTestId, getByText } = render(
        <Router>
          <SearchPage query={query}
            result={{ total_count: 0 }}
            onSearch={callback}
          />
        </Router>
      );
      const sortbyList = getByTestId('sortby-list');
      const starsOption = getByText('Stars');
      userEvent.selectOptions(sortbyList, starsOption);
      expect(callback).toBeCalledWith({sort: 'stars', page: 1});
    });
});
