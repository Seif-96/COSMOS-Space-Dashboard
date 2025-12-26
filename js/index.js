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
// let launchesList = [];
// launchesData();
// async function launchesData() {
//   let res = await fetch(
//     `https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`
//   );
//   let data = await res.json();
//   launchesList = data;
//   console.log(launchesList);
//   // displaylaunchesData();
// }
// API planets
let planetsList = [];
planetsData();
async function planetsData() {
  let res = await fetch(
    `https://solar-system-opendata-proxy.vercel.app/api/planets`
  );
  let data = await res.json();
  planetsList = data.bodies;
  console.log(planetsList);
  displayplanetsData();
}
function displayplanetsData() {
  // part 1
  // select all planet cards
  const planetCards = document.querySelectorAll(".planet-card");
  // big image
  const planetDetailImage = document.getElementById("planet-detail-image");
  // planet name
  const planetDetailName = document.getElementById("planet-detail-name");
  // part 2
  const planetDescription = document.querySelector(
    "#planet-detail-description"
  );
  const planetDistance = document.querySelector("#planet-distance");
  const planetRadius = document.querySelector("#planet-radius");
  const planetMass = document.querySelector("#planet-mass");
  const planetDensity = document.querySelector("#planet-density");
  const planetOrbitalPeriod = document.querySelector("#planet-orbital-period");
  const planetRotation = document.querySelector("#planet-rotation");
  const planetMoons = document.querySelector("#planet-moons");
  const planetGravity = document.querySelector("#planet-gravity");
  // part 3
  const planetDiscoverer = document.querySelector("#planet-discoverer");
  const planetDiscoveryDate = document.querySelector("#planet-discovery-date");
  const planetBodyType = document.querySelector("#planet-body-type");
  const planetVolume = document.querySelector("#planet-volume");
  planetCards.forEach((card) => {
    card.addEventListener("click", () => {
      const planetId = card.dataset.planetId;
      const selectedPlanet = planetsList.find(
        (planet) => planet.englishName.toLowerCase() === planetId.toLowerCase()
      );
      if (!selectedPlanet) return;
      // image & name
      planetDetailImage.src = selectedPlanet.image;
      planetDetailImage.alt = selectedPlanet.englishName;
      planetDetailName.textContent = selectedPlanet.englishName;
      // details
      planetDescription.textContent = selectedPlanet.description;
      planetDistance.textContent = `${selectedPlanet.semimajorAxis} km`;
      planetRadius.textContent = `${selectedPlanet.meanRadius} km`;
      planetMass.textContent = `${selectedPlanet.mass.massValue} × 10^${selectedPlanet.mass.massExponent} kg`;
      planetDensity.textContent = `${selectedPlanet.density} g/cm³`;
      planetOrbitalPeriod.textContent = selectedPlanet.sideralOrbit;
      planetRotation.textContent = `${selectedPlanet.sideralRotation} hours`;
      planetMoons.textContent = selectedPlanet.moons
        ? selectedPlanet.moons.length
        : 0;
      planetGravity.textContent = `${selectedPlanet.gravity} m/s²`;
      // Discovery Info
      planetDiscoverer.textContent = selectedPlanet.discoveredBy;
      planetDiscoveryDate.textContent = selectedPlanet.discoveryDate;
      planetBodyType.textContent = selectedPlanet.bodyType;
      planetVolume.textContent = `${selectedPlanet.vol.volValue} × 10^${selectedPlanet.vol.volExponent} km³`;
    });
  });
}
