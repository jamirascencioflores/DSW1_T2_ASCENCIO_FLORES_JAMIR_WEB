import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookService from "../services/bookService";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    stock: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      bookService.getById(id).then(setBook);
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await bookService.update(id, book);
    } else {
      await bookService.create(book);
    }
    navigate("/books");
  };

  return (
    <div className="card p-4">
      <h3>{id ? "Editar Libro" : "Nuevo Libro"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            name="title"
            value={book.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            name="author"
            value={book.author}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            value={book.stock}
            onChange={handleChange}
            className="form-control"
            required
            min="0"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default BookForm;
