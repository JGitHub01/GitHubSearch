import { ISearchQuery, ISearchResult, IRepository } from 'lib/models';

export const gitHubApiUrl = 'https://api.github.com/search/repositories';
export default async function search(query: ISearchQuery): Promise<ISearchResult> {
  const {
    keyword = '',
    language = 'javascript',
    sort = '',
    order = 'desc',
    perPage = 20,
    page = 1
  } = query;
  const queryStr = new URLSearchParams({
    q: `${keyword}+language:${language}`,
    sort: sort,
    order: order,
    per_page: perPage.toString(),
    page: page.toString()
  }).toString();
  const searchUrl = `${gitHubApiUrl}?${queryStr}`;
  try {
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        "Accept": "application/vnd.github.v3.text-match+json"
      }
    });
    if (response.status === 200) {
      return response.json();
    } else {
      return {
        total_count: 0,
        success: false,
        msg: response.status.toString()
      };
    }
  } catch (e) {
    return {
      total_count: 0,
      success: false,
      msg: e.toString()
    };
  }
}

export function keywordIndices(repo: IRepository) {
  const indices = repo.text_matches.reduce((indices: {[prop: string]: Array<number[]>}, tm) => {
    if (tm.property === "name" || tm.property === "description") {
      const startIdx = repo[tm.property].indexOf(tm.fragment);
      tm.matches.forEach(m => {
        indices[tm.property].push([startIdx + m.indices[0], startIdx + m.indices[1]]);
      });
    }
    return indices;
  }, { "name": new Array<number[]>(), "description": new Array<number[]>() });
  return indices;
}
