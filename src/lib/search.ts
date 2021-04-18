import { ISearchQuery, ISearchResult } from 'lib/models';

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
