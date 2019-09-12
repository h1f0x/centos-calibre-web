var ofResults = [];

$(function () {
    var msg = i18nMsg;

    var provider = "http://localhost:8083";
    var ofSearch = "/lookup";
    var ofDone = false;

    var showFlag = 0;

    var templates = {
        bookResult: _.template(
            $("#template-book-result").html()
        )
    };

    function populateForm (book) {
        tinymce.get("description").setContent(book.description);
        $("#bookAuthor").val(book.authors);
        $("#book_title").val(book.title);
        $("#tags").val(book.tags.join(","));
        $("#publisher").val(book.publisher);
        $("#pubdate").val(book.publishedDate);
        $("#series").val(book.series);
        $("#series_index").val(book.volume);
        $("#rating").data("rating").setValue(Math.round(book.rating));
        $(".cover img").attr("src", book.cover);
        $("#cover_url").val(book.cover);
    }

    function ofShowResult () {
        showFlag++;
        if (showFlag === 1) {
            $("#meta-info").html("<ul id=\"book-list\" class=\"media-list\"></ul>");
        }
        if (!ofDone) {
            $("#meta-info").html("<p class=\"text-danger\">" + msg.no_result + "</p>");
            return;
        }
        if (ofDone && ofResults.length > 0) {
            ofResults.forEach(function(result) {
                var book = {
                    title: result.title,
                    authors: result.authors || [],
                    description: result.description || "",
                    publisher: result.publisher || "",
                    publishedDate: result.release || "",
                    series: result.series || "",
                    volume: result.volume || "",
                    tags: result.tags || [],
                    rating: result.rating || 0,
                    cover: result.image ?
                        result.image :
                        "/static/generic_cover.jpg",
                    url: provider + result.link,
                    source: {
                        id: "swissbookstore",
                        description: "Swiss Book Store",
                        url: provider
                    }
                };

                var $book = $(templates.bookResult(book));
                $book.find("img").on("click", function () {
                    populateForm(book);
                });

                $("#book-list").append($book);
            });
            ggDone = false;
        }
    }

    function ofSearchBook (title) {
        $.ajax({
            url: provider + ofSearch + "/" + title,
            type: "GET",
            dataType: "json",
            jsonp: "callback",
            success: function success(data) {
                ofResults = data;
                ofDone = true;
            },
            complete: function complete() {
                ofDone = true;
                ofShowResult();
                $("#show-google").trigger("change");
            }
        });
    }

    function doSearch (keyword) {
        showFlag = 0;
        $("#meta-info").text(msg.loading);
        if (keyword) {
            ofSearchBook(keyword);
        }
    }

    $("#meta-search").on("submit", function (e) {
        e.preventDefault();
        var keyword = $("#keyword").val();
        if (keyword) {
            doSearch(keyword);
        }
    });

    $("#get_meta").click(function () {
        var bookTitle = $("#book_title").val();
        if (bookTitle) {
            $("#keyword").val(bookTitle);
            doSearch(bookTitle);
        }
    });

});
