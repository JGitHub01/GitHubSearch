import { render } from '@testing-library/react';
import RepositoryItem from './RepositoryItem';

describe('RepositoryItem', () => {
  const item = {
    archive_url: "https://api.github.com/repos/chvin/react-tetris/{archive_format}{/ref}",
    archived: false,
    assignees_url: "https://api.github.com/repos/chvin/react-tetris/assignees{/user}",
    blobs_url: "https://api.github.com/repos/chvin/react-tetris/git/blobs{/sha}",
    branches_url: "https://api.github.com/repos/chvin/react-tetris/branches{/branch}",
    clone_url: "https://github.com/chvin/react-tetris.git",
    collaborators_url: "https://api.github.com/repos/chvin/react-tetris/collaborators{/collaborator}",
    comments_url: "https://api.github.com/repos/chvin/react-tetris/comments{/number}",
    commits_url: "https://api.github.com/repos/chvin/react-tetris/commits{/sha}",
    compare_url: "https://api.github.com/repos/chvin/react-tetris/compare/{base}...{head}",
    contents_url: "https://api.github.com/repos/chvin/react-tetris/contents/{+path}",
    contributors_url: "https://api.github.com/repos/chvin/react-tetris/contributors",
    created_at: "2016-12-20T12:26:11Z",
    default_branch: "master",
    deployments_url: "https://api.github.com/repos/chvin/react-tetris/deployments",
    description: "Use React, Redux, Immutable to code Tetris. 🎮",
    disabled: false,
    downloads_url: "https://api.github.com/repos/chvin/react-tetris/downloads",
    events_url: "https://api.github.com/repos/chvin/react-tetris/events",
    fork: false,
    forks: 1283,
    forks_count: 1283,
    forks_url: "https://api.github.com/repos/chvin/react-tetris/forks",
    full_name: "chvin/react-tetris",
    git_commits_url: "https://api.github.com/repos/chvin/react-tetris/git/commits{/sha}",
    git_refs_url: "https://api.github.com/repos/chvin/react-tetris/git/refs{/sha}",
    git_tags_url: "https://api.github.com/repos/chvin/react-tetris/git/tags{/sha}",
    git_url: "git://github.com/chvin/react-tetris.git",
    has_downloads: true,
    has_issues: true,
    has_pages: true,
    has_projects: true,
    has_wiki: true,
    homepage: "https://chvin.github.io/react-tetris/?lan=en",
    hooks_url: "https://api.github.com/repos/chvin/react-tetris/hooks",
    html_url: "https://github.com/chvin/react-tetris",
    id: 76954504,
    issue_comment_url: "https://api.github.com/repos/chvin/react-tetris/issues/comments{/number}",
    issue_events_url: "https://api.github.com/repos/chvin/react-tetris/issues/events{/number}",
    issues_url: "https://api.github.com/repos/chvin/react-tetris/issues{/number}",
    keys_url: "https://api.github.com/repos/chvin/react-tetris/keys{/key_id}",
    labels_url: "https://api.github.com/repos/chvin/react-tetris/labels{/name}",
    language: "JavaScript",
    languages_url: "https://api.github.com/repos/chvin/react-tetris/languages",
    license: null,
    merges_url: "https://api.github.com/repos/chvin/react-tetris/merges",
    milestones_url: "https://api.github.com/repos/chvin/react-tetris/milestones{/number}",
    mirror_url: null,
    name: "react-tetris",
    node_id: "MDEwOlJlcG9zaXRvcnk3Njk1NDUwNA==",
    notifications_url: "https://api.github.com/repos/chvin/react-tetris/notifications{?since,all,participating}",
    open_issues: 3,
    open_issues_count: 3,
    owner: {
      login: "chvin",
      id: 5383506,
      avatar_url: "https://avatars.githubusercontent.com/u/5383506?v=4",
      url: "https://api.github.com/users/chvin",
      html_url: "https://github.com/chvin"
    },
    private: false,
    pulls_url: "https://api.github.com/repos/chvin/react-tetris/pulls{/number}",
    pushed_at: "2021-02-19T09:29:28Z",
    releases_url: "https://api.github.com/repos/chvin/react-tetris/releases{/id}",
    score: 1,
    size: 4319,
    ssh_url: "git@github.com:chvin/react-tetris.git",
    stargazers_count: 6491,
    stargazers_url: "https://api.github.com/repos/chvin/react-tetris/stargazers",
    statuses_url: "https://api.github.com/repos/chvin/react-tetris/statuses/{sha}",
    subscribers_url: "https://api.github.com/repos/chvin/react-tetris/subscribers",
    subscription_url: "https://api.github.com/repos/chvin/react-tetris/subscription",
    svn_url: "https://github.com/chvin/react-tetris",
    tags_url: "https://api.github.com/repos/chvin/react-tetris/tags",
    teams_url: "https://api.github.com/repos/chvin/react-tetris/teams",
    trees_url: "https://api.github.com/repos/chvin/react-tetris/git/trees{/sha}",
    updated_at: "2021-04-15T07:24:51Z",
    url: "https://api.github.com/repos/chvin/react-tetris",
    watchers: 6491,
    watchers_count: 6491,
  }
  it('Should render the basic snapshot view', () => {
    const { getByTestId } = render(<RepositoryItem {...item} />);
    const repoItem = getByTestId('repository-item');
    expect(repoItem).toMatchSnapshot();
  });
});