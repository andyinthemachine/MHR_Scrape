



$.getJSON("/articles", function (data) {

  $article_list = $("#mhr-articles");
  console.log(data);
  const $articles = data.map(function (article) {
    const $new_article = $('<h3>').text(article.title).append(
      $('<p>').text(article.summary),
      $("<a>").text(`link`).attr("href", article.link),
      $("<button>").attr({ class: "note-button", "data-id": article._id }).text(`comment`)
    );
    return $new_article;
  });
  $article_list.append($articles);
});


$("#mhr-articles").on("click", ".note-button", function () {
  $("#mhr-notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({ method: "GET", url: "/articles/" + thisId }).then(function (data) {
    $("#mhr-notes").append("<h2>" + data.title + "</h2>");
    $("#mhr-notes").append("<input placeholder='name' id='titleinput' name='title' >");
    $("#mhr-notes").append("<textarea placeholder='comment' id='bodyinput' name='body'></textarea>");
    $("#mhr-notes").append("<button data-id='" + data._id + "' id='save-note'>Save Comment</button>");
    $("#mhr-notes").append("<button data-id='" + data._id + "' id='delete-note'>Delete Comment</button>");

    if (data.note) {
      $("#titleinput").val(data.note.title);
      $("#bodyinput").val(data.note.body);
    }
  });
});


$(document).on("click", "#save-note", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST", url: "/articles/" + thisId, data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function (data) {
    $("#mhr-notes").empty();
  });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#delete-note", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({ method: "DELETE", url: "/notes/" + thisId })
    .then(function (data) {
      $("#mhr-notes").empty();
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});