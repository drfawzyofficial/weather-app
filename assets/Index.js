var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.777829, lng: 106.68163 },
        zoom: 18,
        mapTypeId: "roadmap",
    });
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                infoWindow.open(map);
                new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "Current Position",
                });
            },
            function () {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // handleLocationError
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
        new google.maps.Marker({
            position: pos,
            map,
            title: "Something went wrong",
        });
    }
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
        });
        map.fitBounds(bounds);
    });
}

$("#getWeather").click(() => {
$("#loading").css("display", "flex");
  setTimeout(() => {
    fetch('/getWeather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat: map.getCenter().lat(), lng: map.getCenter().lng() }),
    })
        .then(response => response.json())
        .then(data => {
           $("#loading").css("display", "none");
           if(data.statusCode != 200) {
               console.log(data)
            console.log(data.msgUser)
           } else {
               $(".modal-body").html(`
                <ul>
                <li>Place Name: Zeko Meok</li>
                <li>Lat: ${ map.getCenter().lat() }</li>
                <li>Lng: ${ map.getCenter().lng() }</li>
                <li>waterTemperature(meto): ${ data.result.hours[0].waterTemperature.meto } </li>
                <li>waterTemperature(noaa): ${ data.result.hours[0].waterTemperature.noaa } </li>
                <li>waterTemperature(sg): ${ data.result.hours[0].waterTemperature.sg } </li>
                </ul>
               `)
                $('#myModal').modal('show');
                
           }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
  }, 3000)
})
