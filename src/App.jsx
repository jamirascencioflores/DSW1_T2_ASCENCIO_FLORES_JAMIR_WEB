import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import LoanList from './components/LoanList';
import LoanForm from './components/LoanForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Evluación T2 - Biblioteca</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/books">Libros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/loans">Préstamos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-loan">Nuevo Préstamo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/create-book" element={<BookForm />} />
          <Route path="/edit-book/:id" element={<BookForm />} />
          <Route path="/loans" element={<LoanList />} />
          <Route path="/create-loan" element={<LoanForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;