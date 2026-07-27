


export function setupSectionToggles() {

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