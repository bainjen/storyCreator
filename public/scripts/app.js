$(document).ready(function () {



  const loadContributions = (id) => {
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
  console.log("THiS IS WHERE WE ARE")
  console.log($('#like'));

  // loadContributions(id);

  const addupVote = (id) => {

    $.ajax({
      url: `/contributions/${id}/upVotes`,
      method:'POST',
      dataType:'json',
      success: ({count}) => {
        console.log("WHAT ARE YOU")
        console.log(this)
        console.log("WHATS MY COUNT", count)
      },
      error:  (error) => {
        console.log('error from votes', error);
      }
    });
  };



  $(".btn").on("click", function(e) {
    console.log("THIS EEEEEEE", e.target.id)
    console.log("CLICK!!!!!!!!");
    let storyid =$("#count").attr("data-id")
    console.log("WHAT IS STORYID", storyid)
    addupVote(storyid);
  });

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //build up div that contains the new contribution
  const createContributionElem = (contributionObj) => {
    const $contributionObj = $(`
      <div class='reader'>
        <div class='reader-1'>
        <div class='submitted-by'>
       <p>submitted by:</p>
       <p>${contribution.name}</p>
     </div>
        <h3>${escape(contribution.text_addon)} </h3>
        <p>${contribution.accepted_at} </p>
        <div class='count'>${contribution.count}</div>
        <button class='btn' id='like' type="" value="submit"> ✍️ </button>
      </div>
    </div>
    `)
  };




  //loops through all contributions
  const renderContributions = (contributions) => {
    $('#new-contribution').empty();
    for (const contribution of contributionObj) {
      const $contribution = createContributionElem(contribution);

      $('#new-contribution').prepend($contribution);
    }
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

