document.addEventListener("DOMContentLoaded", loadAnalytics);

async function loadAnalytics() {
  try {
    const response = await fetch("/appointments");
    const appointments = await response.json();

    const therapistMap = {};
    const sessionMap = { Online: 0, Offline: 0 };
    const bookingMap = {};
    const appointmentDateMap = {};

    appointments.forEach(a => {
      therapistMap[a.therapist] = (therapistMap[a.therapist] || 0) + 1;
      sessionMap[a.sessionMode] = (sessionMap[a.sessionMode] || 0) + 1;
      bookingMap[a.bookingDate] = (bookingMap[a.bookingDate] || 0) + 1;
      appointmentDateMap[a.appointmentDate] = (appointmentDateMap[a.appointmentDate] || 0) + 1;
    });

    new Chart(document.getElementById("therapistChart"),{
      type:"bar",
      data:{labels:Object.keys(therapistMap),datasets:[{label:"Bookings",data:Object.values(therapistMap)}]},
      options:{responsive:true}
    });

    new Chart(document.getElementById("sessionChart"),{
      type:"pie",
      data:{labels:["Online","Offline"],datasets:[{data:[sessionMap.Online,sessionMap.Offline]}]},
      options:{responsive:true}
    });

    const bookingLabels = Object.keys(bookingMap).sort();
    new Chart(document.getElementById("dailyChart"),{
      type:"bar",
      data:{labels:bookingLabels,datasets:[{label:"Bookings",data:bookingLabels.map(k=>bookingMap[k])}]},
      options:{responsive:true}
    });

    const dateLabels = Object.keys(appointmentDateMap).sort();
    new Chart(document.getElementById("dateChart"),{
      type:"line",
      data:{labels:dateLabels,datasets:[{label:"Appointments",data:dateLabels.map(k=>appointmentDateMap[k]),fill:false,tension:0.3}]},
      options:{responsive:true}
    });

  } catch(err){
    console.error(err);
    alert("Unable to load analytics.");
  }
}