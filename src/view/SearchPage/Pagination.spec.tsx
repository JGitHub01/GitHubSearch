import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('Should render the basic snapshot view', () => {
    const {getByTestId} = render(<Pagination totalPages={5} />);
    const pagination = getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    expect(pagination).toMatchSnapshot();
  });

  it('Should render the snapshot view of 3 visible pages with 5 total pages', () => {
    const {getByTestId} = render(<Pagination page={4} totalPages={5} numPagingButtons={3} />);
    const pagination = getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    expect(pagination).toMatchSnapshot();
  });

  it('Should render the snapshot view at page 3', () => {
    const {getByTestId} = render(<Pagination totalPages={10} page={3} />);
    const pagination = getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    expect(pagination).toMatchSnapshot();
  });

  it('Should render the snapshot view at page 7', () => {
    const {getByTestId} = render(<Pagination totalPages={10} page={7} />);
    const pagination = getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    expect(pagination).toMatchSnapshot();
  });

  it('Should render the snapshot view at page 10', () => {
    const {getByTestId} = render(<Pagination totalPages={10} page={10} />);
    const pagination = getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    expect(pagination).toMatchSnapshot();
  });

  it('Should call onPaging callback with the new page number when a new page is clicked', () => {
    const callback = jest.fn();
    const {getByText} = render(<Pagination totalPages={5} onPaging={callback}/>);
    const page3 = getByText('3');
    userEvent.click(page3);
    expect(callback).toBeCalledWith(3);
  });

  it('Should call onPaging callback with the correct page number when the left paging button is clicked', () => {
    const callback = jest.fn();
    const {getByTestId} = render(<Pagination page={4} totalPages={7} numPagingButtons={3} onPaging={callback}/>);
    const leftButton = getByTestId('pagination-left');
    userEvent.click(leftButton);
    expect(callback).toBeCalledWith(2);
  });

  it('Should call onPaging callback with the correct page number when the right paging button is clicked', () => {
    const callback = jest.fn();
    const {getByTestId} = render(<Pagination totalPages={7} numPagingButtons={3} onPaging={callback}/>);
    const rightButton = getByTestId('pagination-right');
    userEvent.click(rightButton);
    expect(callback).toBeCalledWith(4);
  });
});
