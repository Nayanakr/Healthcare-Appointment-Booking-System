import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppointments } from "../context/AppointmentContext";

const DoctorDashboard = () => {
  const { appointments, updateAppointmentStatus } = useAppointments();
  const [searchPatientId, setSearchPatientId] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(null);

  // Enhanced patient data with medical details
  const patients = appointments.map((appointment) => ({
    ...appointment,
    age: appointment.age || Math.floor(Math.random() * 50) + 20,
    gender: appointment.gender || (Math.random() > 0.5 ? "Male" : "Female"),
    reason: appointment.reason || "General checkup",
    medicalHistory: appointment.medicalHistory || "None reported",
    medications: appointment.medications || "None",
    allergies: appointment.allergies || "None reported",
    department: appointment.department || "General Medicine",
  }));

  // Function to handle appointment completion
  const handleCompleteAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "Completed");
  };

  // Function to handle appointment rescheduling
  const handleRescheduleAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "Rescheduled");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchPatientId.trim() === "") {
      setFilteredPatients(null);
      return;
    }

    const results = patients.filter((patient) =>
      patient.id.toLowerCase().includes(searchPatientId.toLowerCase())
    );

    setFilteredPatients(results);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Doctor Dashboard - Nayana Hospital
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Dr. Sarah Johnson</span>
            <Link to="/" className="hover:underline text-sm">
              Logout
            </Link>
          </div>
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
                placeholder="Enter Patient ID (e.g., P-10045)"
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
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="border border-gray-200 rounded-md p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-primary">
                            {patient.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Patient ID: {patient.id} | {patient.age} years,{" "}
                            {patient.gender}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            patient.status === "Checked In"
                              ? "bg-green-100 text-green-800"
                              : patient.status === "Waiting"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700">
                            Appointment
                          </h5>
                          <p className="text-sm">
                            {patient.date}, {patient.time}
                          </p>
                          <h5 className="text-sm font-medium text-gray-700 mt-2">
                            Reason for Visit
                          </h5>
                          <p className="text-sm">{patient.reason}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700">
                            Medical History
                          </h5>
                          <p className="text-sm">{patient.medicalHistory}</p>
                          <h5 className="text-sm font-medium text-gray-700 mt-2">
                            Current Medications
                          </h5>
                          <p className="text-sm">{patient.medications}</p>
                          <h5 className="text-sm font-medium text-gray-700 mt-2">
                            Allergies
                          </h5>
                          <p className="text-sm">{patient.allergies}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="bg-primary text-white text-sm py-1 px-3 rounded hover:bg-blue-700">
                          View Full Record
                        </button>
                        <button className="border border-primary text-primary text-sm py-1 px-3 rounded hover:bg-blue-50">
                          Add Notes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No patients found with that ID.</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Today's Appointments
            </h2>
            <p className="text-gray-600 mb-4">
              Your scheduled appointments for today
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-primary">8</span>
              <span className="text-sm text-green-500">3 Completed</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Patient Records
            </h2>
            <p className="text-gray-600 mb-4">
              Access your patient medical records
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-primary">42</span>
              <span className="text-sm text-gray-500">Active Patients</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Schedule
            </h2>
            <p className="text-gray-600 mb-4">Your upcoming weekly schedule</p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-primary">32</span>
              <span className="text-sm text-gray-500">Hours this week</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-secondary mb-4">
            Today's Patient Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Patient ID: {patient.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {patient.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {patient.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : patient.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : patient.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : patient.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : patient.status === "Rescheduled"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleCompleteAppointment(patient.id)}
                        className={`mr-3 ${
                          patient.status === "Completed" ||
                          patient.status === "Cancelled"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-primary hover:text-blue-700"
                        }`}
                        disabled={
                          patient.status === "Completed" ||
                          patient.status === "Cancelled"
                        }
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleRescheduleAppointment(patient.id)}
                        className={`${
                          patient.status === "Completed" ||
                          patient.status === "Cancelled"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        disabled={
                          patient.status === "Completed" ||
                          patient.status === "Cancelled"
                        }
                      >
                        Reschedule
                      </button>
                    </td>
                  </tr>
                ))}
                {patients.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Medical Notes
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="text-sm text-gray-600">July 6, 2025 - 9:15 AM</p>
                <p className="text-sm">
                  Patient Michael Brown reported improvement after changing
                  medication. Blood pressure readings normal. Follow-up in 3
                  months.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="text-sm text-gray-600">July 5, 2025 - 3:45 PM</p>
                <p className="text-sm">
                  Patient Emily Clark diagnosed with mild bronchitis. Prescribed
                  antibiotics and recommended rest for 5 days.
                </p>
              </div>
              <button className="text-primary hover:text-blue-700 text-sm font-medium">
                View all notes
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Hospital Announcements
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Staff Meeting</h3>
                <p className="text-sm text-gray-600">July 8, 2025 - 8:00 AM</p>
                <p className="text-sm">
                  Quarterly staff meeting in Conference Room A. Attendance is
                  mandatory.
                </p>
              </div>
              <div>
                <h3 className="font-medium">New Protocol Training</h3>
                <p className="text-sm text-gray-600">July 10, 2025 - 2:00 PM</p>
                <p className="text-sm">
                  Training session on updated patient care protocols. Please
                  register by July 8.
                </p>
              </div>
              <button className="text-primary hover:text-blue-700 text-sm font-medium">
                View all announcements
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
