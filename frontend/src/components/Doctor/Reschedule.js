import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { doctorRescheduleApp } from "../../services/api";

const Reschedule = ({ appointment, onReload, onError }) => {
    const [date, setDate] = useState(appointment.date.substring(0, 10));
    // const [time, setTime] = useState((parseInt(appointment.date.substring(11, 16)) + 2).toString());

    // const appointmentDate = new Date(appointment.date);
    // appointmentDate.setHours(appointmentDate.getHours() + 2);

    // const formattedTime = appointmentDate.toISOString().substring(11, 16);

    // const [time, setTime] = useState(formattedTime);

    const appointmentDate = new Date(appointment.date);
const localTime = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
const [time, setTime] = useState(localTime);




    const handleReschedule = (e) => {
        e.preventDefault();
        doctorRescheduleApp({ appointmentId: appointment._id, newDate: date, newTime: time })
          .then((result) => {
            onReload(); // Call the callback function from the parent to update the state
          })
          .catch((err) => {
            onError(err.message); // Call the error callback function from the parent
        });
    };

    return (
        <div style={{ "margin": "10px 0" }}>
            <TextField
                id={`date-${appointment._id}`}
                name={`date-${appointment._id}`}
                label='date'
                type='date'
                size="small"
                value={ date }
                onChange={ (e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                id={`time-${appointment._id}`}
                name={`time-${appointment._id}`}
                label='time'
                type='time'
                size="small"
                value={ time }
                onChange={ (e) => setTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <Button
                disabled={ !date || !time }
                variant='outlined'
                size='large'
                onClick={ handleReschedule }
            >
                Schedule Follow-up
            </Button>
        </div>
    );
};

export default Reschedule;