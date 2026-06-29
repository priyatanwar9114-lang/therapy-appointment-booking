window.onload = function () {

    let today = new Date();

    let minDate = new Date(today);

    let maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);

    function formatDate(date) {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    let dateInput = document.getElementById("appointmentDate");

    if (dateInput) {
        dateInput.min = formatDate(minDate);
        dateInput.max = formatDate(maxDate);
    }

};

function saveBasicDetails() {

    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("age", document.getElementById("age").value);
    localStorage.setItem("mobile", document.getElementById("mobile").value);
    localStorage.setItem("email", document.getElementById("email").value);
    localStorage.setItem("city", document.getElementById("city").value);

}

async function submitForm() {

    localStorage.setItem("gender", document.getElementById("gender").value);
    localStorage.setItem("appointmentDate", document.getElementById("appointmentDate").value);
    localStorage.setItem("therapist", document.getElementById("therapist").value);
    localStorage.setItem("sessionMode", document.getElementById("sessionMode").value);
    localStorage.setItem("timeSlot", document.getElementById("timeSlot").value);

    let appointmentId = "APT" + Math.floor(Math.random() * 10000);

    localStorage.setItem("appointmentId", appointmentId);

    let bookingDate = new Date().toLocaleDateString();

    localStorage.setItem("bookingDate", bookingDate);

    const appointmentData = {

        name: localStorage.getItem("name"),
        age: localStorage.getItem("age"),
        mobile: localStorage.getItem("mobile"),
        email: localStorage.getItem("email"),
        city: localStorage.getItem("city"),
        gender: document.getElementById("gender").value,
        appointmentDate: document.getElementById("appointmentDate").value,
        therapist: document.getElementById("therapist").value,
        sessionMode: document.getElementById("sessionMode").value,
        timeSlot: document.getElementById("timeSlot").value,
        appointmentId: appointmentId,
        bookingDate: bookingDate

    };

    try {

        const response = await fetch("/appointment", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(appointmentData)

        });

        const result = await response.json();

        if (response.ok) {

            try {

                await emailjs.send(

                    "mindcare_service",

                    "template_opb4n46",

                    {

                        name: appointmentData.name,
                        email: appointmentData.email,
                        appointmentId: appointmentData.appointmentId,
                        therapist: appointmentData.therapist,
                        appointmentDate: appointmentData.appointmentDate,
                        timeSlot: appointmentData.timeSlot,
                        sessionMode: appointmentData.sessionMode

                    }

                );

                console.log("Confirmation Email Sent Successfully.");

            }

            catch (emailError) {

                console.log(emailError);

                console.log("Email Sending Failed.");

            }

            alert("Your appointment has been successfully submitted!");

            window.location.href = "thankyou.html";

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Error connecting to server.");

    }

}

function showMessage() {

    alert("Thank you for contacting us!");

}

function validateForm() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;

    let namePattern = /^[A-Za-z ]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!namePattern.test(name)) {

        alert("Name should contain only letters.");

        return false;

    }

    if (age < 18 || age > 100) {

        alert("Age must be between 18 and 100.");

        return false;

    }

    if (mobile.length != 10 || isNaN(mobile)) {

        alert("Enter a valid 10-digit mobile number.");

        return false;

    }

    if (!emailPattern.test(email)) {

        alert("Enter a valid email address.");

        return false;

    }

    saveBasicDetails();

    return true;

}