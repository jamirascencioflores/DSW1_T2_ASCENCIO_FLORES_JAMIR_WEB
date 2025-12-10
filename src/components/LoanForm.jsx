import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookService from "../services/bookService";
import loanService from "../services/loanService";

const LoanForm = () => {
  const [books, setBooks] = useState([]);
  const [loan, setLoan] = useState({ bookId: "", studentName: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    bookService.getAll().then(setBooks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loanService.create(loan);
      navigate("/loans");
    } catch (err) {
      // Aquí mostramos el mensaje de error del Backend (Stock 0)
      setError(err.response?.data?.message || "Error al crear préstamo");
    }
  };

  return (
    <div className="card p-4">
      <h3>Registrar Préstamo</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Seleccionar Libro</label>
          <select
            className="form-select"
            value={loan.bookId}
            onChange={(e) => setLoan({ ...loan, bookId: e.target.value })}
            required
          >
            <option value="">-- Seleccione --</option>
            {books.map((b) => (
              <option key={b.id} value={b.id} disabled={b.stock <= 0}>
                {b.title} (Stock: {b.stock})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre del Estudiante</label>
          <input
            className="form-control"
            value={loan.studentName}
            onChange={(e) => setLoan({ ...loan, studentName: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Prestar
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
