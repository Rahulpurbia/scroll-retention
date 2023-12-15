import React, { useState } from 'react';
import BooksListContext from "./booksListContext";

const BooksListProvider = ({ children }) => {
  const [booksList, setBooksList] = useState([]);
  const [scrollToPosition,setScrollToPosition]=useState()

  const updateBooksList = newValue => {
    setBooksList(newValue);
  };

  const updateScrollPosition= newValue=>{
    setScrollToPosition(newValue)
  }

  return (
    <BooksListContext.Provider value={{ booksList, updateBooksList,scrollToPosition,updateScrollPosition }}>
      {children}
    </BooksListContext.Provider>
  );
};

export default BooksListProvider;