import { useState, useEffect } from "react";

const Pagination = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const maxRows = 10;
  
  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setEmployeeList(data))
      .catch((err) => {
        setError(err.message);
        alert("Failed to fetch data");
      });
  }, []);

  const maxPages = Math.ceil(employeeList.length / maxRows);
  const start = (currentPage - 1) * maxRows;
  const end = start + maxRows;
  const currentList = employeeList.slice(start, end);

  const handleNext = () => {
    if (currentPage < maxPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Employee Data Table</h1>
      {error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-emerald-600 text-white text-left">
                <th className="p-2 text-center">Id</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Email</th>
                <th className="p-2 text-center">Role</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200">
                  <td className="p-2 text-center">{employee.id}</td>
                  <td className="p-2 text-center">{employee.name}</td>
                  <td className="p-2 text-center">{employee.email}</td>
                  <td className="p-2 text-center">{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="px-4 py-2 bg-emerald-600 text-white rounded">
              {currentPage}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === maxPages}
              className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
