 $(document).ready(function(){

 	// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDSfAmgD5d0Z1t0HBBEL5ORhddyXOq_4M&callback=initMap" type="text/javascript"></script>

//GLOBAL VARIABLES

var scheduledEvents = [];
var todaysEvents = [];

//DROP-DOWN FUNCTIONALITY



//GET SEARCH DATA FROM EVENTFUL API
	//http://api.eventful.com/tools/tutorials/search
	
	function searchEventful() {

		var searchUrl = "https://api.eventful.com/json/events/search?q=" + searchEventCat + "&l=" + searchZip + "&within=" + searchRadius + "&units=miles&t=today&include=categories&key=2QPvTQjtvQ5DsFpL";

	  	var searchZip = "";
	  	var searchRadius = 50;
	  	var searchEventCat = "";

	    // Creates AJAX call meetup data
	    $.ajax({
	      url: searchURL,
	      method: "GET"
	    }).done(function(response) {
	      //actions here

	    });

	}

//INITIALIZE MAP WITH USER'S LOCATION MARKED
	//https://developers.google.com/maps/documentation/javascript/geolocation
	
	// Note: This example requires that you consent to location sharing when
	// prompted by your browser. If you see the error "The Geolocation service
	// failed.", it means you probably did not give permission for the browser to
	// locate you.
    var map, infoWindow;

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 41.503218, lng: -81.606771},
		  zoom: 10
		});
		infoWindow = new google.maps.InfoWindow;

		// Try HTML5 geolocation.
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(function(position) {
		    var pos = {
		      lat: position.coords.latitude,
		      lng: position.coords.longitude
		    };

		    infoWindow.setPosition(pos);
		    infoWindow.setContent('Location found.');
		    infoWindow.open(map);
		    map.setCenter(pos);
		  }, function() {
		    handleLocationError(true, infoWindow, map.getCenter());
		  });
		} 
		else {
		  // Browser doesn't support Geolocation
		  handleLocationError(false, infoWindow, map.getCenter());
		}
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
		                      'Error: The Geolocation service failed.' :
		                      'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
	}

//GET ZIP CODE OF CURRENT LOCATION
	//https://developers.google.com/maps/documentation/geocoding/start#ReverseGeocoding  >> Address Lookup
	function getZip() {

		var searchURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&key=AIzaSyDDSfAmgD5d0Z1t0HBBEL5ORhddyXOq_4M";

		$.ajax({
	      url: searchURL,
	      method: "GET"
	    }).done(function(response) {
	      var returnedZip = response.results.address_components[8].long_name;
	    });
	}

//RUN FUNCTIONS TO INITIALIZE MAP AND CAPTURE ZIP CODE
	// initMap();
	// handleLocationError();
	// getZip();

//WHEN EVENT CAT IS SELECTED FROM DROPDOWN, RUN FUNCTIONS AND DISPLAY RESULTS ON MAP
$(".eventCat").on("click", function() {
	//get data-att and assign to variable to search api
	//searchEventful();
	//if response.next_event exists, write to scheduledEvents
	//if response.next_event.time = today, write to todaysEvents
	//for (var i = 0, i < todaysEvents.length, i++) {
		//$("#").html(response[i].events.event.title);
		//$("#").html(response[i].events.event.description);
		//$("#").html(response[i].events.event.start_time);
		//$("#").html(response[i].events.event.venue_address);
		//$("#").html(response[i].events.event.city_name);
		//$("#").html(response[i].events.event.region_name);
		//$("#").html(response[i].events.event.postal_code);

	// }
}

});