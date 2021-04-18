const languages = [
  'JavaScript',
  'Java',
  'Python',
  'TypeScript',
  'C#',
  'C',
  'PhP',
  'Shell',
  'Ruby'].sort();
interface ILanguageFilterProps {
  language?: string
  onLanguageChange?: (language: string) => void
}
export default function LanguageFilter(props: ILanguageFilterProps) {
  const { language, onLanguageChange } = props;
  return (
    <div className='github-search__language' data-testid='search-language'>
      <label htmlFor='language'>Language:</label>
      <select name='language' data-testid='language-list'
        value={language}
        onChange={(e) => {
          onLanguageChange && onLanguageChange(e.target.value);
        }}
      >
        {languages.map((lan, idx) => {
          return (<option key={idx} value={lan.toLowerCase()}>{lan}</option>);
        })}
      </select>
    </div>
  );
}
