import { createContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const SearchState = useState({
    MySearchResult: [
      {
        keyword: '',
        result: [],

      },
    ],
  });

  return (
    <SearchContext.Provider value={SearchState}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
