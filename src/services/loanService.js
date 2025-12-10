import api from "./api";

const loanService = {
  getAll: async () => {
    const response = await api.get("/loans");
    return response.data;
  },

  create: async (loanData) => {
    // loanData debe tener { bookId, studentName }
    const response = await api.post("/loans", loanData);
    return response.data;
  },

  returnLoan: async (id) => {
    // Endpoint especial para devolver libro
    const response = await api.post(`/loans/return/${id}`);
    return response.data;
  },
};

export default loanService;
