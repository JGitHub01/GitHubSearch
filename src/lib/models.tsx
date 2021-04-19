/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export interface ISearchQuery {
  keyword?: string
  language?: string
  sort?: string
  order?: string
  perPage?: number
  page?: number
}
export interface IRepositoryOwner {
  login: string,
  id: number,
  avatar_url: string,
  url: string,
  html_url: string
}
interface IMatch {
  text: string
  indices: number[]
}
interface ITextMatch {
  property: string
  fragment: string
  matches: IMatch[]
}
export interface IRepository {
  id: number,
  name: string,
  full_name: string,
  owner: IRepositoryOwner,
  description: string,
  url: string,
  html_url: string,
  stargazers_count: number,
  language: string
  text_matches?: ITextMatch[]
}
export interface ISearchResult {
  total_count: number
  incomplete_results?: boolean
  items?: IRepository[]
  success?: boolean
  msg?: string
}
