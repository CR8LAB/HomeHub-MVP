import { saveData, loadData, removeData } from "../services/storage.js";
import { setupSectionToggles } from "../utils/accordion.js";
import { setActiveNav } from "../components/navigation.js";

const appContent = document.getElementById("app-content");

const STORAGE_KEY ="homeInfo";

const homeInfo = {
    nickname: "",
    address: "",

    municipalityAccount: "",

    electricityMeter: "",
    waterMeter: "",
    electricityBox: "",

    municipalityPhone: "",
    electricityFaults: "",
    waterFaults: "",
    refuseDay: "",

    securityCompany: "",
    alarmCompany: "",
    alarmPhone: "",

    gateCode: "",
    wifiName: "",
    wifiPassword: ""
};


/*/////////////////////////////////////////////////////////////*/

export function initHomeInfo() {

    setupSectionToggles();

const saveBtn = document.getElementById("saveHomeInfoBtn");

saveBtn.addEventListener("click", saveHomeInfo);

  loadHomeInfo();

    document
        .getElementById("saveHomeInfoBtn")
        .addEventListener("click", saveHomeInfo);




    setupPasswordToggle();
}

/*///////////////////////////////////////////////////////////*/




//create the object//////////////////////////////////////////////////////////

function getHomeInfo() {

    return {

        nickname: document.getElementById("nickname").value,

        address: document.getElementById("address").value,

        municipalityAccount: document.getElementById("municipalityAccount").value,

        electricityMeter: document.getElementById("electricityMeter").value,

        waterMeter: document.getElementById("waterMeter").value,

        electricityBox: document.getElementById("electricityBox").value,

        municipalityPhone: document.getElementById("municipalityPhone").value,

        electricityFaults: document.getElementById("electricityFaults").value,

        waterFaults: document.getElementById("waterFaults").value,

        refuseDay: document.getElementById("refuseDay").value,

        securityCompany: document.getElementById("securityCompany").value,

        securityPhone: document.getElementById("securityPhone").value,

        alarmCompany: document.getElementById("alarmCompany").value,

        alarmPhone: document.getElementById("alarmPhone").value,

        gateCode: document.getElementById("gateCode").value,

        wifiName: document.getElementById("wifiName").value,

        wifiPassword: document.getElementById("wifiPassword").value

    };

};



// save info /////////////////////////////////////////////////////////////
function saveHomeInfo() {

    const homeInfo = getHomeInfo();

    saveData(STORAGE_KEY, homeInfo);

}

function loadHomeInfo() {

    const homeInfo = loadData(STORAGE_KEY);

    if (!homeInfo) return;

    document.getElementById("nickname").value = homeInfo.nickname || "";

    document.getElementById("address").value = homeInfo.address || "";

    document.getElementById("municipalityAccount").value = homeInfo.municipalityAccount || "";

    document.getElementById("electricityMeter").value = homeInfo.electricityMeter || "";

    document.getElementById("waterMeter").value = homeInfo.waterMeter || "";

    document.getElementById("electricityBox").value = homeInfo.electricityBox || "";

    document.getElementById("municipalityPhone").value = homeInfo.municipalityPhone || "";

    document.getElementById("electricityFaults").value = homeInfo.electricityFaults || "";

    document.getElementById("waterFaults").value = homeInfo.waterFaults || "";

    document.getElementById("refuseDay").value = homeInfo.refuseDay || "";

    document.getElementById("securityCompany").value = homeInfo.securityCompany || "";

    document.getElementById("securityPhone").value = homeInfo.securityPhone || "";

    document.getElementById("alarmCompany").value = homeInfo.alarmCompany || "";

    document.getElementById("alarmPhone").value = homeInfo.alarmPhone || "";

    document.getElementById("gateCode").value = homeInfo.gateCode || "";

    document.getElementById("wifiName").value = homeInfo.wifiName || "";

    document.getElementById("wifiPassword").value = homeInfo.wifiPassword || "";

};



function setupPasswordToggle() {

    const password = document.getElementById("wifiPassword");

    const button = document.getElementById("toggleWifiPassword");

    button.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";
            button.textContent = "🙈";

        } else {

            password.type = "password";
            button.textContent = "👁";

        }

    });

};


export function renderHomeInfoPage() {

    appContent.innerHTML = `

    <div class="page-header">
        <h2>🏠 Home Information</h2>
        <p>Store important information about your property.</p>
    </div>

    <!-- ================= PROPERTY ================= -->

    <div class="section active">

        <button class="section-header">
            <span class="arrow">▼</span>
            Property
        </button>

        <div class="section-content">

            <div class="form-group">
                <label for="nickname">Household Nickname</label>
                <input type="text" id="nickname" placeholder="e.g. Home">
            </div>

            <div class="form-group">
                <label for="address">Street Address</label>
                <input type="text" id="address" placeholder="Street Address">
            </div>

            <div class="form-group">
                <label for="municipalityAccount">Municipality Account Number</label>
                <input type="text" id="municipalityAccount" placeholder="Account Number">
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
                <label for="electricityMeter">Electricity Meter Number</label>
                <input type="text" id="electricityMeter">
            </div>

            <div class="form-group">
                <label for="waterMeter">Water Meter Number</label>
                <input type="text" id="waterMeter">
            </div>

            <div class="form-group">
                <label for="electricityBox">Electricity Box Number</label>
                <input type="text" id="electricityBox">
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
                <label for="municipalityPhone">Municipality Contact Number</label>
                <input type="text" id="municipalityPhone">
            </div>

            <div class="form-group">
                <label for="electricityFaults">Electricity Fault Number</label>
                <input type="text" id="electricityFaults">
            </div>

            <div class="form-group">
                <label for="waterFaults">Water Fault Number</label>
                <input type="text" id="waterFaults">
            </div>

            <div class="form-group">
                <label for="refuseDay">Refuse Collection Day</label>

                <select id="refuseDay">

                    <option value="">Select Day</option>

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
                <label for="securityCompany">Security Company</label>
                <input type="text" id="securityCompany">
            </div>

            <div class="form-group">
                <label for="securityPhone">Security Contact Number</label>
                <input type="text" id="securityPhone">
            </div>

            <div class="form-group">
                <label for="alarmCompany">Alarm Company</label>
                <input type="text" id="alarmCompany">
            </div>

            <div class="form-group">
                <label for="alarmPhone">Alarm Contact Number</label>
                <input type="text" id="alarmPhone">
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
                <label for="gateCode">Gate Code</label>
                <input type="text" id="gateCode">
            </div>

            <div class="form-group">
                <label for="wifiName">Wi-Fi Name</label>
                <input type="text" id="wifiName">
            </div>

            <div class="form-group">

                <label for="wifiPassword">Wi-Fi Password</label>

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

    <!-- ================= ACTION BUTTONS ================= -->

    <div class="homeinfo-actions">

        <button id="saveHomeInfoBtn">
            Save Information
        </button>

        

    </div>

    `;

    initHomeInfo();
setActiveNav("homeinfo-btn");
}
