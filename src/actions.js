export const SET_SEARCH = "SET_SEARCH";
export const SET_CURRENT_REPO = "SET_CURRENT_REPO";

export const setSearch = search => ({
  type: SET_SEARCH,
  search
});

export const setCurrentRepository = currRepo => ({
  type: SET_CURRENT_REPO,
  currRepo
})