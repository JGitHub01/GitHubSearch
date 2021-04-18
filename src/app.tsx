/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from 'view/SearchPage/SearchPage';
import DetailPage from 'view/DetailPage/DetailPage';
import gitHubSearch from 'lib/search';
import { ISearchQuery, ISearchResult } from 'lib/models';

import './styles/app.scss';

const App = () => {
  const perPage = 30;
  const [
    query,
    result,
    isSearching,
    search
  ] = useSearch({
    keyword: "",
    language: 'javascript',
    perPage: perPage
  });
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <SearchPage isSearching={isSearching} query={query}
            result={result}
            onSearch={query => search(query)}
          />
        </Route>
        <Route path='/detail' component={DetailPage} />
      </Switch>
    </Router>
  );
}

const useSearch = (initQuery: ISearchQuery):
  [ISearchQuery, ISearchResult, boolean, (query: ISearchQuery) => void] => {
  const [query, setQuery] = useState<ISearchQuery>(initQuery);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [result, setResult] = useState<ISearchResult>({ total_count: 0 });
  const search = async (inQuery: ISearchQuery) => {
    const newQuery = { ...query, ...inQuery };
    setQuery(newQuery);
    setIsSearching(true);
    try {
      const result = await gitHubSearch(newQuery);
      setIsSearching(false);
      setResult(result);
    } catch (e) {
      setResult({
        total_count: 0,
        success: false,
        msg: e.toString()
      });
    }
  };

  return [query, result, isSearching, search];
}

export default App;
