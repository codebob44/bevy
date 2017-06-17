$(document).ready(function() {     
	var names = ["Conferences", "Comedy", "Education", "Film", "Food", "Fundraisers", "Galleries", 
	"Health", "Holiday", "Literary", "Museums", "Neighborhood", "Networking", "On Campus", "Organizations", 
	"Outdoors", "Pets", "Politics", "Sales", "Science", "Spirituality", "Technology", "Other"];

	var pictures = ["images/arts.png", "images/dancing.png", "images/education.png", "images/film.png", "images/fitness.png", "images/food.png"];

	// Buttons for Event Type Names
	for (var i = 0; i < names.length; i++) {
		var eventTypeBtn = $("<button>");
		eventTypeBtn.addClass("btn btn-primary");
		eventTypeBtn.attr("data-name", names[i]);
		eventTypeBtn.text(names[i]);
		$("#buttons").append(eventTypeBtn);
	}

	// Images for Thumbnails
	for (var i = 0; i < pictures.length; i++) {
      	var images = $("<div></div>");
      	images.addClass("thumbnail");
      	$("<img>").append(images);
      	images.attr("src", pictures[i]);
      	$("#thumbnails").append(images);
    }
})