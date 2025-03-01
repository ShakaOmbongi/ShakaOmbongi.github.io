function initMap() {
    console.log("Initializing Google Maps...");

    //  Store Location (Example: New York City)
    const storeLocation = { lat: 40.7128, lng: -74.0060 };

    // Create Map Instance
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: storeLocation,
        mapId: "YOUR_MAP_ID" // Optional: Use a Google Map ID (replace with your actual Map ID)
    });

    // Add Marker (Fix for deprecated google.maps.Marker)
    const marker = new google.maps.Marker({
        position: storeLocation,
        map: map,
        title: "Our Store Location",
        animation: google.maps.Animation.DROP, // Optional animation effect
    });

    //  Add Info Window for Marker
    const infoWindow = new google.maps.InfoWindow({
        content: "<h4>Douillet Lounge Wear</h4><p>Visit our store in NYC!</p>",
    });

    // Open info window when marker is clicked
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    console.log("Google Map Loaded Successfully.");
}

// Ensure function is globally accessible
window.initMap = initMap;
