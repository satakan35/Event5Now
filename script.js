$(document).ready(function () {
    // The function that grabs the weather
    $("#button-addon2").click(function () {
        // hides the original landing page to display the new page
        $(".container").addClass("hide");
        $("#new-cards").removeClass("hide");
        // grabs the input values
        var search = $("#search").val().trim();
        // the openweathermap api url that inserts the user input into the zipcode field
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + search + ",us&appid=aa550f330654aefb73397b4e69ec9a4c&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            console.log(data);
            // making a variable that should be able to be called in an argument later on
            var weatherTime = data.list[0].dt_txt;
            // for loop that goes through five days of forecast
            for (var i = 0; i < data.list.length; i += 8 ) {
                console.log(weatherTime);
                // Creating our cards and styling them
                var col = $("<div>").addClass("col-md-2").attr("style", "margin: auto");
                // checks if it is cloudy
                if (data.list[i].weather[0].main == "Clouds") {
                    var card = $("<div>").addClass("card bg-secondary");
                }
                // checks if it is rainy
                else if (data.list[i].weather[0].main == "Rain") {
                    var card = $("<div>").addClass("card bg-primary");
                    // else it is sunny
                }
                else {
                    var card = $("<div>").addClass("card bg-warning");
                }
                // finishing creating our cards and then appending info onto them
                var cardBody = $("<div id='" + i + "-day'>").addClass("card-body");
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                var title = $("<h4>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                var temp = $("<p>").addClass("card-text").text("Temp: " + Math.floor(data.list[i].main.temp_max) + " F")
                col.append(card.append(cardBody.append(title, temp, img)));
                $("#new-cards").append(col);
            }
            // Calling the function to grab the events with what ever current timerange openweather is using
            getEvents(weatherTime);
        });
    });
    //function that grabs the events and adding our time
    function getEvents(weatherTime) {
        // our apikey for the ticketmaster api
        var apiKey = "vvB0b99r8iknxkWR7GX7wfUP86byT2Xx"
        // shows our event div
        $("#events").removeClass("hide");
        // creating a variable that stores our time format to better work with the ticketmaster api
        var format = "YYYY-MM-DDTHH:mm:ss"
        // grabbing our input
        var search = $("#search").val().trim();
        // dynamically changing start time
        var timerange = moment(weatherTime).format(format);
        // our ticketmaster api query
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + apiKey + "&stateCode=OH&locale=*&startDateTime=" + timerange + "Z&classificationName=music&sort=date,asc&size=30"
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            // checks to see if there are any events going on in the area
            if (response.page.totalElements == 0) {
                console.log("There are no events for this location");
                var col = $("<div>").addClass("col-lg-8").attr("style", "margin: auto");
                var card = $("<div>").addClass("card bg-info");
                var cardBody = $("<div>").addClass("card-body");
                var eventName = $("<p>").text("Unfortunately, there are no events going on in this area! If the weather is gray, you should stay indoors, if yellow go party!");
                col.append(card.append(cardBody.append(eventName)));
                $("#events").append(col);
            }
            //if there are it plays through this else statement
            else {
                // a for loop that displays each event to a card with the event name and dates
                for (var j = 0; j < response._embedded.events.length; j++) {
                    // authenticating that events haven't been cancelled
                    if (response._embedded.events[j].dates.status.code === "cancelled" || response._embedded.events[j].dates.status.code === "offsale") {
                        continue
                    }
                    //creating a switch statement to check which days events start on and then appending them to the specific card days
                    //I went with a switch statement because it was easier than writing a bunch of else-ifs
                    switch (response._embedded.events[j].dates.start.localDate) {
                        //checks to see if the start date is today
                        case moment(timerange).format("YYYY-MM-DD"):
                            {
                                //creating an "<a>" and then making it open a new tab tag and adding text (name and date)
                                var eventName = $("<p>");
                                var eventLink = $("<a>").attr({"href": response._embedded.events[j].url, target: "_blank"}).text(response._embedded.events[j].name + "--" + response._embedded.events[j].dates.start.localDate);
                                //then we append that too the corresponding weathercard!
                                $("#0-day").append(eventName.append(eventLink));
                                break;
                            }
                        //checks to see if the start date is one day after
                        case moment(timerange).add(1, "days").format("YYYY-MM-DD"):
                            {
                                var eventName =$("<p>");
                                var eventLink = $("<a>").attr({"href": response._embedded.events[j].url, target: "_blank"}).text(response._embedded.events[j].name + "--" + response._embedded.events[j].dates.start.localDate);
                                //since the loop for the weather has to jump 8 times per day for the forecast, we have to multiply our days by 8 to get
                                //the correct day id!
                                $("#8-day").append(eventName.append(eventLink));
                                break;
                            }
                        //checks to see if the start date is two days after
                        case moment(timerange).add(2, "days").format("YYYY-MM-DD"):
                            {
                                var eventName =$("<p>");
                                var eventLink = $("<a>").attr({"href": response._embedded.events[j].url, target: "_blank"}).text(response._embedded.events[j].name + "--" + response._embedded.events[j].dates.start.localDate);
                                $("#16-day").append(eventName.append(eventLink));
                                break;
                            }
                        //checks to see if the start date is three days after
                        case moment(timerange).add(3, "days").format("YYYY-MM-DD"):
                            {
                                var eventName =$("<p>");
                                var eventLink = $("<a>").attr({"href": response._embedded.events[j].url, target: "_blank"}).text(response._embedded.events[j].name + "--" + response._embedded.events[j].dates.start.localDate);
                                $("#24-day").append(eventName.append(eventLink));
                                break;
                            }
                        //checks to see if the start date is four days after
                        //five days in total
                        case moment(timerange).add(4, "days").format("YYYY-MM-DD"):
                            {
                                var eventName =$("<p>");
                                var eventLink = $("<a>").attr({"href": response._embedded.events[j].url, target: "_blank"}).text(response._embedded.events[j].name + "--" + response._embedded.events[j].dates.start.localDate);
                                $("#32-day").append(eventName.append(eventLink));
                                break;
                            }
                    }
                }
            }
        });
    };
    // clicking the logo button will bring you back to the home screen while erasing everything out of the events, weather cards, and input fields.
    $("#logo-button").click(function () {
        $(".container").removeClass("hide");
        $("#new-cards").addClass("hide");
        $("#new-cards").empty();
        $(".form-control").val("");
    })
})