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
		// function addMarker(props) {
		// 	var marker = new google.maps.Marker({
		// 		position:props.coords,
		// 		map:map,
		// 	});
		// }

		function addMarker(array) {
			var marker = new google.maps.Marker({
				position: array.coords,
				map:map,
			});

			console.log(map);

			// Check content
            if(array.content){
                var infoWindow =  new google.maps.InfoWindow({
                    content:array.content
                });
                marker.addListener('click', function(){
                infoWindow.open(map, marker);
                });
            }
		}

	//GET SEARCH DATA FROM EVENTFUL API
		//http://api.eventful.com/tools/tutorials/search
		
		function searchEventful() {

			var searchURL = "https://api.eventful.com/json/events/search?q=" + searchEventCat + "&l=" + returnedZip + "&within=" + searchRadius + "&units=miles&t=" + searchTime + "&include=categories&app_key=2QPvTQjtvQ5DsFpL";

		    // Creates AJAX call meetup data
		    $.ajax({
		      	url: searchURL,
		      	dataType: "jsonp",
		      	method: "GET"
		    }).done(function(response) {
		    	//write response to scheduledEvents array
		      	scheduledEvents = response.events.event;
		      	// console.log("response.events.event", response.events.event);
		      	// console.log("scheduleEvents" , scheduledEvents);
		      	//run loop to write results to page
				for (var i = 0; i < scheduledEvents.length; i++) {
					var thisEvent = scheduledEvents[i];

					markerArray.push({
						"coords":  {
							"lat": parseFloat(thisEvent.latitude),
							"lng": parseFloat(thisEvent.longitude)
						},
						"content": thisEvent.title
					});
					//$("#").html(response.events.event[i].title);
					//$("#").html(response.events.event[i].description);
					//$("#").html(response.events.event[i].start_time);
					//$("#").html(response.events.event[i].venue_address);
					//$("#").html(response.events.event[i].city_name);
					//$("#").html(response.events.event[i].region_name);
					//$("#").html(response.events.event[i].postal_code);
				}

				console.log(markerArray);

				for (var i = 0; i < markerArray.length; i++) {
					addMarker(markerArray[i]);
				}
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
			// var styledMapType = new google.maps.StyledMapType(
			// 	[
			// 	  {
			// 	    "elementType": "geometry",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#1d2c4d"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#8ec3b9"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "elementType": "labels.text.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#1a3646"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "administrative.country",
			// 	    "elementType": "geometry.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#4b6878"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "administrative.land_parcel",
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#64779e"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "administrative.province",
			// 	    "elementType": "geometry.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#4b6878"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "landscape.man_made",
			// 	    "elementType": "geometry.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#334e87"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "landscape.natural",
			// 	    "elementType": "geometry",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#023e58"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "poi",
			// 	    "elementType": "geometry",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#283d6a"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "poi",
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#6f9ba5"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "poi",
			// 	    "elementType": "labels.text.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#1d2c4d"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "poi.park",
			// 	    "elementType": "geometry.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#023e58"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "poi.park",
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#3C7680"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "road",
			// 	    "elementType": "geometry",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#304a7d"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "road",
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#98a5be"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "road",
			// 	    "elementType": "labels.text.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#1d2c4d"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "road.highway",
			// 	    "elementType": "geometry",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#2c6675"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "road.highway",
			// 	    "elementType": "geometry.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#255763"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "road.highway",
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#b0d5ce"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "road.highway",
			// 	    "elementType": "labels.text.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#023e58"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "transit",
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#98a5be"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "transit",
			// 	    "elementType": "labels.text.stroke",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#1d2c4d"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "transit.line",
			// 	    "elementType": "geometry.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#283d6a"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "transit.station",
			// 	    "elementType": "geometry",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#3a4762"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "water",
			// 	    "elementType": "geometry",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#0e1626"
			// 	      }
			// 	    ]
			// 	  },
			// 	  {
			// 	    "featureType": "water",
			// 	    "elementType": "labels.text.fill",
			// 	    "stylers": [
			// 	      {
			// 	        "color": "#4e6d70"
			// 	      }
			// 	    ]
			// 	  }
			// 	],
		 //          {name: 'Styled Map'});

			map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat: 41.503218, lng: -81.606771},
			  zoom: 10
			  // mapTypeControlOptions: {
		   //          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
		   //                  'styled_map']
		   //    }
			});
			//Associate the styled map with the MapTypeId and set it to display.
		        // map.mapTypes.set('styled_map', styledMapType);
		        // map.setMapTypeId('styled_map');
			
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

			    infoWindow.setPosition(pos);
			    infoWindow.setContent('Location found.');
			    infoWindow.open(map);
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
	//addMarker();

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