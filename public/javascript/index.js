$(document).ready(function() {
    var articleContainer = $(".article-container");
    $(document).on("click", "btn-save", handleArticleSave);
    $(document).on("click", "scrape-new", handleArticleScrape);

    initpage();

    function initpage() {
        articleContainer.empty();
        $.get("/api/articles?saved=false")
        .then(function(data) {
            if(data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        var articlePanels = [];
        for(var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }
})

function createPanel(article) {
    var panel = 
    $(["<div class = 'panel panel-default'>",
    "<div class = 'panel-heading'>",
    "<h3>",
    article.articles,
    "<a class= 'btn btn-success save'>",
    "Save article",
    "</a>",
    "</h3>",
    "</div>",
    "<div class= 'panel-body'>",
    article.summary,
    "</div>",
    "</div>"
].join(""));

panel.data("_id", article._id);

return(panel);

}

function renderEmpty() {
    var emptyAlert = 
    $(["<div class= 'alert alert-warning text-center'>",
    "<h4> Oh no! It looks like we don't have any new articles<h4>",
    "</div>"

].join(""));
articleContainer.append(emptyAlert);

}