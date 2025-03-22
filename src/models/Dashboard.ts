import mongoose, { Document, Schema } from 'mongoose';

interface IAppointment extends Document {
    name: string;
    date: Date;
    time: string;
    phone: string;
    email: string;
    doctorName: string;
    specialization: string;
}

const appointmentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    doctorName: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // This will add createdAt and updatedAt timestamps
});

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
