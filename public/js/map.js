mapboxgl.accessToken =
  "pk.eyJ1IjoieWFzc2luZWUiLCJhIjoiY2tvMjdiZmVpMGU3ejJ2czI2dGM1ZTVzMCJ9.vjRkbpFZZ9jwJ14H1lfDIw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 5.3,
  center: [9.5607653, 33.7931605],
});

// Fetch store from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();
  const stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1],
        ],
      },
      properties: {
        storeId: store.storeId,
        icon: "park",
      },
    };
  });
  loadMap(stores);
}
// Load map with stores
function loadMap(stores) {
  map.on("load", function () {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

getStores();
