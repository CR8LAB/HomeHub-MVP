 import { loadData } from "../services/storage.js";
 
 export function renderQuickAccess() {

    const container = document.getElementById("quick-access-list");

    const emergency = loadData("emergencyInfo") || {};

    const contacts = [
        {
            icon: "🚓",
            name: "Police",
            phone: emergency.policePhone
        },
        {
            icon: "🚑",
            name: "Ambulance",
            phone: emergency.ambulancePhone
        },
        {
            icon: "🚒",
            name: "Fire",
            phone: emergency.firePhone
        },
        {
            icon: "🛡",
            name: "Security",
            phone: emergency.securityPhone
        }
    ];

    container.innerHTML = "";

    contacts.forEach(contact => {

        const item = document.createElement("div");
        item.className = "quick-item";

        if (contact.phone) {

            item.innerHTML = `
                <span>${contact.icon} ${contact.name}</span>
               <button class="call-btn">
    <i class="bi bi-telephone-fill"></i>
</button>
            `;

            item.querySelector(".call-btn").addEventListener("click", () => {
                window.location.href = `tel:${contact.phone}`;
            });

        } else {

            item.innerHTML = `
                <span>${contact.icon} ${contact.name}</span>
                <small>Not set</small>
            `;

        }

        container.appendChild(item);

    });

}