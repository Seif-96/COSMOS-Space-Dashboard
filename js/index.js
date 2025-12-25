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
// aside links
const dataSection = document.querySelectorAll("[data-section]");
const appSections = document.querySelectorAll(".app-section");
// aside links active
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
    if (window.innerWidth < 1024) {
      sidebar.style.transform = "translate(-100%)";
    }
  });
});
// API Today in Space
let dataList = [];
todayData();
async function todayData() {
  let res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=JFTaRZ5dTe4tqhyA5pJRAbxGV51aSN7WA8ajdsdq`
  );
  let data = await res.json();
  dataList = data;
  displayTodayData();
}
// Display today's APOD data
function displayTodayData() {
  // Select DOM elements
  const apodDate = document.querySelector("#apod-date");
  const dateWrapper = document.querySelector(".date-input-wrapper");
  const imageContainer = document.querySelector("#apod-image-container");
  const explanation = document.querySelector("#apod-explanation");
  const copyright = document.querySelector("#apod-copyright");
  const dateDetail = document.querySelector("#apod-date-detail");
  const dateInfo = document.querySelector("#apod-date-info");
  const title = document.querySelector("#apod-title");
  const mediaType = document.querySelector("#apod-media-type");
  // main date title
  apodDate.innerHTML = `Astronomy Picture of the Day - ${dataList.date}`;
  // Date input
  dateWrapper.innerHTML = `
    <input type="date" id="apod-date-input" class="custom-date-input" />
    <span class="text-sm">${dataList.date}</span>
  `;
  // Image section
  imageContainer.innerHTML = `
    <img
      id="apod-image"
      class="w-full h-full object-cover"
      src="${dataList.url}"
      alt="Astronomy Picture of the Day"
    />
    <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
      <div class="absolute bottom-6 left-6 right-6">
        <button
          id="openLinkImage"
          class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors">
          <i class="fas fa-expand mr-2"></i>View Full Resolution
        </button>
      </div>
    </div>
  `;
  // Explanation text
  explanation.textContent = dataList.explanation;
  // Copyright
  copyright.innerHTML = `&copy; ${dataList.copyright || "NASA"}`;
  // Date details
  dateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${dataList.date}`;
  dateInfo.textContent = dataList.date;
  // Title
  title.textContent = dataList.title;
  // Media type (image / video)
  mediaType.textContent = dataList.media_type;
  // Open full resolution image
  const openLinkImage = document.querySelector("#openLinkImage");
  openLinkImage.addEventListener("click", () => {
    // Open image
    window.open(dataList.hdurl || dataList.url, "_blank");
  });
}
// API launches
let launchesList = [];
launchesData();
async function launchesData() {
  let res = await fetch(
    `https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`
  );
  let data = await res.json();
  launchesList = data;
  console.log(launchesList);
  displaylaunchesData();
}
// API planets
let planetsList = [];
planetsData();
async function planetsData() {
  let res = await fetch(
    `https://solar-system-opendata-proxy.vercel.app/api/planets`
  );
  let data = await res.json();
  planetsList = data;
  console.log(planetsList);
  displayplanetsData();
}
