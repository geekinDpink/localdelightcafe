//Intitalise map
function initMap() 
{ 
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: {lat: 1.372769, lng: 103.802449},
  });
  directionsRenderer.setMap(map);

  //For event-listener
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  //Listener to drop-down list of nearest Mrt/outlet
  document.getElementById('mrt').addEventListener('change', onChangeHandler);
  document.getElementById('outlet').addEventListener('change', onChangeHandler);
}

//Plot waypoints when change to dropdown list 
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route({
    origin: document.getElementById('mrt').value,
    destination: document.getElementById('outlet').value,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
