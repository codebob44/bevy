 $(document).ready(function(){

 	// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDSfAmgD5d0Z1t0HBBEL5ORhddyXOq_4M&callback=initMap" type="text/javascript"></script>

//GET SEARCH DATA FROM MEETUP.COM
	function searchMeetup() {

		//Note: radius must not exceed 100
	  	var searchUrl = "https://api.meetup.com/find/groups?zip=" + searchZip + "&radius=" + searchRadius + "&category=" + searchEventCat + "&order=members&key=514667704c6c522c5d204238772c6520&sign=true";
	  
	  	var searchZip = "";
	  	var searchRadius = 50;
	  	var searchEventCat = "";

	  	searchZip = $("#").val().trim();

	  	var eventCat = {
		  	1: "Arts & Culture",
			2: "Career & Business",
			3: "Cars & Motorcycles",
			4: "Community & Environment",
			5: "Dancing",
			6: "Education & Learning",
			7: "--",
			8: "Fashion & Beauty",
			9: "Fitness",
			10: "Food & Drink",
			11: "Games",
			12: "LGBT",
			13: "Movements & Politics",
			14: "Health & Wellbeing",
			15: "Hobbies & Crafts",
			16: "Language & Ethnic Identity",
			17: "Lifestyle",
			18: "Book Clubs",
			19: "--",
			20: "Movies & Film",
			21: "Music",
			22: "New Age & Spirituality",
			23: "Outdoors & Adventure",
			24: "Paranormal",
			25: "Parents & Family",
			26: "Pets & Animals",
			27: "Photography",
			28: "Religion & Beliefs",
			29: "Sci-Fi & Fantasy",
			30: "Singles",
			31: "Socializing",
			32: "Sports & Recreation",
			33: "Support",
			34: "Tech",
			35: "--",
			36: "Writing"
	  	}

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


});