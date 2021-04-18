interface ISearchFieldProps {
  keyword?: string
  onKeywordChange?: (keyword: string) => void
}
export default function SearchField(props: ISearchFieldProps) {
  return (
    <input type='text' data-testid='search-field'
      className='github-search__keyword'
      value={props.keyword}
      onChange={(e) => {
        props.onKeywordChange && props.onKeywordChange(e.target.value);
      }}
    />
  );
}
