import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortbyField from './SortbyField';

describe('SortbyField', () => {
  it('Should render the default snapshot view', () => {
    const { getByTestId } = render(<SortbyField />);
    const sortByField = getByTestId('sortby-field');
    expect(sortByField).toMatchSnapshot();
  });

  it('Should render the view with a set sort', () => {
    const { getByTestId } = render(<SortbyField sortby="stars" />);
    const sortByList = getByTestId('sortby-list');
    expect(sortByList).toHaveValue("stars");
  });

  it('Should call onSortbyChange with the new sort when a new sort is selected', () => {
    const callback = jest.fn();
    const { getByText, getByTestId } = render(<SortbyField onSortbyChange={callback} />);
    const sortByList = getByTestId('sortby-list');
    const starsOption = getByText('Stars');
    userEvent.selectOptions(sortByList, starsOption);
    expect(callback).toBeCalledWith('stars');
  });
});
