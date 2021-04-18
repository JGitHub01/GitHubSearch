interface ISortbyFieldProps {
  sortby?: string
  onSortbyChange?: (sortby: string) => void
}
export default function SortbyField({ sortby, onSortbyChange }: ISortbyFieldProps) {
  return (
    <div className='github-search__sortby' data-testid='sortby-field'>
      <label htmlFor='sortby'>Sort by:</label>
      <select data-testid='sortby-list'
        name='sortby'
        value={sortby}
        onChange={e => {
          onSortbyChange && onSortbyChange(e.target.value);
        }}
      >
        <option value=''>Best match</option>
        <option value='stars'>Stars</option>
      </select>
    </div>
  );
}
