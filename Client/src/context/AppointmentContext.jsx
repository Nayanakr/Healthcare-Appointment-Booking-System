import React, { createContext, useState, useContext, useEffect } from "react";
import {
  fetchAppointments,
  postToAPI,
  updateAppointmentStatus as updateStatus,
  deleteAppointment as deleteAppt,
} from "../services/api";

// Create the context
const AppointmentContext = createContext();

// Create a provider component
export const AppointmentProvider = ({ children }) => {
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments from backend when component mounts
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetchAppointments();

        if (response && response.success) {
          setAppointments(response.data);
        } else {
          console.error(
            "Failed to fetch appointments:",
            response ? response.message : "Unknown error"
          );
          // Just set empty array if API fails
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments. Please try again later.");
        // Set empty array on error
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Function to add a new appointment
  const addAppointment = async (newAppointment) => {
    try {
      const response = await postToAPI("/appointments", newAppointment);
      if (response && response.success) {
        setAppointments([newAppointment, ...appointments]);
        return true;
      } else {
        console.error(
          "Failed to add appointment:",
          response ? response.message : "Unknown error"
        );
        return false;
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
      return false;
    }
  };

  // Function to delete an appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      console.log('Deleting appointment with ID:', appointmentId);
      
      // Make the API call to delete the appointment
      const response = await deleteAppt(appointmentId);
      console.log('Delete response:', response);
      
      if (response && response.success) {
        // Update the state to remove the deleted appointment
        setAppointments(
          appointments.filter((appointment) => appointment._id !== appointmentId)
        );
        return true;
      } else {
        console.log("Failed to delete appointment:", response?.message);
        return false;
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      return false;
    }
  };

  // Function to update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await updateStatus(appointmentId, newStatus);
      if (response && response.success) {
        setAppointments(
          appointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
        return true;
      } else {
        console.error(
          "Failed to update appointment status:",
          response ? response.message : "Unknown error"
        );
        return false;
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      return false;
    }
  };

  // Function to refresh appointments from the backend
  const refreshAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchAppointments();

      if (response && response.success) {
        setAppointments(response.data);
        return true;
      } else {
        console.error(
          "Failed to refresh appointments:",
          response ? response.message : "Unknown error"
        );
        setError("Failed to refresh appointments. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error refreshing appointments:", error);
      setError("Failed to connect to the server. Please try again later.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Value to be provided to consumers
  const value = {
    appointments,
    loading,
    error,
    addAppointment,
    deleteAppointment,
    updateAppointmentStatus,
    refreshAppointments,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Custom hook to use the appointment context
export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointments must be used within an AppointmentProvider"
    );
  }
  return context;
};
