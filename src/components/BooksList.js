import React, { useState, useEffect, useRef,useContext } from "react";
import { useNavigate } from "react-router-dom";
import BooksListContext from "../context/booksListContext";

const BooksList = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const scrollRef = useRef();
  const { booksList, updateBooksList, scrollToPosition, updateScrollPosition } =
  useContext(BooksListContext);

  const fetchBooks = async () => {
    setLoading(true);
    const apiUrl = `https://openlibrary.org/search/lists.json?q=book&limit=20&page=${page}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      updateBooksList([...booksList,...data.docs])
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching book data:", error.message);
      // Handle error appropriately in your application
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    updateScrollPosition(scrollTop);
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      fetchBooks();
    }
  };

  useEffect(() => {
    if (scrollToPosition) {
      // setTimeout(() => {
      //   scrollRef.current.scrollTop = scrollToPosition;
      //   updateScrollPosition(null)
      // }, 1);
      scrollRef.current.scrollTop = scrollToPosition;
      updateScrollPosition(null)
    } else {
      fetchBooks();
    }
  }, []);

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () => {
    if(scrollRef.current)  scrollRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div ref={scrollRef} className="max-height-100 overflow-auto ">
      <h1>Book List</h1>
      <ul>
        {booksList.map((book, index) => (
          //should not use index as key but since we are not getting any key or unique id from api will use it for now
          <li key={index} className="bg-blue text-white my-2 pointer p-2">
            <div
              onClick={() => {
                navigate(`/details/${index}`);
              }}
            >
              <p>Full URL: {book.full_url}</p>
              <p>Update Date: {book.last_update}</p>
              <p>Index{index}</p>
            </div>
          </li>
        ))}
      </ul>
      {loading && <p className="loading">Loading...</p>}
    </div>
  );
};

export default BooksList;
