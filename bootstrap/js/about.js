// Initialize and add the map
function initMap() {

    // Centering the map at Singapore
    const singapore = {lat: 1.372769, lng: 103.802449};
    const map = new google.maps.Map(document.getElementById("map2"), {
      zoom: 10,
      center: singapore,
    });

    // Markers for the outlets\
    const orchard = {lat: 1.3022795792881634, lng: 103.83958825286538};
    const tampines = {lat: 1.3573580117563, lng: 103.94725245922837};
    const westgate = {lat: 1.3348368508847166, lng: 103.74681803855349};
    const woodsland = {lat: 1.4431908978679582, lng: 103.79217404129508};
    const vivo = {lat: 1.254024025903818, lng: 103.82380706594104};

    const marker1 = new google.maps.Marker
    ({
      position: orchard,
      map: map,
    });

    const marker2 = new google.maps.Marker
    ({
      position: tampines,
      map: map,
    });

    const marker3 = new google.maps.Marker
    ({
      position: westgate,
      map: map,
    });

    const marker4 = new google.maps.Marker
    ({
      position: woodsland,
      map: map,
    });

    const marker5 = new google.maps.Marker
    ({
      position: vivo,
      map: map,
    });
  }