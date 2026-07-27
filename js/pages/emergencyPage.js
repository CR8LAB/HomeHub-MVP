import { saveData, loadData, removeData } from "../services/storage.js";
import { setupSectionToggles } from "../utils/accordion.js";
import { setActiveNav } from "../components/navigation.js";

const appContent = document.getElementById("app-content");

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

export function renderEmergencyInfo() {

    appContent.innerHTML = `

    <div class="page-header">

        <h2>🚑 Emergency Contacts</h2>

        <p>
            Keep important emergency and household contacts in one place.
        </p>

    </div>

    <!-- ================= EMERGENCY SERVICES ================= -->

    <div class="section">

        <h3>🚨 Emergency Services</h3>

        <div class="form-group">

            <label for="policePhone">
                Police Number
            </label>

            <input
                type="tel"
                id="policePhone"
                placeholder="e.g. 10111"
            >

        </div>

        <div class="form-group">

            <label for="ambulancePhone">
                Ambulance Number
            </label>

            <input
                type="tel"
                id="ambulancePhone"
                placeholder="e.g. 10177"
            >

        </div>

        <div class="form-group">

            <label for="firePhone">
                Fire Department Number
            </label>

            <input
                type="tel"
                id="firePhone"
                placeholder="Fire Department Number"
            >

        </div>

    </div>

    <!-- ================= SECURITY ================= -->

    <div class="section">

        <h3>🛡 Security</h3>

        <div class="form-group">

            <label for="securityCompany">
                Security Company
            </label>

            <input
                type="text"
                id="securityCompany"
                placeholder="Company Name"
            >

        </div>

        <div class="form-group">

            <label for="securityPhone">
                Security Contact Number
            </label>

            <input
                type="tel"
                id="securityPhone"
                placeholder="Security Contact Number"
            >

        </div>

    </div>

    <!-- ================= FAMILY & MEDICAL ================= -->

    <div class="section">

        <h3>👨‍👩‍👧 Family & Medical</h3>

        <div class="form-group">

            <label for="familyName">
                Primary Family Contact
            </label>

            <input
                type="text"
                id="familyName"
                placeholder="Full Name"
            >

        </div>

        <div class="form-group">

            <label for="familyPhone">
                Primary Contact Number
            </label>

            <input
                type="tel"
                id="familyPhone"
                placeholder="Phone Number"
            >

        </div>

        <div class="form-group">

            <label for="doctorName">
                Family Doctor
            </label>

            <input
                type="text"
                id="doctorName"
                placeholder="Doctor Name"
            >

        </div>

        <div class="form-group">

            <label for="doctorPhone">
                Doctor Contact Number
            </label>

            <input
                type="tel"
                id="doctorPhone"
                placeholder="Doctor Contact Number"
            >

        </div>

    </div>

    <!-- ================= SAVE BUTTON ================= -->

    <div class="homeinfo-actions">

        <button id="saveEmergencyBtn">

            Save Information

        </button>

    </div>

    `;

    initEmergency();
setActiveNav("emergency-btn");
}