const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const {protectDoctor} = require('../middleware/doctorMiddleware')

const {
    createDoctor,
    updateEmail,
    updateHourlyRate,
    updateAffiliation,
    createPatient,
    createAppointment,
    viewAllPatients,
    getDoctors,
    filterStatus,
    upcoming,
    selectPatient,
    getPatients,
    viewHealthRecords,
    searchPatientByName,
    getAllSpecialities,
    viewWallet,
    addNewSlots,
    getMyAppointments,
    followUpDoc,
    addHealthRecord,
    viewEmploymentContract,
    loginDoctor,
    resetPassword,
    sendOTP,
    verifyOTP
} = require('../controllers/doctorController');

router.post('/login', loginDoctor)
router.post('/verify-otp', protectDoctor, verifyOTP)
router.post('/reset-password', protectDoctor, resetPassword)
router.get('/request-otp', protectDoctor, sendOTP)

router.post('/filterapp', filterStatus);

router.post('/upcoming', upcoming)

router.post('/CreateDoctor', createDoctor);
router.post('/CreatePatient', createPatient);
router.post('/CreateAppointment', createAppointment);
router.get('/getdoctors', getDoctors);
router.get('/getPatients', getPatients);
// router.get('/filterapp/:id', filterStatus);
// router.get('/upcoming/:id', upcoming);
router.get('/selectedPatient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await selectPatient(patientId);
        if (!patient) {

            console.error('Patient not found for ID:', patientId);

        }
        // res.render('selectedPatient', { patient });
        res.json(patient);
    } catch (error) {

        console.error('Error retrieving patient:', error);

    }
});
router.get('/viewAllPatients/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const patientsData = await viewAllPatients(doctorId);

        res.json(patientsData);
        // if (patientsData && patientsData.length > 0) {
        //     res.render('viewAllPatients', { patients: patientsData });
        // } else {
        //     res.status(404).json({ message: 'No patients found' });
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving patients' });
    }
});

router.put('/updateEmail/:id', updateEmail);
router.put('/updateHourlyRate/:id', updateHourlyRate);
router.put('/updateAffiliation/:id', updateAffiliation);

router.post('/searchPatientByName/:id', searchPatientByName);
// sync (req, res) => {
//     const doctorId = req.params.id;
//     const firstName = req.body.firstName; 

//     try {
//       
//         const patients = await doctorController.searchPatientByName(doctorId, firstName);
//         res.render('searchByName', { patients: patients || [] });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// });
// router.get('/searchPatientByName/:id', async (req, res) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const patientData = await doctorController.searchPatientByName(doctorId);

//         if (patientsData && patientsData.length > 0) {
//             res.render('searchByName', { patient: patientsData });
//         } else {
//             res.status(404).json({ message: 'No patient found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving patient' });
//     }
// });
router.post('/viewHealthRecords/:id', viewHealthRecords);

router.get('/getAllSpecialities', getAllSpecialities)

router.get('/view_wallet/:id', viewWallet)
router.post('/followUp', followUpDoc);
router.get('/getMyAppointments',getMyAppointments)
router.get('/getEmploymentContract',viewEmploymentContract)
router.patch('/addSlots', addNewSlots);
router.patch('/addHealthRecord', addHealthRecord);

module.exports = router;

