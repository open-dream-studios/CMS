export const GIT_KEYS = {
  owner: "open-dream-studios",
  repo: "jg-portfolio",
  branch: "main",
  token: process.env.REACT_APP_GIT_PAT,
};

export const BASE_URL = `https://raw.githubusercontent.com/${GIT_KEYS.owner}/${GIT_KEYS.repo}/refs/heads/${GIT_KEYS.branch}/public/assets/`;