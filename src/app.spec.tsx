import { render, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './app';
import { gitHubApiUrl } from 'lib/search';
import { search_result } from 'resources/tests-data/repository_data';

jest.mock('lib/responsive', () => {
  return {
    isScreenWidthAtLeast: () => true
  };
});

const server = setupServer(
  rest.get(gitHubApiUrl, (req, res, ctx) => {
    return res(ctx.json(search_result));
  })
);

describe('App', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Should render the basic snapshot view', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('search-page')).toMatchSnapshot();
  });
  it('Should initiate a search and display search result when a keyword is entered', async () => {
    jest.useFakeTimers();
    const { getByTestId, getAllByTestId } = render(<App />);
    const searchField = getByTestId('search-field');
    userEvent.type(searchField, 'tetris');
    expect(setTimeout).toBeCalledTimes(6);
    await act(() => { jest.runAllTimers(); return Promise.resolve(); });
    await waitFor(() => getAllByTestId('repository-item'));
    expect(getAllByTestId('repository-item')).toHaveLength(2);
    jest.useRealTimers();
  });
  it('Should initiate a search and display search result when a new language is selected', async () => {
    const { getAllByTestId, getByTestId, getByText } = render(<App />);
    const lanList = getByTestId('language-list');
    const phpOption = getByText('PhP');
    userEvent.selectOptions(lanList, phpOption);
    await waitFor(() => getAllByTestId('repository-item'));
    expect(getAllByTestId('repository-item')).toHaveLength(2);
  });
  it('Should initiate a search and display search result when sort by changes', async () => {
    const { getAllByTestId, getByTestId, getByText } = render(<App />);
    const sortbyList = getByTestId('sortby-list');
    const sortStars = getByText('Stars');
    userEvent.selectOptions(sortbyList, sortStars);
    await waitFor(() => getAllByTestId('repository-item'));
    expect(getAllByTestId('repository-item')).toHaveLength(2);
  });
  it('Should render error message for a failed search', async () => {
    server.use(
      rest.get(gitHubApiUrl, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    );
    const { getByTestId, getByText } = render(<App />);
    const lanList = getByTestId('language-list');
    const phpOption = getByText('PhP');
    userEvent.selectOptions(lanList, phpOption);
    await waitFor(() => getByText('Trouble search GitHub', { exact: false }));
    expect(getByText('Trouble search GitHub', { exact: false })).toMatchSnapshot();
  });
  describe('Routing', () => {
    it('Should display the detail page when a repository item is clicked and go back the search page when "Back to search" is clicked',
      async () => {
        const { getAllByTestId, getByTestId, getByText } = render(<App />);
        const lanList = getByTestId('language-list');
        const phpOption = getByText('PhP');
        userEvent.selectOptions(lanList, phpOption);
        await waitFor(() => getAllByTestId('repository-item'));
        userEvent.click(getAllByTestId('repository-item')[0]);
        await waitFor(() => getByTestId('repository-detail'))
        expect(getByTestId('repository-detail')).toMatchSnapshot();
        userEvent.click(getByTestId('back-to-search'));
        await waitFor(() => getByTestId('search-page'));
        expect(getByTestId('search-page')).toMatchSnapshot();
      });
  });
});
