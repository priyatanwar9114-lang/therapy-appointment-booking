const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/appointment", (req, res) => {

console.log("Appointment Received:");
console.log(req.body);

const filePath = path.join(__dirname, "appointments.json");

let appointments = [];

if (fs.existsSync(filePath)) {

    const data = fs.readFileSync(filePath, "utf8");

    if (data.trim() !== "") {
        appointments = JSON.parse(data);
    }

}

const alreadyBooked = appointments.find(appointment =>
    appointment.therapist === req.body.therapist &&
    appointment.appointmentDate === req.body.appointmentDate &&
    appointment.timeSlot === req.body.timeSlot
);

if (alreadyBooked) {

    return res.status(400).json({
        success: false,
        message: "This appointment slot is already booked."
    });

}

appointments.push(req.body);

fs.writeFileSync(
    filePath,
    JSON.stringify(appointments, null, 2)
);

res.json({
    success: true,
    message: "Appointment received successfully"
});

});

app.get("/appointments", (req, res) => {

    const filePath = path.join(__dirname, "appointments.json");

    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    const data = fs.readFileSync(filePath, "utf8");

    if (data.trim() === "") {
        return res.json([]);
    }

    const appointments = JSON.parse(data);

    res.json(appointments);

});

app.delete("/appointment/:id", (req, res) => {

const appointmentId = req.params.id;

const filePath = path.join(__dirname, "appointments.json");

let appointments = [];

if (fs.existsSync(filePath)) {

    const data = fs.readFileSync(filePath, "utf8");

    if (data.trim() !== "") {

        appointments = JSON.parse(data);

    }

}

appointments = appointments.filter(
    appointment => appointment.appointmentId !== appointmentId
);

fs.writeFileSync(
    filePath,
    JSON.stringify(appointments, null, 2)
);

res.json({
    success: true,
    message: "Appointment deleted successfully."
});

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});