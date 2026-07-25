import { saveData, loadData, removeData } from "./storage.js";

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

export function initHomeInfo() {

    setupSectionToggles();

}




function setupSectionToggles() {

    const headers = document.querySelectorAll(".section-header");

    headers.forEach(header => {

        header.addEventListener("click", () => {

            const currentSection = header.parentElement;

            // Close all other sections
            document.querySelectorAll(".section").forEach(section => {

                if (section !== currentSection) {
                    section.classList.remove("active");

                    const arrow = section.querySelector(".arrow");
                    if (arrow) {
                        arrow.textContent = "▶";
                    }
                }

            });

            // Toggle current section
            currentSection.classList.toggle("active");

            const arrow = header.querySelector(".arrow");

            if (currentSection.classList.contains("active")) {
                arrow.textContent = "▼";
            } else {
                arrow.textContent = "▶";
            }

        });

    });

}




export function saveHomeInfo() {

}

export function loadHomeInfo() {

}


export function getHomeInfo() {
    return homeInfo;
}