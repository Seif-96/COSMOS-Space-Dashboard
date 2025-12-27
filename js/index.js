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
// show earth Card first
let earthShown = false;
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
      if (button === btn) {
        button.classList.add("bg-blue-500/10", "text-blue-400");
        button.classList.remove("hover:bg-slate-800");
      } else {
        button.classList.remove("bg-blue-500/10", "text-blue-400");
        button.classList.add("text-slate-300", "hover:bg-slate-800");
      }
    });
    // show selected section
    document.getElementById(sectionId).classList.remove("hidden");
    // highlight clicked button
    btn.classList.add("bg-blue-500/10", "text-blue-400");
    btn.classList.remove("hover:bg-slate-800");
    if (window.innerWidth < 1024) {
      sidebar.style.transform = "translate(-100%)";
      btn.classList.add("bg-blue-500/10", "text-blue-400");
    }
    // show earth Card first
    if (sectionId === "planets" && !earthShown) {
      const earthCard = document.querySelector('[data-planet-id="earth"]');
      if (earthCard) earthCard.click();
      earthShown = true;
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
  launchesList = data.results;
  displaylaunchesData();
}
function displaylaunchesData() {
  // master card
  const featuredLaunch = document.querySelector("#featured-launch");
  const launch = launchesList[0];
  // Launch Date
  const formattedDate = new Date(launch.window_start).toDateString();
  const timeUTC = new Date(launch.window_start).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  // Days Until Launch
  const launchDate = new Date(launch.window_start);
  const now = new Date();
  const diffTime = launchDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // master card
  featuredLaunch.innerHTML = `
            <div
            class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
            <div
              class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
              <div class="flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <span
                      class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                      <i class="fas fa-star"></i>
                      Featured Launch
                    </span>
                    <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      ${launch.status.abbrev}
                    </span>
                  </div>
                  <h3 class="text-3xl font-bold mb-3 leading-tight">
                    ${launch.name}
                  </h3>
                  <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-building"></i>
                      <span>${launch.launch_service_provider.name}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i class="fas fa-rocket"></i>
                      <span>${launch.rocket.configuration.full_name}</span>
                    </div>
                  </div>
                  <div
                    class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                    <i class="fas fa-clock text-2xl text-blue-400"></i>
                    <div>
                      <p class="text-2xl font-bold text-blue-400">${diffDays}</p>
                      <p class="text-xs text-slate-400">Days Until Launch</p>
                    </div>
                  </div>
                  <div class="grid xl:grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-calendar"></i>
                        Launch Date
                      </p>
                      <p class="font-semibold">${formattedDate}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-clock"></i>
                        Launch Time
                      </p>
                      <p class="font-semibold">${timeUTC} UTC</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-map-marker-alt"></i>
                        Location
                      </p>
                      <p class="font-semibold text-sm">${launch.pad.location.name}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-globe"></i>
                        Country
                      </p>
                      <p class="font-semibold">${launch.pad.country.name}</p>
                    </div>
                  </div>
                  <p class="text-slate-300 leading-relaxed mb-6">
                    The third integrated flight test of Starship. The
                    prototype for the heavy-lift launch vehicle is currently
                    being built by SpaceX.
                  </p>
                </div>
                <div class="flex flex-col md:flex-row gap-3">
                  <button
                    class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                    <i class="fas fa-info-circle"></i>
                    View Full Details
                  </button>
                  <div class="icons self-end md:self-center">
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="fas fa-bell"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative">
                <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
                  <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                  <div class="flex items-center justify-center h-full min-h-[400px] bg-slate-800">
                    <img class="w-full h-full object-cover" src="${launch.image.image_url}"alt="Astronomy Picture of the Day"/>
                  </div>
                  <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
  `;
  // // All Upcoming Launches
  const launchesGrid = document.querySelector("#launches-grid");
  launchesGrid.innerHTML = "";
  for (let i = 1; i < launchesList.length; i++) {
    const launch = launchesList[i];
    const formattedDate = new Date(launch.window_start).toDateString();
    const timeUTC = new Date(launch.window_start).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    const card = `
    <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
          <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
        ${
          launch.image?.image_url
            ? `<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src="${launch.image.image_url}" alt="${launch.name}"/>`
            : `<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>`
        }
        <div class="absolute top-3 right-3">
          <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
            ${launch.status.abbrev}
          </span>
        </div>
      </div>
      <div class="p-5">
        <div class="mb-3">
          <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            ${launch.name}
          </h4>
          <p class="text-sm text-slate-400 flex items-center gap-2">
            <i class="fas fa-building text-xs"></i>
            ${launch.launch_service_provider.name}
          </p>
        </div>
        <div class="space-y-2 mb-4">
          <div class="flex items-center gap-2 text-sm">
            <i class="fas fa-calendar text-slate-500 w-4"></i>
            <span class="text-slate-300">${formattedDate}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <i class="fas fa-clock text-slate-500 w-4"></i>
            <span class="text-slate-300">${timeUTC} UTC</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <i class="fas fa-rocket text-slate-500 w-4"></i>
            <span class="text-slate-300">${
              launch.rocket.configuration.name
            }</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
            <span class="text-slate-300 line-clamp-1">${
              launch.pad.location.name
            }</span>
          </div>
        </div>
        <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
          <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
            Details
          </button>
          <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;
    launchesGrid.innerHTML += card;
  }
}
// API planets
let planetsList = [];
planetsData();
async function planetsData() {
  let res = await fetch(
    `https://solar-system-opendata-proxy.vercel.app/api/planets`
  );
  let data = await res.json();
  planetsList = data.bodies;
  displayplanetsData();
  displayPlanetsComparison();
}
function displayplanetsData() {
  // select all planet cards
  const planetCards = document.querySelectorAll(".planet-card");
  // big image
  const planetDetailImage = document.getElementById("planet-detail-image");
  const planetDetailName = document.getElementById("planet-detail-name");
  // details
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
  // discovery info
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
      // details with approximation
      planetDescription.textContent = selectedPlanet.description;
      planetDistance.textContent = `${(
        selectedPlanet.semimajorAxis / 1000000
      ).toFixed(0)}M km`;
      planetRadius.textContent = `${Math.round(selectedPlanet.meanRadius)} km`;
      planetMass.textContent = `${selectedPlanet.mass.massValue.toFixed(
        2
      )} × 10^${selectedPlanet.mass.massExponent} kg`;
      planetDensity.textContent = `${selectedPlanet.density.toFixed(2)} g/cm³`;
      planetOrbitalPeriod.textContent = `${selectedPlanet.sideralOrbit.toFixed(
        0
      )} days`;
      planetRotation.textContent = `${selectedPlanet.sideralRotation.toFixed(
        1
      )} hours`;
      planetMoons.textContent = selectedPlanet.moons
        ? selectedPlanet.moons.length
        : 0;
      planetGravity.textContent = `${selectedPlanet.gravity.toFixed(1)} m/s²`;
      // Discovery Info
      planetDiscoverer.textContent =
        selectedPlanet.discoveredBy || "Known since antiquity";
      planetDiscoveryDate.textContent =
        selectedPlanet.discoveryDate || "Ancient";
      planetBodyType.textContent = selectedPlanet.bodyType;
      planetVolume.textContent = `${selectedPlanet.vol.volValue.toFixed(
        2
      )} × 10^${selectedPlanet.vol.volExponent} km³`;
      // planet Facts
      const planetFacts = document.querySelector("#planet-facts");
      planetFacts.innerHTML = `
        <li class="flex items-start">
          <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
          <span class="text-slate-300"><strong>Mass:</strong> ${selectedPlanet.mass.massValue.toFixed(
            2
          )} × 10^${selectedPlanet.mass.massExponent} kg</span>
        </li>
        <li class="flex items-start">
          <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
          <span class="text-slate-300"><strong>Surface gravity:</strong> ${selectedPlanet.gravity.toFixed(
            1
          )} m/s²</span>
        </li>
        <li class="flex items-start">
          <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
          <span class="text-slate-300"><strong>Density:</strong> ${selectedPlanet.density.toFixed(
            2
          )} g/cm³</span>
        </li>
        <li class="flex items-start">
          <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
          <span class="text-slate-300"><strong>Axial tilt:</strong> ${
            selectedPlanet.axialTilt
          }°</span>
        </li>
      `;
      const planetAphelion = document.querySelector("#planet-aphelion");
      const planetEccentricity = document.querySelector("#planet-eccentricity");
      const planetInclination = document.querySelector("#planet-inclination");
      const planetAxialTilt = document.querySelector("#planet-axial-tilt");
      const planetTemp = document.querySelector("#planet-temp");
      const planetEscape = document.querySelector("#planet-escape");
      planetAphelion.textContent = `${selectedPlanet.perihelion.toFixed(
        0
      )}M km`;
      planetEccentricity.textContent = `${selectedPlanet.aphelion.toFixed(
        0
      )}M km`;
      planetInclination.textContent = `${selectedPlanet.inclination.toFixed(
        1
      )}°`;
      planetAxialTilt.textContent = `${selectedPlanet.axialTilt}°`;
      planetTemp.textContent = `${selectedPlanet.avgTemp.toFixed(0)}°C`;
      planetEscape.textContent = `${selectedPlanet.escape.toFixed(1)} km/s`;
    });
  });
}
function displayPlanetsComparison() {
  const tbody = document.getElementById("planet-comparison-tbody");
  tbody.innerHTML = "";
  planetsList.forEach((planet) => {
    const orbitalYears = (planet.sideralOrbit / 365.25).toFixed(2);
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-800/30 transition-colors bg-blue-500/5";
    tr.innerHTML = `
      <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 rounded-full" style="background:${getPlanetColor(
            planet.englishName
          )}"></div>
          <span class="font-semibold whitespace-nowrap">${
            planet.englishName
          }</span>
        </div>
      </td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${(planet.semimajorAxis / 149597870).toFixed(2)}
      </td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${Math.round(planet.meanRadius * 2)}
      </td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${planet.mass?.massValue.toFixed(2) ?? "-"}
      </td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${orbitalYears} years
      </td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${planet.moons ? planet.moons.length : 0}
      </td>
      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
        <span class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200">${
          planet.type
        }</span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
function getPlanetColor(name) {
  const colors = {
    Mercury: "#eab308",
    Venus: "#f97316",
    Earth: "#3b82f6",
    Mars: "#ef4444",
    Jupiter: "#fb923c",
    Saturn: "#facc15",
    Uranus: "#06b6d4",
    Neptune: "#2563eb",
  };
  return colors[name] || "#94a3b8";
}
