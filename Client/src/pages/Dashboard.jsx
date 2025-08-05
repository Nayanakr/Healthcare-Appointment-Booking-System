import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppointments } from "../context/AppointmentContext";

const UserDashboard = () => {
  const [searchPatientId, setSearchPatientId] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(null);
  const navigate = useNavigate();

  // Get appointments from context
  const { appointments, deleteAppointment } = useAppointments();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchPatientId.trim() === "") {
      setFilteredPatients(null);
      return;
    }

    const results = appointments.filter((patient) =>
      (patient._id || "").toLowerCase().includes(searchPatientId.toLowerCase())
    );

    setFilteredPatients(results);
  };

  const handleDelete = async (id) => {
    console.log("Deleting appointment with ID:", id);
    
    // Check if the ID is a valid MongoDB ObjectId (24 character hex string)
    const isValidObjectId = id && /^[0-9a-fA-F]{24}$/.test(id);
    
    if (!isValidObjectId) {
      console.error("Invalid appointment ID format:", id);
      alert("Cannot delete appointment: Invalid ID format");
      return;
    }
    
    try {
      const response = await deleteAppointment(id);
      
      if (response && response.success) {
        console.log("Successfully deleted appointment");
        // Update the appointments list by filtering out the deleted appointment
        setAppointments(appointments.filter(appointment => appointment._id !== id));
        
        // If we're currently showing filtered results, update them too
        if (filteredPatients) {
          setFilteredPatients(filteredPatients.filter(patient => patient._id !== id));
        }
      } else {
        console.error("Failed to delete appointment:", response?.message);
        alert(`Failed to delete appointment: ${response?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("An error occurred while deleting the appointment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nayana Hospital Dashboard</h1>
          <Link to="/" className="hover:underline">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Patient ID Search */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-secondary mb-4">
            Find Patient by ID
          </h2>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={searchPatientId}
                onChange={(e) => setSearchPatientId(e.target.value)}
                placeholder="Enter MongoDB ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

          {filteredPatients && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">
                Search Results: {filteredPatients.length}{" "}
                {filteredPatients.length === 1 ? "patient" : "patients"} found
              </h3>
              {filteredPatients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          MongoDB ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Appointment
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPatients.map((patient) => (
                        <tr key={patient._id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-primary">
                            {patient._id}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {patient.name}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {patient.date} - {patient.time}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {patient.doctor}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                patient.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : patient.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : patient.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {patient.status || "Pending"}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete(patient._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No patients found with that ID.</p>
              )}
            </div>
          )}
        </div>

        {/* Recent Appointments */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-secondary">
              Recent Appointments
            </h2>
            <Link
              to="/appointments"
              className="text-primary hover:underline font-medium"
            >
              Book New Appointment
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment._id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.department || "General"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.doctor}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.date} - {appointment.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appointment.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => navigate("/appointments")}
                          className="text-primary hover:text-blue-700"
                          title="New appointment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(appointment._id || appointment.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete appointment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
