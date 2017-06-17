$(document).ready(function(){

	// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDSfAmgD5d0Z1t0HBBEL5ORhddyXOq_4M&callback=initMap" type="text/javascript"></script>

//GLOBAL VARIABLES

	var scheduledEvents = [];
	var searchEventCat = "";
	var searchRadius = 20;
	// var searchZip = "";
	var searchTime = "today";
	var pos = {};
	var returnedZip = "";

	var markerArray = [];


//FUNCTIONS

	//ADD MARKERS TO MAP
		function addMarker(array) {
			var marker = new google.maps.Marker({
				position: array.coords,
				map:map,
			});

			console.log(map);

			// Check content
            // if(array.content){
            //     var infoWindow =  new google.maps.InfoWindow({
            //         content:array.content
            //     });
            //     marker.addListener('mouseover', function(){
            //     infoWindow.open(map, marker);
            //     });
            // }
		}

	//GET SEARCH DATA FROM EVENTFUL API
		//http://api.eventful.com/tools/tutorials/search
		
		function searchEventful() {

			var searchURL = "https://api.eventful.com/json/events/search?q=" + searchEventCat + "&l=" + returnedZip + "&within=" + searchRadius + "&units=miles&t=" + searchTime + "&include=categories&app_key=2QPvTQjtvQ5DsFpL";

			//reset markers
			
      		function setMapOnAll(map) {
        		for (var i = 0; i < markerArray.length; i++) {
        			var thisMarker = markerArray[i]; 
          			thisMarker.marker.setMap(map);
          			var infowindow = new google.maps.InfoWindow({
    					content: thisMarker.contentString	
  					});
  					thisMarker.marker.infowindow = infowindow;
  					thisMarker.marker.addListener('click', function() {
    					this.infowindow.open(map, this);
    					console.log(this);
  					});
        		}
      		}
      		function clearMarkers() {
        		setMapOnAll(null);
        		markerArray = [];
      		}

      		var marker = new google.maps.Marker({
				position:pos,
				map:map
				});

		    // Creates AJAX call meetup data
		    $.ajax({
		      	url: searchURL,
		      	dataType: "jsonp",
		      	method: "GET"
		    }).done(function(response) {
		    	//write response to scheduledEvents array
		    	clearMarkers();
		      	scheduledEvents = response.events.event;
		      	//run loop to write results to page
				for (var i = 0; i < scheduledEvents.length; i++) {
					var thisEvent = scheduledEvents[i];

					markerArray.push({
						marker: new google.maps.Marker({
							position: {
								lat: parseFloat(thisEvent.latitude),
			      				lng: parseFloat(thisEvent.longitude)
							}
							// map: map
							// title: "<p>" + thisEvent.title + "</p><p>" + moment("YYYY-MM-DD HH:mm:ss", thisEvent.start_time).format("HH:mm") + "</p><p>" + thisEvent.venue_address + "</p><p>" + thisEvent.city_name + " " + thisEvent.region_name + " " + thisEvent.postal_code + "</p>"
							}),
						contentString: "<p>" + thisEvent.title + "</p><p>" + moment("YYYY-MM-DD HH:mm:ss", thisEvent.start_time).format("HH:mm") + "</p><p>" + thisEvent.venue_address + "</p><p>" + thisEvent.city_name + " " + thisEvent.region_name + " " + thisEvent.postal_code + "</p>"
					});

					// markerArray.push({
					// 	"coords":  {
					// 		"lat": parseFloat(thisEvent.latitude),
					// 		"lng": parseFloat(thisEvent.longitude)
					// 	},
					// 	"content": "<p>" + thisEvent.title + "</p><p>" + moment("YYYY-MM-DD HH:mm:ss", thisEvent.start_time).format("HH:mm") + "</p><p>" + thisEvent.venue_address + "</p><p>" + thisEvent.city_name + " " + thisEvent.region_name + " " + thisEvent.postal_code + "</p>"
					// });
					console.log(moment("YYYY-MM-DD HH:mm:ss", thisEvent.start_time).format("HH:mm"));
				}

				// console.log(markerArray);
				setMapOnAll(map);


				// for (var i = 0; i < markerArray.length; i++) {
				// 	addMarker(markerArray[i]);
				// }
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
			console.log(navigator.geolocation);
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
			    pos = {
			      lat: position.coords.latitude,
			      lng: position.coords.longitude
			    };
			    console.log(pos);

			    var marker = new google.maps.Marker({
				position:pos,
				map:map
				});

				marker.setIcon("assets/images/blue_pin.png");

			    // infoWindow.setPosition(pos);
			    // infoWindow.setContent('Location found.');
			    // infoWindow.open(map);
			    map.setCenter(pos);
			  	getZip();
			  }, function() {
			    handleLocationError(true, infoWindow, map.getCenter());
			  });
			} 
			else {
			  // Browser doesn't support Geolocation
			  handleLocationError(false, infoWindow, map.getCenter());
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
			    for (var i = 0; i < response.results.length; i++) {
			    	var thisIteration = response.results[i];
			      for (var j = 0; j < thisIteration.address_components.length; j++) {
			      	if (thisIteration.address_components[j].types[0] === "postal_code") {
			      		returnedZip = thisIteration.address_components[j].long_name;
			      	}
			      }
			    }
			    console.log(returnedZip);
		    });
		};
	};


//RUN FUNCTION TO INITIALIZE MAP AND CAPTURE ZIP CODE
	initMap();

//WHEN EVENT TIME IS SELECTED FROM DROPDOWN, SET VARIABLE
	$(".eventWhen").on("click", function() {
		//get data-name and assign to variable
			searchTime = $(this).attr("data-name");
			console.log(searchTime);
			if (searchEventCat !== "") {
				searchEventful();
			}
	});

//WHEN EVENT CAT IS SELECTED FROM DROPDOWN, RUN FUNCTIONS AND DISPLAY RESULTS ON MAP
	$(".eventCat").on("click", function() {
		//get data-name and assign to variable to search api
			searchEventCat = $(this).attr("data-name");
			console.log(searchEventCat);
		//run api data grab function
			searchEventful();
			console.log(scheduledEvents);

	});


});


