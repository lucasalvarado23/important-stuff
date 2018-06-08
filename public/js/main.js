document.addEventListener('keydown', function(event) {
    const key = event.key; // const {key} = event; in ES6+
    if (key === "Escape") {
        window.location.href = "about:home"
    }
});


var channelId = 'UCZyNik2BDSBX5hjpo_ouT1Q';
var key = 'AIzaSyBPfEETJDyFLgB_mEIVo7r2H1fJwHv3US8';
var playlistId = 'PLUrbbS676eyjmJpJp6YU3i4LPmWJBiitS';
var token = null;



$(document).ready(function() {

    // Event Listeners for articles
    $('main').on('click', 'article', function(e) {
        if ($(e.currentTarget).hasClass('item')) {
            var id = $(this).attr('data-key');
            displayVid(id);
        }
    });

    // Load Videos On Page Load
    loadVids(token);

    //Load More Videos On Click
    $('.load-more').on("click", function(e) {
        e.preventDefault();
        var next = $(this).attr('data-key');

        if (next !== "") {
            loadVids(next);
        }
    });


    //Get Request
    function loadVids(token) {
        $.get(
            'https://www.googleapis.com/youtube/v3/playlistItems', {
                part: 'snippet',
                key: key,
                maxResults: 20,
                playlistId: playlistId,
                pageToken: token
            },
            function(data) {
                var nextPage = data.nextPageToken;
                resultsLeft(nextPage);
                resultsLoop(data);
            }
        );
    }

    //Check if there are any results left
    function resultsLeft(nextPage) {
        if (nextPage === undefined) {
            $('.load-more').attr("data-key", "").html('No More Results').addClass('disabled');
        } else {
            $('.load-more').attr("data-key", nextPage);
        }
    }

    //Loop through results and display them on the dom.
    function resultsLoop(data) {
        $.each(data.items, function(i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var vid = item.snippet.resourceId.videoId;

            if (item.snippet.description.length > 100) {
                var desc = item.snippet.description.substring(0, 100) + ' ...';
            } else {
                var desc = item.snippet.description;
            }

            $('main').append(`
            <article id="item${i + 1}" class="item" data-key="${vid}">
                <div class="thumb-container">
                    <img src="${thumb}" class="thumb">
                </div>
                <div class="vid-details">
                    <h1>${title}</h1>
                    <p class="description">${desc}</p>
                </div>
            </article>`);
        });
    }

    // Select Video Function
    function displayVid(id) {
        $('#video').html(`<iframe class="video" src="https://www.youtube.com/embed/${id}?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=0" frameborder="0" allowfullscreen></iframe>`);
    }

    //--------------------
    // Aspect ratio for video
    //-------------------- 
    var $allVideos = $("iframe[src^='//www.youtube.com'], object, embed"),
        $fluidEl = $("figure");

    $allVideos.each(function() {

        $(this)
            // jQuery .data does not work on object/embed elements
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');
    });

    $(window).resize(function() {

        var newWidth = $fluidEl.width();
        $allVideos.each(function() {
            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.attr('data-aspectRatio'));
        });
    }).resize();
});