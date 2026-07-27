import { saveData, loadData, removeData } from "./storage.js";
import { setupSectionToggles } from "./accordion.js";

const STORAGE_KEY = "emergencyInfo";

const emergencyInfo = {

    policePhone: "",

    ambulancePhone: "",

    firePhone: "",

    securityCompany: "",
    securityPhone: "",

    doctorName: "",
    doctorPhone: "",

    familyName: "",
    familyPhone: ""

};

export function initEmergency(){

    setupSectionToggles();

    loadEmergencyInfo();

    document
        .getElementById("saveEmergencyBtn")
        .addEventListener("click", saveEmergencyInfo);

}



function getEmergencyInfo() {

    return {

        policePhone:
            document.getElementById("policePhone").value,

        ambulancePhone:
            document.getElementById("ambulancePhone").value,

        firePhone:
            document.getElementById("firePhone").value,

        securityCompany:
            document.getElementById("securityCompany").value,

        securityPhone:
            document.getElementById("securityPhone").value,

        familyName:
            document.getElementById("familyName").value,

        familyPhone:
            document.getElementById("familyPhone").value,

        doctorName:
            document.getElementById("doctorName").value,

        doctorPhone:
            document.getElementById("doctorPhone").value

    };

}

function saveEmergencyInfo() {

    const emergencyInfo = getEmergencyInfo();

    saveData(STORAGE_KEY, emergencyInfo);

};

function loadEmergencyInfo() {

    const emergency = loadData(STORAGE_KEY);

    if (!emergency) return;

    document.getElementById("policePhone").value =
        emergency.policePhone || "";

    document.getElementById("ambulancePhone").value =
        emergency.ambulancePhone || "";

    document.getElementById("firePhone").value =
        emergency.firePhone || "";

    document.getElementById("securityCompany").value =
        emergency.securityCompany || "";

    document.getElementById("securityPhone").value =
        emergency.securityPhone || "";

    document.getElementById("familyName").value =
        emergency.familyName || "";

    document.getElementById("familyPhone").value =
        emergency.familyPhone || "";

    document.getElementById("doctorName").value =
        emergency.doctorName || "";

    document.getElementById("doctorPhone").value =
        emergency.doctorPhone || "";

};