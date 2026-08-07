import { apiRequest } from "../services/api.js";
import { setupSectionToggles } from "../utils/accordion.js";
import { setActiveNav } from "../components/navigation.js";
import { showToast } from "../components/toast.js";

const appContent = document.getElementById("app-content");

/* =========================================================
   INITIALISE HOME INFO PAGE
========================================================= */

export async function initHomeInfo() {
    setupSectionToggles();

    const saveBtn = document.getElementById("saveHomeInfoBtn");

    saveBtn.addEventListener("click", saveHomeInfo);

    await loadHomeInfo();

    setupPasswordToggle();
}

/* =========================================================
   COLLECT FORM DATA
========================================================= */

function getHomeInfo() {
    return {
        nickname:
            document.getElementById("nickname").value.trim(),

        address:
            document.getElementById("address").value.trim(),

        municipalityAccount:
            document
                .getElementById("municipalityAccount")
                .value
                .trim(),

        electricityMeter:
            document
                .getElementById("electricityMeter")
                .value
                .trim(),

        waterMeter:
            document
                .getElementById("waterMeter")
                .value
                .trim(),

        electricityBox:
            document
                .getElementById("electricityBox")
                .value
                .trim(),

        municipalityPhone:
            document
                .getElementById("municipalityPhone")
                .value
                .trim(),

        electricityFaults:
            document
                .getElementById("electricityFaults")
                .value
                .trim(),

        waterFaults:
            document
                .getElementById("waterFaults")
                .value
                .trim(),

        refuseDay:
            document.getElementById("refuseDay").value,

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

        alarmCompany:
            document
                .getElementById("alarmCompany")
                .value
                .trim(),

        alarmPhone:
            document
                .getElementById("alarmPhone")
                .value
                .trim(),

        gateCode:
            document.getElementById("gateCode").value.trim(),

        wifiName:
            document.getElementById("wifiName").value.trim(),

        wifiPassword:
            document.getElementById("wifiPassword").value
    };
}

/* =========================================================
   SAVE HOME INFO TO BACKEND
========================================================= */

async function saveHomeInfo() {
    const saveBtn = document.getElementById("saveHomeInfoBtn");

    try {
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        const homeInfo = getHomeInfo();

        const result = await apiRequest("/home-info", {
            method: "PUT",
            body: JSON.stringify(homeInfo)
        });

        await loadHomeInfo();

        saveBtn.textContent = "Saved";

       showToast(
    result.message || "Home information saved.",
    "success"
);

        setTimeout(() => {
            saveBtn.textContent = "Save Information";
        }, 1200);

    } catch (error) {
        console.error(
            "Save home information failed:",
            error.message
        );

showToast(
    error.message || "Unable to save home information.",
    "error"
);

        saveBtn.textContent = "Save Failed";

        setTimeout(() => {
            saveBtn.textContent = "Save Information";
        }, 1500);

    } finally {
        saveBtn.disabled = false;
    }
}

/* =========================================================
   LOAD HOME INFO FROM BACKEND
========================================================= */

async function loadHomeInfo() {
    try {
        const result = await apiRequest("/home-info");
        const homeInfo = result.homeInfo;

        if (!homeInfo) {
            return;
        }

        setInputValue("nickname", homeInfo.nickname);
        setInputValue("address", homeInfo.address);

        setInputValue(
            "municipalityAccount",
            homeInfo.municipalityAccount
        );

        setInputValue(
            "electricityMeter",
            homeInfo.electricityMeter
        );

        setInputValue(
            "waterMeter",
            homeInfo.waterMeter
        );

        setInputValue(
            "electricityBox",
            homeInfo.electricityBox
        );

        setInputValue(
            "municipalityPhone",
            homeInfo.municipalityPhone
        );

        setInputValue(
            "electricityFaults",
            homeInfo.electricityFaults
        );

        setInputValue(
            "waterFaults",
            homeInfo.waterFaults
        );

        setInputValue(
            "refuseDay",
            homeInfo.refuseDay
        );

        setInputValue(
            "securityCompany",
            homeInfo.securityCompany
        );

        setInputValue(
            "securityPhone",
            homeInfo.securityPhone
        );

        setInputValue(
            "alarmCompany",
            homeInfo.alarmCompany
        );

        setInputValue(
            "alarmPhone",
            homeInfo.alarmPhone
        );

        setInputValue(
            "gateCode",
            homeInfo.gateCode
        );

        setInputValue(
            "wifiName",
            homeInfo.wifiName
        );

        setInputValue(
            "wifiPassword",
            homeInfo.wifiPassword
        );

    } catch (error) {
        console.error(
            "Load home information failed:",
            error.message
        );

showToast(
    error.message || "Unable to load home information.",
    "error"
);

    }
}

/* =========================================================
   INPUT HELPER
========================================================= */

function setInputValue(elementId, value) {
    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.value = value ?? "";
}

/* =========================================================
   PASSWORD VISIBILITY TOGGLE
========================================================= */

function setupPasswordToggle() {
    const password =
        document.getElementById("wifiPassword");

    const button =
        document.getElementById("toggleWifiPassword");

    if (!password || !button) {
        return;
    }

    button.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            button.textContent = "🙈";
        } else {
            password.type = "password";
            button.textContent = "👁";
        }
    });
}

/* =========================================================
   RENDER HOME INFO PAGE
========================================================= */

export async function renderHomeInfoPage() {
    appContent.innerHTML = `
        <div class="page-header">
            <h2>🏠 Home Information</h2>
            <p>
                Store important information about your property.
            </p>
        </div>

        <!-- ================= PROPERTY ================= -->

        <div class="section active">

            <button class="section-header">
                <span class="arrow">▼</span>
                Property
            </button>

            <div class="section-content">

                <div class="form-group">
                    <label for="nickname">
                        Household Nickname
                    </label>

                    <input
                        type="text"
                        id="nickname"
                        placeholder="e.g. Home"
                    >
                </div>

                <div class="form-group">
                    <label for="address">
                        Street Address
                    </label>

                    <input
                        type="text"
                        id="address"
                        placeholder="Street Address"
                    >
                </div>

                <div class="form-group">
                    <label for="municipalityAccount">
                        Municipality Account Number
                    </label>

                    <input
                        type="text"
                        id="municipalityAccount"
                        placeholder="Account Number"
                    >
                </div>

            </div>

        </div>

        <!-- ================= UTILITIES ================= -->

        <div class="section">

            <button class="section-header">
                <span class="arrow">▶</span>
                Utilities
            </button>

            <div class="section-content">

                <div class="form-group">
                    <label for="electricityMeter">
                        Electricity Meter Number
                    </label>

                    <input
                        type="text"
                        id="electricityMeter"
                    >
                </div>

                <div class="form-group">
                    <label for="waterMeter">
                        Water Meter Number
                    </label>

                    <input
                        type="text"
                        id="waterMeter"
                    >
                </div>

                <div class="form-group">
                    <label for="electricityBox">
                        Electricity Box Number
                    </label>

                    <input
                        type="text"
                        id="electricityBox"
                    >
                </div>

            </div>

        </div>

        <!-- ================= MUNICIPAL SERVICES ================= -->

        <div class="section">

            <button class="section-header">
                <span class="arrow">▶</span>
                Municipal Services
            </button>

            <div class="section-content">

                <div class="form-group">
                    <label for="municipalityPhone">
                        Municipality Contact Number
                    </label>

                    <input
                        type="text"
                        id="municipalityPhone"
                    >
                </div>

                <div class="form-group">
                    <label for="electricityFaults">
                        Electricity Fault Number
                    </label>

                    <input
                        type="text"
                        id="electricityFaults"
                    >
                </div>

                <div class="form-group">
                    <label for="waterFaults">
                        Water Fault Number
                    </label>

                    <input
                        type="text"
                        id="waterFaults"
                    >
                </div>

                <div class="form-group">
                    <label for="refuseDay">
                        Refuse Collection Day
                    </label>

                    <select id="refuseDay">
                        <option value="">
                            Select Day
                        </option>

                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                    </select>
                </div>

            </div>

        </div>

        <!-- ================= SECURITY ================= -->

        <div class="section">

            <button class="section-header">
                <span class="arrow">▶</span>
                Security
            </button>

            <div class="section-content">

                <div class="form-group">
                    <label for="securityCompany">
                        Security Company
                    </label>

                    <input
                        type="text"
                        id="securityCompany"
                    >
                </div>

                <div class="form-group">
                    <label for="securityPhone">
                        Security Contact Number
                    </label>

                    <input
                        type="text"
                        id="securityPhone"
                    >
                </div>

                <div class="form-group">
                    <label for="alarmCompany">
                        Alarm Company
                    </label>

                    <input
                        type="text"
                        id="alarmCompany"
                    >
                </div>

                <div class="form-group">
                    <label for="alarmPhone">
                        Alarm Contact Number
                    </label>

                    <input
                        type="text"
                        id="alarmPhone"
                    >
                </div>

            </div>

        </div>

        <!-- ================= ACCESS ================= -->

        <div class="section">

            <button class="section-header">
                <span class="arrow">▶</span>
                Access
            </button>

            <div class="section-content">

                <div class="form-group">
                    <label for="gateCode">
                        Gate Code
                    </label>

                    <input
                        type="text"
                        id="gateCode"
                    >
                </div>

                <div class="form-group">
                    <label for="wifiName">
                        Wi-Fi Name
                    </label>

                    <input
                        type="text"
                        id="wifiName"
                    >
                </div>

                <div class="form-group">

                    <label for="wifiPassword">
                        Wi-Fi Password
                    </label>

                    <div class="password-group">

                        <input
                            type="password"
                            id="wifiPassword"
                        >

                        <button
                            type="button"
                            id="toggleWifiPassword"
                        >
                            👁
                        </button>

                    </div>

                </div>

            </div>

        </div>

        <!-- ================= ACTION BUTTON ================= -->

        <div class="homeinfo-actions">

            <button id="saveHomeInfoBtn">
                Save Information
            </button>

        </div>
    `;

    setActiveNav("homeinfo-btn");

    await initHomeInfo();
}