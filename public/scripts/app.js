$(() => {
  $.ajax({
    method: "GET",
    url: "/users"
  }).done((users) => {
    for(user in users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
