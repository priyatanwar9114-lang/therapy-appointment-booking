const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
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

        if (data) {
            appointments = JSON.parse(data);
        }
    }

    appointments.push(req.body);

    fs.writeFileSync(
        filePath,
        JSON.stringify(appointments, null, 2)
    );

    res.json({
        message: "Appointment received successfully"
    });

});

app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});
