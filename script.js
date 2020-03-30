$(document).ready(function () {
    $("#button-addon2").click(function (event) {
        $(".container").addClass("hide");
        $("#new-cards").removeClass("hide");
        var search = $("#search").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + search + ",us&appid=aa550f330654aefb73397b4e69ec9a4c&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            for (var i = 0; i < data.list.length; i += 8) {
                var weatherTime = data.list[i].dt_txt;
                    console.log(weatherTime.split(" ")[0]);
                var col = $("<div>").addClass("col-md-2").attr("style", "margin: auto");
                if (data.list[i].weather[0].main == "Clouds") {
                    var card = $("<div>").addClass("card bg-secondary");
                }
                else if (data.list[i].weather[0].main == "Rain") {
                    var card = $("<div>").addClass("card bg-primary");
                }
                else {
                    var card = $("<div>").addClass("card bg-warning");
                }
                var cardBody = $("<div id='" + i + "-day'>").addClass("card-body");
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                var title = $("<h4>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                var temp = $("<p>").addClass("card-text").text("Temp: " + Math.floor(data.list[i].main.temp_max) + " F")
                col.append(card.append(cardBody.append(title, temp, img)));
                $("#new-cards").append(col);
            }
            console.log(data);
             getEvents();
        });
    });
    function getEvents() {
        var apiKey = "vvB0b99r8iknxkWR7GX7wfUP86byT2Xx"
        $("#events").removeClass("hide");
        var format = "YYYY-MM-DDTHH:mm:ss"
        var search = $("#search").val().trim();
        var timerange = moment().format(format);
        var timerange2 = moment().add(5, "days").format(format);
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey="+ apiKey +"&postalCode=" + search + "&locale=*&startDateTime=" + timerange + "Z&classificationName=music"
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            if (response.page.totalElements == 0){
                console.log("There are no events for this location");
                var col = $("<div>").addClass("col-lg-8").attr("style", "margin: auto");
                var card = $("<div>").addClass("card bg-info");
                var cardBody = $("<div>").addClass("card-body");
                var eventName = $("<p>").text("Unfortunately, there are no events going on in this area! If the weather is gray, you should stay indoors, if yellow go party!");
                col.append(card.append(cardBody.append(eventName)));
                $("#events").append(col);
            }
            else{
            for (var j = 0; j < response._embedded.events.length; j++) {
                    var col = $("<div>").addClass("col-md-1").attr("style", "margin: auto");
                    var card = $("<div>").addClass("card bg-secondary");
                    var cardBody = $("<div>").addClass("card-body");
                    var eventName = $("<li>").text(response._embedded.events[j].name + "--" + response._embedded.events[j].dates.start.localDate);
                    col.append(card.append(cardBody.append(eventName)));
                    $("#events").append(col);
            }}
            console.log(response);
        });
    };
    $("#logo-button").click(function (event) {
        $(".container").removeClass("hide");
        $("#new-cards").addClass("hide");
        $("#new-cards").empty();
        $("#events").addClass("hide");
        $("#events").empty();
    })
})


// for(askdfj;.a)
// getevent();
// if (i % 8 === 0)
// getWeather();