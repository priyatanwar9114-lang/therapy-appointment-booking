window.onload = function () {

let today = new Date();

let minDate = today.toISOString().split("T")[0];

let maxDate = new Date(today);
maxDate.setMonth(maxDate.getMonth() + 3);

maxDate = maxDate.toISOString().split("T")[0];

let dateInput = document.getElementById("appointmentDate");

if (dateInput) {
    dateInput.min = minDate;
    dateInput.max = maxDate;
}

};

function saveBasicDetails() {

localStorage.setItem(
    "name",
    document.getElementById("name").value
);

localStorage.setItem(
    "age",
    document.getElementById("age").value
);

localStorage.setItem(
    "mobile",
    document.getElementById("mobile").value
);

localStorage.setItem(
    "email",
    document.getElementById("email").value
);

localStorage.setItem(
    "city",
    document.getElementById("city").value
);

}

function submitForm() {

localStorage.setItem(
    "gender",
    document.getElementById("gender").value
);

localStorage.setItem(
    "appointmentDate",
    document.getElementById("appointmentDate").value
);

localStorage.setItem(
    "therapist",
    document.getElementById("therapist").value
);

localStorage.setItem(
    "sessionMode",
    document.getElementById("sessionMode").value
);

localStorage.setItem(
    "timeSlot",
    document.getElementById("timeSlot").value
);

let appointmentId = "APT" + Math.floor(Math.random() * 10000);

localStorage.setItem(
    "appointmentId",
    appointmentId
);

let bookingDate = new Date().toLocaleDateString();

localStorage.setItem(
    "bookingDate",
    bookingDate
);

alert("Your appointment has been successfully submitted!");

window.location.href = "thankyou.html";

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