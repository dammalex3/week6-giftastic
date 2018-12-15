var topics = ["Bob Dylan", "Bruce Springsteen", "The Beatles", "Pink Floyd", "Led Zeppelin", "David Bowie"];

//function to create a button 
function createButton(string) {
    var newButton = $("<button>");
    newButton.text(string);
    newButton.attr("data-musician", string);
    newButton.addClass("musician-button");
    $("#buttons").append(newButton);
}

//function to control play/pause of the gif
function gifPlayPause() {
    var state = $(this).attr("data-state");

    if (state==="still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }

      if (state==="animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

}

//display gifs function
function displayGifs() {
    console.log("button clicked");
    var api_key = "pVkySH2jhMB6zASoiAXf49fyjlsErWxy&q";
    var searchTerm = $(this).attr("data-musician");
    
    var numResults = 10;

    var requestURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + searchTerm + "&limit=" + numResults;

    $.ajax({
        url: requestURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          $("#gifs").empty();

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gif-div");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.addClass("gifImage");

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#gifs").prepend(gifDiv);
          }
        });

};

//on click function to add a new button
$("#add-musician-button").on("click", function(event) {

    // Preventing the submit button from trying to submit the form
    event.preventDefault();

    // Here we grab the text from the input box
    var newMusician = $("#musician-input").val().trim();

    //create a new button with the value
    topics.push(newMusician);

    createButton(newMusician);

})

//create initial set of buttons
for (var i=0; i<topics.length; i++) {
    createButton(topics[i]);
}

//use document.on so that it works for buttons that are dynamically added to the page
$(document).on("click", ".musician-button", displayGifs);

$(document).on("click", ".gifImage", gifPlayPause);

