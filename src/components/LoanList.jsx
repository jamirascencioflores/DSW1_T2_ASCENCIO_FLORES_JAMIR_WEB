import React, { useEffect, useState } from "react";
import loanService from "../services/loanService";

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  const loadLoans = async () => {
    const data = await loanService.getAll();
    setLoans(data);
  };

  useEffect(() => {
    // Envoltura para satisfacer al linter
    const initData = async () => {
      await loadLoans();
    };
    initData();
  }, []);

  const handleReturn = async (id) => {
    if (window.confirm("¿Confirmar devolución del libro?")) {
      await loanService.returnLoan(id);
      loadLoans(); // Recargar lista
    }
  };

  return (
    <div>
      <h2>Préstamos Activos e Historial</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Libro</th>
            <th>Estudiante</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className={loan.status === "Returned" ? "table-success" : ""}
            >
              <td>{loan.bookTitle}</td>
              <td>{loan.studentName}</td>
              <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
              <td>
                {loan.returnDate
                  ? new Date(loan.returnDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>{loan.status}</td>
              <td>
                {loan.status === "Active" && (
                  <button
                    onClick={() => handleReturn(loan.id)}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Devolver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanList;
