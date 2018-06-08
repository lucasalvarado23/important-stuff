 document.addEventListener('keydown', function(event) {
    const key = event.key; // const {key} = event; in ES6+
    if (key === "Escape") {
        window.close();
    }
});


"use strict";
var channelId = "UCZyNik2BDSBX5hjpo_ouT1Q",
    key = "AIzaSyBPfEETJDyFLgB_mEIVo7r2H1fJwHv3US8",
    playlistId = "PLUrbbS676eyjmJpJp6YU3i4LPmWJBiitS",
    token = null,
$(document).ready(function() {
    function t(t) {
        $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            part: "snippet",
            key: key,
            maxResults: 20,
            playlistId: playlistId,
            pageToken: t
        }, function(t) {
            e(t.nextPageToken), i(t)
        })
    }

    function e(t) {
        void 0 === t ? $(".load-more").attr("data-key", "").html("No More Results").addClass("disabled") : $(".load-more").attr("data-key", t)
    }

    function i(t) {
        $.each(t.items, function(t, e) {
            var i = e.snippet.thumbnails.medium.url,
                a = e.snippet.title,
                n = e.snippet.resourceId.videoId;
            if (e.snippet.description.length > 100) var s = e.snippet.description.substring(0, 100) + " ...";
            else var s = e.snippet.description;
            $("main").append('\n            <article id="item' + (t + 1) + '" class="item" data-key="' + n + '">\n                <div class="thumb-container">\n                    <img src="' + i + '" class="thumb">\n                </div>\n                <div class="vid-details">\n                    <h1>' + a + '</h1>\n                    <p class="description">' + s + "</p>\n                </div>\n            </article>")
        })
    }

    function a(t) {
        $("#video").html('<iframe class="video" src="https://www.youtube.com/embed/' + t + '?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=0" frameborder="0" allowfullscreen></iframe>')
    }
    $("main").on("click", "article", function(t) {
        if ($(t.currentTarget).hasClass("item")) {
            a($(this).attr("data-key"))
        }
    }), t(token), a(firstVid), $(".load-more").on("click", function(e) {
        e.preventDefault();
        var i = $(this).attr("data-key");
        "" !== i && t(i)
    });
    var n = $("iframe[src^='//www.youtube.com'], object, embed"),
        s = $("figure");
    n.each(function() {
        $(this).attr("data-aspectRatio", this.height / this.width).removeAttr("height").removeAttr("width")
    }), $(window).resize(function() {
        var t = s.width();
        n.each(function() {
            var e = $(this);
            e.width(t).height(t * e.attr("data-aspectRatio"))
        })
    }).resize()
});