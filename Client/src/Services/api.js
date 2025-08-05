// API service for making requests to the backend
const API_BASE_URL = 'http://localhost:5000/api'; // Server is running on port 5000

/**
 * Makes a GET request to the API
 * @param {string} endpoint - The API endpoint to call
 * @returns {Promise<any>} - The API response
 */
export const getFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API GET Error:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Fetches all appointments from the API
 * @returns {Promise<any>} - The API response with appointments data
 */
export const fetchAppointments = async () => {
  return getFromAPI('/appointments');
};

/**
 * Makes a POST request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {object} data - The data to send
 * @returns {Promise<any>} - The API response
 */
export const postToAPI = async (endpoint, data) => {
  try {
    console.log(`Sending POST request to ${API_BASE_URL}${endpoint}`, data);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();
    
    // Store and log MongoDB _id if present in the response
    let mongoDbId = null;
    if (responseData.success && responseData.data && responseData.data._id) {
      mongoDbId = responseData.data._id;
      console.log('MongoDB _id from API response:', mongoDbId);
      console.log('MongoDB document:', responseData.data);
      
      // Store in localStorage for persistence across page refreshes
      localStorage.setItem('lastMongoDbId', mongoDbId);
    }
    
    if (!response.ok) {
      console.error('API Error Response:', responseData);
      return { 
        success: false, 
        message: responseData.message || 'Server error', 
        details: responseData 
      };
    }
    
    return responseData;
  } catch (error) {
    console.error('API POST Error:', error);
    return { success: false, message: 'Network error', error: error.toString() };
  }
};

/**
 * Makes a PUT request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {object} data - The data to send
 * @returns {Promise<any>} - The API response
 */
export const putToAPI = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('API PUT Error:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Makes a DELETE request to the API
 * @param {string} endpoint - The API endpoint to call
 * @returns {Promise<any>} - The API response
 */
export const deleteFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API DELETE Error:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Deletes an appointment by ID
 * @param {string} appointmentId - The ID of the appointment to delete
 * @returns {Promise<any>} - The API response
 */
export const deleteAppointment = async (appointmentId) => {
  console.log('API deleteAppointment called with ID:', appointmentId);
  
  // Check if the ID is in a valid format (24 character hex string)
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(appointmentId);
  
  if (!isValidObjectId) {
    console.error('Invalid MongoDB ObjectId format:', appointmentId);
    return { success: false, message: 'Invalid appointment ID format' };
  }
  
  return deleteFromAPI(`/appointments/${appointmentId}`);
};

/**
 * Updates the status of an appointment
 * @param {string} appointmentId - The ID of the appointment to update
 * @param {string} newStatus - The new status value
 * @returns {Promise<any>} - The API response
 */
export const updateAppointmentStatus = async (appointmentId, newStatus) => {
  return putToAPI(`/appointments/${appointmentId}`, { status: newStatus });
};
