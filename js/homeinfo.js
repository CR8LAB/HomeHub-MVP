import { saveData, loadData, removeData } from "./storage.js";
import { setupSectionToggles } from "./accordion.js";

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

}