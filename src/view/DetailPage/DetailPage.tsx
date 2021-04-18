/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { RouteComponentProps } from 'react-router-dom';
import RepositoryDetail from './RepositoryDetail';
import BackToSearch from './BackToSearch';
import { IRepository } from 'lib/models';
import './styles/detail.scss';

const DetailPage = ({ location }: RouteComponentProps<{}, {}, IRepository>) => {
  const { state } = location;
  const { html_url } = state;
  return (
    <div className='repository-detail' data-testid='repository-detail'>
      <h2>Repository Detail</h2>
      <div className='repository-detail__body'>
        <BackToSearch />
        <RepositoryDetail {...state} />
        <a className='repository-detail__link' href={html_url} target='__blank'>Go to the repository</a>
      </div>
    </div>
  );
}

export default DetailPage;
