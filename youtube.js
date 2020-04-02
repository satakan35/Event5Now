//js for youtube content
$(document).ready(function(){
    var key = "AIzaSyBiO0QOXl_kQY4OjmBK0Z8aR_7FSUCbXVY"
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCxAICW_LdkfFYwTqTHHE0vg&maxResults=20&q=performances&type=video&videoEmbeddable=true&key=" + key;
    loadvideos()
    function loadvideos() {
      $.ajax({
        url: url,
        method: "GET",
      }).then(function (data) {
    console.log(data);
        var id = data.items[0].id.videoId;
        console.log(id);
        mainVideo(id);
        resultsLoop(data);
      })
    }
    function mainVideo(id){
      $("#video").html(`<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    }
    function resultsLoop(data){
      $.each(data.items, function(i, item){
      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var description = item.snippet.description.substring(0, 75);
      var vids = item.id.videoId;
      console.log(vids)
      $("#preview-cards").append(`
      <article class="item" data-key="${vids}">
                <img src="${thumb}" class="thumb">
                <div class="details">
                    <h4 class="card-title">${title}</h4>
                    <p>${description}</p>
                </div>
            </article>
    `);
    });
     }
      $("#preview-cards").on("click" , "article" , function(){
        var id =$(this).attr("data-key");
        mainVideo(id);
        });
    });
    //end youtube js