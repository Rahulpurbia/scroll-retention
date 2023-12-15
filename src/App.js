import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import BooksList from "./components/BooksList";
import BookDetails from "./components/BookDetails";
import BooksListProvider from "./context/BooksListProvider";

function App() {
  return (
    <BooksListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/details/:bookKey" element={<BookDetails />} />
          <Route path="/" element={<BooksList />} />
        </Routes>
      </BrowserRouter>
    </BooksListProvider>
  );
}


export default App;
