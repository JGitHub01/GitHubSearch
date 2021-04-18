import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageFilter from './LanguageFilter';

describe('LanguageFilter', () => {
  it('Should render the default snapshot view', () => {
    const { getByTestId } = render(<LanguageFilter />);
    const lanFilter = getByTestId('search-language');
    expect(lanFilter).toMatchSnapshot();
  });

  it('Should render the view with a set language', () => {
    const { getByTestId } = render(<LanguageFilter language="python" />);
    const lanList = getByTestId('language-list');
    expect(lanList).toHaveValue("python");
  });

  it('Should call onLanguageChange with the new language when a new language is selected', () => {
    const callback = jest.fn();
    const { getByText, getByTestId } = render(<LanguageFilter onLanguageChange={callback} />);
    const lanList = getByTestId('language-list');
    const phpOption = getByText('PhP');
    userEvent.selectOptions(lanList, phpOption);
    expect(callback).toBeCalledWith('php');
  });
});
