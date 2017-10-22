$(document).ready(function() {

	// Array to store the initial set of topics.  More buttons get added dynamically
	// via the form submission
	var countries=["usa", "thailand", "egypt", "south africa", "india", "austria", "burma", "scotland", "kenya", "greece", "canada", "chile", "australia"]; 

	function createTopicButtons() {

		//  Let us clear the buttons first before replacing them with new set
		$('.country-buttons').empty();

		// Create buttons from the countries array
		countries.forEach(function(item, index) {
			// Create buttons with class=country and data-name attribute
			var btn = $("<button>");
			btn.text(item);
			btn.attr("class", "country-btn");
			btn.attr("data-name", item);
			$('.country-buttons').append(btn);
		});
	}

	// Click function for the buttons
	// Giffy API key: vfcKAiR8GqpGWVmN6lUpQozaOf9j68Gi
	function clickCountryButton() {

		// Let us empty the images before displaying the images of the current topic
		$("#country-images").empty();
		
		// Retrieve the data attribute to get the name of the topic from the button
		var name = $(this).attr("data-name");

		// AJAX call to get 10 GIPHY images for the chosen topic.  10 is hard coded for now
		var giphy = $.get("http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=vfcKAiR8GqpGWVmN6lUpQozaOf9j68Gi&limit=10");
		giphy.done(function(response) {

			// Get the array of GIPHY images from the JSON
			var imageArray = response.data;
			imageArray.forEach(function(item, index) {

				// Each image is contained in its own div element
				var countryDiv = $("<div class=\"country-gifs\"></div>");
				var image = $("<img>");

				//  Create image tag here and the corresponding data attributes to help toggle images
				image.attr("src", imageArray[index].images.fixed_height_still.url);
				image.attr("class", "image-style");
				image.attr("data-still", imageArray[index].images.fixed_height_still.url);
				image.attr("data-animate", imageArray[index].images.fixed_height.url);
				image.attr("data-state", "still");
				
				$(countryDiv).append("<p>Rating: " + imageArray[index].rating.toUpperCase() + "</p>");
				$(countryDiv).append(image);
				$('#country-images').append(countryDiv);
			});
		});
	}

	// Function to swith betwen still and animated GIPHY images when the user clicks on the iamge
	function toggleGiphyImages() {
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	}

	// Click function for the Submit Button
	function clickSubmitButton(event){
		console.log("Click Submit Button");

		// Make sure to not refresh the page when the submit button is clicked
		event.preventDefault();
		var searchTerm = $("#country-input").val().trim();

		// Add the topic only if it doesn't already exist and it is not an empty string
		if (searchTerm !== "" && !countries.includes(searchTerm)) {
			countries.push(searchTerm);

			// Recreate topic buttons with the updated list of countries
			createTopicButtons();
		}

		// Clear the text area when done
		$("#country-input").val("");
	}

	// Create buttons from the initial topics array;
	createTopicButtons();

	// Click handlers for country buttons
	$(document).on("click", ".country-btn", clickCountryButton);
	// Click handler for toggling GIPHY images
	$(document).on("click", ".image-style", toggleGiphyImages);
	// Click handler for submit buton
	$(document).on("click", "#country-submit", clickSubmitButton);

});