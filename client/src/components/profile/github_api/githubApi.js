const api = {
  clientId: '8c2720377d3c4b2dfc83',
  clientSecret: '57bad6139ff1fa1ded1b88158743e1b9924ddcb5',
  count: 5,
  sort: 'created: asc',
  repos: []
};

export const getGithub = username =>
  fetch(
    `https://api.github.com/users/${username}/repos?per_page=${
      api.count
    }&sort=${api.sorted}&client_id=${api.clientId}&client_secret=${
      api.clientSecret
    }`
  )
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
