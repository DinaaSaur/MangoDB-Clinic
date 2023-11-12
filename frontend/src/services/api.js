import axios from 'axios';

const port = 4000

const API = axios.create({
    baseURL: `http://localhost:${port}`, // backend API URL
    timeout: 5000, // Timeout duration
    headers: {
        'Content-Type': 'application/json',
    },
});

//API requests
export const getPatients = () => API.get('/patients');
export const addPatient = (patient) => API.post('/patientRegistration', patient);
export const uploadHealthRecord = (id, files) => API.put(`/patient/add_documents/${ id }`, files, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getDoctor = (id) => API.get(`/doctor/doctorInfo/${ id }`);
export const getPatientsDoctor = (id) => API.get(`/doctor/viewAllPatients/${ id }`);
export const searchPatients = (id, firstName) => API.post(`/doctor/searchPatientByName/${ id }`, { firstName });
export const upcomingApp = (doctorId) => API.post('/doctor/upcoming/', { doctorId });
export const selectPatient = (id) => API.get(`/doctor/selectedPatient/${ id }`);
export const updateDoctorEmail = (id, doctor) => API.put(`/doctor/updateEmail/${ id }`, doctor);
export const updateDoctorRate = (id, doctor) => API.put(`/doctor/updateHourlyRate/${ id }`, doctor);
export const updateDoctorAffiliation = (id, doctor) => API.put(`/doctor/updateAffiliation/${id}`, doctor);

export const getMyAppointments = (id) => API.get(`/doctor/getMyAppointments/${ id }`);
export const filterAppointments = (query) => API.post('/doctor/filterapp', query);

export const viewWallet = (id) => API.get(`/patient/view_wallet/${ id }`);

export const viewPatientAppointments=(id)=> API.get(`/patient/get_all_appointments/${ id }`)
export const upcomingPatientApp = (patientId) => API.post('/patient/upcoming/', { patientId });
export const filterPatientAppointments = (query) => API.post('/patient/filterapp', query);

// payments
export const checkout = (id, items) => API.post(`/payments/create-checkout-session/${ id }`, { items });
export const wallet = (appointmentId) => API.post(`/patient/payFromWallet/${ appointmentId }`);

export const getSelectedDoctor = (id) => API.get(`/patient/get_selected_doctor/${ id }`);


const API2 = axios.create({
    baseURL: `http://localhost:${port}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const addDoctor = (doctor) => API2.post('/doctorRegistration', doctor)



export default API;
