export function renderQuickAccess(quickAccess = {}) {
    const container =
        document.getElementById("quick-access-list");

    if (!container) {
        return;
    }

    const contacts = [
        {
            icon: "🚓",
            name: "Police",
            phone: quickAccess.police ?? ""
        },
        {
            icon: "🚑",
            name: "Ambulance",
            phone: quickAccess.ambulance ?? ""
        },
        {
            icon: "🚒",
            name: "Fire",
            phone: quickAccess.fire ?? ""
        },
        {
            icon: "🛡",
            name: "Security",
            phone: quickAccess.security ?? ""
        }
    ];

    container.innerHTML = "";

    contacts.forEach(contact => {
        const item = document.createElement("div");
        item.className = "quick-item";

        if (contact.phone) {
            item.innerHTML = `
                <span>
                    ${contact.icon} ${contact.name}
                </span>

                <button
                    class="call-btn"
                    type="button"
                    aria-label="Call ${contact.name}"
                >
                    <i class="bi bi-telephone-fill"></i>
                </button>
            `;

            item
                .querySelector(".call-btn")
                .addEventListener("click", () => {
                    window.location.href =
                        `tel:${contact.phone}`;
                });
        } else {
            item.innerHTML = `
                <span>
                    ${contact.icon} ${contact.name}
                </span>

                <small>Not set</small>
            `;
        }

        container.appendChild(item);
    });
}