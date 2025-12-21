// sidebar-toggle
const sidebarToggle = document.querySelector("#sidebar-toggle");
const sidebar = document.querySelector("#sidebar");
sidebarToggle.addEventListener("click", () => {
  sidebar.style.transform = "translate(0)";
});
document.addEventListener("click", (e) => {
  if (window.innerWidth < 1024) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.style.transform = "translate(-100%)";
    }
  }
});
// aside
const dataSection = document.querySelectorAll("[data-section]");
const appSections = document.querySelectorAll(".app-section");
dataSection.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sectionId = btn.dataset.section;
    // hide all sections
    appSections.forEach((section) => {
      section.classList.add("hidden");
    });
    // reset all buttons styles
    dataSection.forEach((button) => {
      button.classList.remove(
        "bg-blue-500/10",
        "text-blue-400",
        "hover:bg-slate-800"
      );
      button.classList.add("text-slate-300", "hover:bg-slate-800");
    });
    // show selected section
    document.getElementById(sectionId).classList.remove("hidden");
    // highlight clicked button
    btn.classList.add("bg-blue-500/10", "text-blue-400");
    btn.classList.remove("hover:bg-slate-800");
    sidebar.style.transform = "translate(-100%)";
  });
});
