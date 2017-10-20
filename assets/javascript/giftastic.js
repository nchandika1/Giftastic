var countries=["thailand", "egypt", "south africa", "india", "jordan", "burma"]; 
				// "india", "netherlands", "canada", "usa", "brazil", "portugal", "greece"];

// Create the initial set of buttons based on the pre-built array
countries.forEach(function(item, index){
	console.log(item, index);
	var btn = $("<button>");
	btn.text(item);
	var dataStr = "data-" + item;
	btn.attr("data-name", item);
	btn.attr("class", "country");
	$('.country-buttons').append(btn);
	console.log($(btn).attr("data-name"));
});

// Click function for the buttons
// Giffy API key: vfcKAiR8GqpGWVmN6lUpQozaOf9j68Gi

function clickCountryButton() {

	// Empty the country images
	$("#country-images").empty();
	var name = $(this).attr("data-name");
	var giphy = $.get("http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=vfcKAiR8GqpGWVmN6lUpQozaOf9j68Gi&limit=10");
	giphy.done(function(response) {
		console.log(response);

		// Get the array of 10 images
		var imageArray = response.data;
		imageArray.forEach(function(item, index) {
			var imgURL1 = imageArray[index].images.fixed_height_small_still.url;
				// var imgURL2 = imageArray[index].images.fixed_height_small.url;
			console.log(imgURL1);
			var countryDiv = $("<div class=\"country-gifs\"></div>");
			var image = $("<img>");
			image.attr("src", imgURL1);
			// image.attr("src", imgURL2);
			image.attr("class", "image-style");
			console.log($(image));
			$(countryDiv).append("<p>Rating: " + imageArray[index].rating.toUpperCase() + "</p>");
			$(countryDiv).append(image);
			$('#country-images').append(countryDiv);
		});
	});
}

function toggleAnimation() {
	// console.log("toggleAnimation");
	// $(this).attr("src", "https://media3.giphy.com/media/2YjYpOl1eBy6I/100_s.gif");
	// console.log(this);
}

$(document).on("click", ".country", clickCountryButton);
$(document).on("click", ".image-style", toggleAnimation);

