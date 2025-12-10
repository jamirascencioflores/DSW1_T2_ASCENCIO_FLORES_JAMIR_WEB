import React, { useEffect, useState } from "react";
import bookService from "../services/bookService";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch (error) {
      console.error("Error cargando libros:", error);
    }
  };

  useEffect(() => {
    const initData = async () => {
      await loadBooks();
    };
    initData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) {
      await bookService.delete(id);
      await loadBooks();
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        {/* Encabezado de la Tarjeta */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📚 Gestión de Libros</h4>
          <Link to="/create-book" className="btn btn-light fw-bold">
            <i className="bi bi-plus-lg"></i> + Nuevo Libro
          </Link>
        </div>

        {/* Cuerpo de la Tarjeta */}
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>ISBN</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center" style={{ width: "200px" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td className="fw-bold text-secondary">{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {book.isbn}
                        </span>
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge rounded-pill ${
                            book.stock > 0 ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {book.stock} unid.
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group" role="group">
                          <Link
                            to={`/edit-book/${book.id}`}
                            className="btn btn-outline-warning btn-sm"
                          >
                            ✏️ Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No hay libros registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
