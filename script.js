$(document).ready(function () {
    var apiKey = "vvB0b99r8iknxkWR7GX7wfUP86byT2Xx"
    $("#button-addon2").click(function (event) {
        var search = $("#search").val().trim();
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=OH" + "&apikey=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var eventDiv = $("<ul>");
            for (i = 0; i < 20; i++) {
                var eventDiv = $("<div>");
                var eventName = $("<li>").text(response._embedded.events[i].name + "--" + response._embedded.events[i].dates.start.localDate);
                $("#new-cards").append(eventDiv.append(eventName));
            }
            console.log(response);
        });
    });
})