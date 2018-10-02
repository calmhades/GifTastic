$(document).ready(function () {

var animals = ["Cat", "Dog", "Rabbit", "Goat", "Parrot", "Cow", "Duck", "Lemur", "Giraffe", "Zebra"];

function renderButtons() {
    $("#animals-view").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
            a.addClass("animal");
            a.addClass("btn btn-primary")
            a.attr("data-name", animals[i]);
            a.text(animals[i]);
            $("#animals-view").append(a);
        }
}


    function addNewButton() {
        $("#add-btn").on("click", function () {
            event.preventDefault();
            var animal = $("#search-input").val().trim();
            animals.push(animal);
            renderButtons();
        });
    }


    function displayAnimalGifs() {


        var animalSearch = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
            })
        .then(function (response) {
            $("#gif-views").empty();
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div class='image'>");

                var gifRating = $("<p>").text("Rating: " + results[i].rating);

                animalDiv.append(gifRating);

                var animalImg = $("<img>");
                animalImg.attr("src", results[i].images.fixed_height_small_still.url);
                animalImg.attr("data-still", results[i].images.fixed_height_small_still.url);
                animalImg.attr("data-animate", results[i].images.fixed_height_small.url);
                animalImg.attr("data-state", "still");
                animalImg.addClass("image");
                animalDiv.append(animalImg);
                $("#gif-views").prepend(animalDiv);
            }
            
        });
    }
        
    renderButtons();
    addNewButton();

    $(document).on("click", ".animal", displayAnimalGifs);
    $(document).on("click", ".image", function(){
            var state = $(this).attr('data-state');
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
                }       
            else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }})
});
    