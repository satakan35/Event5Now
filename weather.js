$(document).ready(function(){
        $("#button-addon2").click(function(event){
            $(".container").addClass("hide");
            $("#new-cards").removeClass("hide");
            var search = $("#search").val().trim();
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + search +",us&appid=aa550f330654aefb73397b4e69ec9a4c&units=imperial";
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function(response){
                for(i = 0; i < 5; i++){
                    var col = $("<div>").addClass("col-md-2").attr("style", "margin: auto");
                    var card = $("<div>").addClass("card");
                    var cardBody = $("<div>").addClass("card-body");
                    var day = moment().add(i, 'days').format("MMM Do YY");
                    var title = $("<h4>").addClass("card-title").text(day);

                    col.append(card.append(cardBody.append(title)));
                    $("#new-cards").append(col);
                }
                // console.log(response.list[0].main.temp);
                
            });
        });
    })