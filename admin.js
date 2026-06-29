// Protect Admin Dashboard
if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    alert("Please login first.");
    window.location.href = "login.html";
}

let allAppointments = [];

async function loadAppointments() {

    try {

        const response = await fetch("/appointments");

        allAppointments = await response.json();

        const table = document.getElementById("appointmentTable");

        table.innerHTML = "";

        document.getElementById("totalAppointments").textContent = allAppointments.length;

        let online = 0;
        let offline = 0;

        let therapistCount = {};

        allAppointments.forEach(app => {

            if (app.sessionMode === "Online") {
                online++;
            } else {
                offline++;
            }

            therapistCount[app.therapist] =
                (therapistCount[app.therapist] || 0) + 1;

        });

        document.getElementById("onlineCount").textContent = online;
        document.getElementById("offlineCount").textContent = offline;

        let topTherapist = "-";
        let maxBookings = 0;

        for (let therapist in therapistCount) {

            if (therapistCount[therapist] > maxBookings) {

                maxBookings = therapistCount[therapist];

                topTherapist = therapist;

            }

        }

        document.getElementById("topTherapist").textContent = topTherapist;

        allAppointments.forEach(appointment => {

            table.innerHTML += `
            <tr>

            <td>${appointment.appointmentId}</td>

            <td>${appointment.name}</td>

            <td>${appointment.therapist}</td>

            <td>${appointment.appointmentDate}</td>

            <td>${appointment.timeSlot}</td>

            <td>${appointment.sessionMode}</td>

            <td>${appointment.email}</td>

            <td>${appointment.mobile}</td>

            <td>

            <button onclick="deleteAppointment('${appointment.appointmentId}')">

            🗑 Delete

            </button>

            </td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

        alert("Unable to load appointments.");

    }

}

loadAppointments();

document.getElementById("searchBox").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    const filteredAppointments = allAppointments.filter(appointment =>

        appointment.name.toLowerCase().includes(keyword) ||

        appointment.therapist.toLowerCase().includes(keyword) ||

        appointment.appointmentId.toLowerCase().includes(keyword)

    );

    filteredAppointments.forEach(appointment => {

        table.innerHTML += `
        <tr>

        <td>${appointment.appointmentId}</td>

        <td>${appointment.name}</td>

        <td>${appointment.therapist}</td>

        <td>${appointment.appointmentDate}</td>

        <td>${appointment.timeSlot}</td>

        <td>${appointment.sessionMode}</td>

        <td>${appointment.email}</td>

        <td>${appointment.mobile}</td>

        <td>

        <button onclick="deleteAppointment('${appointment.appointmentId}')">

        🗑 Delete

        </button>

        </td>

        </tr>

        `;

    });

});
// Delete Appointment

async function deleteAppointment(appointmentId) {

    const confirmDelete = confirm("Are you sure you want to delete this appointment?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch("/appointment/" + appointmentId, {
            method: "DELETE"
        });

        const result = await response.json();

        alert(result.message);

        await loadAppointments();

    }

    catch (error) {

        console.log(error);

        alert("Unable to delete appointment.");

    }

}

// Logout

function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        sessionStorage.removeItem("adminLoggedIn");

        window.location.href = "login.html";

    }

}

// Export to Excel

function exportToExcel() {

    if (allAppointments.length === 0) {

        alert("No appointment data available.");

        return;

    }

    const exportData = allAppointments.map(app => ({

        "Appointment ID": app.appointmentId,

        "Name": app.name,

        "Age": app.age,

        "Gender": app.gender,

        "Mobile": app.mobile,

        "Email": app.email,

        "City": app.city,

        "Therapist": app.therapist,

        "Session Mode": app.sessionMode,

        "Appointment Date": app.appointmentDate,

        "Time Slot": app.timeSlot,

        "Booking Date": app.bookingDate

    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

    XLSX.writeFile(workbook, "Therapy_Appointments.xlsx");

}