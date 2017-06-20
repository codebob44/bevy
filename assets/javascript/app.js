$(document).ready(function(){


  // Initialize Firebase
 var config = {
   apiKey: "AIzaSyBY-a397h7So8zWf1pIoUeLDLDfi3c7_f4",
   authDomain: "bevy-ec8db.firebaseapp.com",
   databaseURL: "https://bevy-ec8db.firebaseio.com",
   projectId: "bevy-ec8db",
   storageBucket: "bevy-ec8db.appspot.com",
   messagingSenderId: "1092872135056"
 };
 firebase.initializeApp(config);
 	 // Create a variable to reference the database.
    var database = firebase.database();
    // Initial Values
    var name = "";
    var email = "";
    var zip = "";
    
    // Capture Button Click
    $("#signIn").on("click", function(event) {
      event.preventDefault();
      console.log(event);
      
      // Grabbed values from text boxes
      name = $("#InputName").val().trim();
      console.log(name);
      email = $("#InputEmail").val().trim();
      console.log(email);
      zip = $("#InputZipcode").val().trim();
      console.log(zip);
     
      // Code for handling the push
      database.ref().push({
        name: name,
        email: email,
        zip: zip,
      });

    });
    
//GLOBAL VARIABLES

	var scheduledEvents = [];
	var searchEventCat = "";
	var searchRadius = 20;
	// var searchZip = "";
	var searchTime = "this+week";
	var pos = {};
	var returnedZip = "";

	var markerArray = [];


//FUNCTIONS

	//GET SEARCH DATA FROM EVENTFUL API
		//http://api.eventful.com/tools/tutorials/search
		
		function searchEventful() {

			var searchURL = "https://api.eventful.com/json/events/search?q=" + searchEventCat + "&l=" + returnedZip + "&within=" + searchRadius + "&units=miles&t=" + searchTime + "&include=categories&app_key=2QPvTQjtvQ5DsFpL";

			//function to place markers
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
    					// console.log(this);
  					});
        		}
      		}

      		//function to clear markers
      		function clearMarkers() {
        		setMapOnAll(null);
        		markerArray = [];
      		}

		    // Creates AJAX call meetup data
		    $.ajax({
		      	url: searchURL,
		      	dataType: "jsonp",
		      	method: "GET"
		    }).done(function(response) {
		    	//clear markers from previous search
		    	clearMarkers();
		    	//write response to scheduledEvents array
		      	scheduledEvents = response.events.event;
		      	//run loop to push select scheduledEvents info into markerArray
				for (var i = 0; i < scheduledEvents.length; i++) {
					var thisEvent = scheduledEvents[i];

					markerArray.push({
						marker: new google.maps.Marker({
							position: {
								lat: parseFloat(thisEvent.latitude),
			      				lng: parseFloat(thisEvent.longitude)
							}
						}),
						contentString: "<p>" + thisEvent.title + "</p><p>" + thisEvent.categories.category[0].name + ", " + thisEvent.start_time + "</p><p>" + thisEvent.venue_name + "</p><p>" + thisEvent.venue_address + "</p><p>" + thisEvent.city_name + " " + thisEvent.region_name + " " + thisEvent.postal_code + "</p><p><a href='" + thisEvent.url + "' target='_blank'>More Info</a></p>"
					});
					// console.log(moment("YYYY-MM-DD HH:mm:ss", thisEvent.start_time).format("HH:mm"));
				}
				//set markers for this search
				setMapOnAll(map);
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

			    map.setCenter(pos);
			  	getZip();
			  }, function() {
			    handleLocationError(true, infoWindow, map.getCenter());
			  });
			} 
			else {
			  // if Browser doesn't support Geolocation
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
			    searchEventful();
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
	});

//WHEN DROPDOWN IS CLICKED
	//https://stackoverflow.com/questions/17061812/display-selected-item-in-bootstrap-button-dropdown-title-place-holder-text
	$(".eventCat").click(function(){
  		var selText = $(this).text();
  		$(this).parents('.dropdown').find('.dropdown-toggle').html(selText+'<span class="caret"></span>');
	});

	$(".eventWhen").click(function(){
  		var selText = $(this).text();
  		$(this).parents('.dropdown').find('.dropdown-toggle').html(selText+'<span class="caret"></span>');
	});

});

