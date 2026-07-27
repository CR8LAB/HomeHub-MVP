export function setActiveNav(activeId){

    document.querySelectorAll(".nav-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    document.getElementById(activeId)?.classList.add("active");

}