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
            for (i = 0; i < 5; i++) {
                var col = $("<div>").addClass("col-md-2").attr("style", "margin: auto");
                if(data.list[i].weather[0].main == "Clouds"){
                var card = $("<div>").addClass("card bg-secondary");
                }
                else if(data.list[i].weather[0].main == "Rain"){
                var card = $("<div>").addClass("card bg-primary");
                }
                else{
                var card = $("<div>").addClass("card bg-warning");
                }
                var cardBody = $("<div>").addClass("card-body");
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                var day = moment().add(i, 'days').format("MMM Do YY");
                var title = $("<h4>").addClass("card-title").text(day);
                var temp = $("<p>").addClass("card-text").text("Temp: " + Math.floor(data.list[i].main.temp_max) + " F")
                col.append(card.append(cardBody.append(title, temp, img)));
                $("#new-cards").append(col);  
            }
            getEvents();
        });
    });
    function getEvents() {
        var apiKey = "vvB0b99r8iknxkWR7GX7wfUP86byT2Xx"
        $("#events").removeClass("hide");
        var format = "YYYY-MM-DDTHH:mm:ss"
        var timerange = moment().format(format);
        var timerange2 = moment().add(5, "days").format(format);
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=OH&localStartDateTime=" + timerange + "," + timerange2 + "&size=100&sort=date,asc&apikey=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            for (i = 0; i < response._embedded.events.length; i++) {
                if (response._embedded.events[i].classifications[0].segment.name == "Music") {
                    var col = $("<div>").addClass("col-md-1").attr("style", "margin: auto");
                    var card = $("<div>").addClass("card bg-secondary");
                    var cardBody = $("<div>").addClass("card-body");
                    var eventName = $("<li>").text(response._embedded.events[i].name + "--" + response._embedded.events[i].dates.start.localDate);
                    col.append(card.append(cardBody.append(eventName)));
                    $("#events").append(col);
                }
            }
            console.log(response);
        });
    };
})