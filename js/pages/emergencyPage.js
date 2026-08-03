import { apiRequest } from "../services/api.js";
import { setupSectionToggles } from "../utils/accordion.js";
import { setActiveNav } from "../components/navigation.js";

const appContent = document.getElementById("app-content");

let emergencyContacts = [];

/* =========================================================
   INITIALISE PAGE
========================================================= */

export async function initEmergency() {
    setupSectionToggles();

    const saveBtn =
        document.getElementById("saveEmergencyBtn");

    saveBtn.addEventListener(
        "click",
        saveEmergencyInfo
    );

    await loadEmergencyInfo();
}

/* =========================================================
   READ FORM VALUES
========================================================= */

function getEmergencyInfo() {
    return {
        policePhone:
            document
                .getElementById("policePhone")
                .value
                .trim(),

        ambulancePhone:
            document
                .getElementById("ambulancePhone")
                .value
                .trim(),

        firePhone:
            document
                .getElementById("firePhone")
                .value
                .trim(),

        securityCompany:
            document
                .getElementById("securityCompany")
                .value
                .trim(),

        securityPhone:
            document
                .getElementById("securityPhone")
                .value
                .trim(),

        familyName:
            document
                .getElementById("familyName")
                .value
                .trim(),

        familyPhone:
            document
                .getElementById("familyPhone")
                .value
                .trim(),

        doctorName:
            document
                .getElementById("doctorName")
                .value
                .trim(),

        doctorPhone:
            document
                .getElementById("doctorPhone")
                .value
                .trim()
    };
}

/* =========================================================
   LOAD CONTACTS FROM BACKEND
========================================================= */

async function loadEmergencyInfo() {
    try {
        const result =
            await apiRequest("/emergency");

        emergencyContacts =
            result.contacts ?? [];

        const police =
            findContactByType("POLICE");

        const ambulance =
            findContactByType("AMBULANCE");

        const fire =
            findContactByType("FIRE");

        const security =
            findContactByType("SECURITY");

        const family =
            findContactByType("FAMILY");

        const doctor =
            findContactByType("DOCTOR");

        setInputValue(
            "policePhone",
            police?.phone
        );

        setInputValue(
            "ambulancePhone",
            ambulance?.phone
        );

        setInputValue(
            "firePhone",
            fire?.phone
        );

        setInputValue(
            "securityCompany",
            security?.name
        );

        setInputValue(
            "securityPhone",
            security?.phone
        );

        setInputValue(
            "familyName",
            family?.name
        );

        setInputValue(
            "familyPhone",
            family?.phone
        );

        setInputValue(
            "doctorName",
            doctor?.name
        );

        setInputValue(
            "doctorPhone",
            doctor?.phone
        );

    } catch (error) {
        console.error(
            "Load emergency contacts failed:",
            error.message
        );
    }
}

/* =========================================================
   SAVE CONTACTS TO BACKEND
========================================================= */

async function saveEmergencyInfo() {
    const saveBtn =
        document.getElementById("saveEmergencyBtn");

    try {
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        const emergencyInfo =
            getEmergencyInfo();

        await syncContact({
            type: "POLICE",
            name: "Police",
            phone: emergencyInfo.policePhone,
            notes: null
        });

        await syncContact({
            type: "AMBULANCE",
            name: "Ambulance",
            phone: emergencyInfo.ambulancePhone,
            notes: null
        });

        await syncContact({
            type: "FIRE",
            name: "Fire Department",
            phone: emergencyInfo.firePhone,
            notes: null
        });

        await syncContact({
            type: "SECURITY",

            name:
                emergencyInfo.securityCompany ||
                "Security Company",

            phone:
                emergencyInfo.securityPhone,

            notes: null
        });

        await syncContact({
            type: "FAMILY",

            name:
                emergencyInfo.familyName ||
                "Primary Family Contact",

            phone:
                emergencyInfo.familyPhone,

            notes: null
        });

        await syncContact({
            type: "DOCTOR",

            name:
                emergencyInfo.doctorName ||
                "Family Doctor",

            phone:
                emergencyInfo.doctorPhone,

            notes: null
        });

        await loadEmergencyInfo();

        saveBtn.textContent = "Saved";

        setTimeout(() => {
            saveBtn.textContent =
                "Save Information";
        }, 1200);

    } catch (error) {
        console.error(
            "Save emergency contacts failed:",
            error.message
        );

        saveBtn.textContent = "Save Failed";

        setTimeout(() => {
            saveBtn.textContent =
                "Save Information";
        }, 1500);

    } finally {
        saveBtn.disabled = false;
    }
}

/* =========================================================
   CREATE, UPDATE OR DELETE ONE CONTACT
========================================================= */

async function syncContact({
    type,
    name,
    phone,
    notes
}) {
    const existingContact =
        findContactByType(type);

    /*
        If the phone field is empty and the record already
        exists, remove that contact from the database.
    */
    if (!phone) {
        if (existingContact) {
            await apiRequest(
                `/emergency/${existingContact.id}`,
                {
                    method: "DELETE"
                }
            );
        }

        return;
    }

    const contactData = {
        name,
        phone,
        type,
        notes
    };

    /*
        Existing record:
        update it.
    */
    if (existingContact) {
        await apiRequest(
            `/emergency/${existingContact.id}`,
            {
                method: "PUT",
                body: JSON.stringify(
                    contactData
                )
            }
        );

        return;
    }

    /*
        No existing record:
        create it.
    */
    await apiRequest("/emergency", {
        method: "POST",
        body: JSON.stringify(contactData)
    });
}

/* =========================================================
   HELPERS
========================================================= */

function findContactByType(type) {
    return emergencyContacts.find(
        contact => contact.type === type
    );
}

function setInputValue(elementId, value) {
    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.value = value ?? "";
}

/* =========================================================
   RENDER PAGE
========================================================= */

export async function renderEmergencyInfo() {
    appContent.innerHTML = `

        <div class="page-header">

            <h2>🚑 Emergency Contacts</h2>

            <p>
                Keep important emergency and household
                contacts in one place.
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

    setActiveNav("emergency-btn");

    await initEmergency();
}