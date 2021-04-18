import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchField from './SearchField';

describe('SearchField', () => {
  it('Should render the basic snapshot view', () => {
    const {getByTestId} = render(<SearchField />);
    const searchField = getByTestId('search-field');
    expect(searchField).toMatchSnapshot();
  });

  it('Should call onKeywordChange with the entered text when a keyword is entered', () => {
    const callback = jest.fn();
    const {getByTestId} = render(<SearchField onKeywordChange={callback}/>);
    const searchField = getByTestId('search-field');
    userEvent.type(searchField, "tetris");
    expect(callback).toBeCalledWith("tetris");
  })
});
