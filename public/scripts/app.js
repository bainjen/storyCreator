$(document).ready(function () {

  // $("#like").on("click", "#count", function(e) {
  //         var id = $(this).attr("id");
  //         var main = $(this);

  //         if(button.hasId("like"))
  //           return;

  //         main.addId("like");

  //         $.ajax({
  //             type: 'post',
  //             url: 'includes/upvote.php',
  //             data: { "id":id },
  //             success(data) {
  //             main.parent().find("div.votenum").html(data);
  //             },
  //             error: function (xhr, textStatus, error) {
  //                 alert("Sorry!");
  //             }
  //         });
  //     });

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //build up div that contains the new contribution
  const createContributionElem = (contributionObj) => {
    const $contributionObj = $(`
    <div class='reader'>
      <% for (let contribution of contributions) { %>
      <div class='reader-1'>
        <div class='submitted-by'>
          <p>submitted by:</p>
          <p><%= contribution.name %></p>
        </div>
        <h3><%= contribution.text_addon %></h3>
        <p><%= contribution.accepted_at %></p>
        <div class='count'><%=contribution.count%></div>
        <button class='btn' id='like' type="" value="submit"> ✍️ </button>
      </div>
      <% } %>
    </div>
    <% } %>
    `)
  };

  $("#like").click(function () {
    let count = parseInt($("~#count", this).text());
    console.log("WHAT IS THIS COUNT", count)
    console.log("WHAT IS THIS", this);
    if ($(this).hasId("like")) {
      count++;
    }
  })

  //loops through all contributions
  const renderContributions = (contributions) {
    $('#new-contribution').empty();
    for (const contribution of contributionObj) {
      const $contribution = createTweetElement(contribution);

      $('#new-contribution').prepend($contribution);
    }
  };

  const loadContributions = () => {
    $.ajax({
      url: `/stories/${id}`, //????
      method: "GET",
      dataType: 'json',
      success: (contributions) => {
        renderContributions(contributions);
      },
      error: (error) => {
        console.log('error from loadContributions', error);
      }
    });
  };


  // $(document).ready(function () {
  //   loadContributions();

  //   // //form submit handler
  //   // const $submitTweet = $('#submit-tweet');
  //   // $submitTweet.on('submit', function (e) {
  //   //   e.preventDefault();
  //   //   const serializedData = $(this).serialize();
  //   //   //handle errors
  //   //   removeError();
  //   //   if ($('#tweet-text').val() === '' || null) {
  //   //     appendError("You're a goose! 🐙 Type something! Anything!");
  //   //   } else if ($('#tweet-text').val().length > 140) {
  //   //     appendError("Ope! Too many characters 🙈 Love that enthusiasm! 💙 Just keep it under 140!")
  //   //   } else {
  //   //     //post tweets
  //   //     $.post('/tweets', serializedData)
  //   //       .then((response) => {
  //   //         loadTweets();
  //   //         $(this).children('textarea').val('');
  //   //         resetCounter();
  //   //       })
  //   //   }
  //   // });
  //   });
});

