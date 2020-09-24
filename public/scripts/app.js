$(document).ready(function () {

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
    for (const contribution of contributions) {
      const $contribution = createContributionElem(contribution);

      $('#new-contribution').prepend($contribution);
    }
  };

  const loadContributions = (storyid) => {
    $.ajax({
      url: `/stories/${storyid}`, //????
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

  /**
   *
   * @param {number} contributionid the id of a specific contribution.
   * @return {boolean} if the upVote was successful.
   */
  const addupVote = function(contributionid) {
    console.log("WHAT ARE YOU MY GOOD FRIEND", $(this))
    $.ajax({
      url: `/contributions/${contributionid}/upVotes`,
      method:'POST',
      dataType:'json',
      success: ({count}) => {
        $(this).siblings('#count').text(count);
      },
      error:  (error) => {
        console.log('error from votes', error);
      }
    });
  };

  $(".like-btn").on("click", function(e) {
    console.log("THIS EEEEEEE", e.target)
    console.log("CLICK!!!!!!!!");
    let storyid =$(this).attr("story-id")
    let contributionid = $(this).attr("contribution-id")
    console.log("WHAT IS STORYID", storyid)
    console.log("WHAT IS CONTRIBUTIONID", contributionid)
    addupVote.call(this, contributionid);
  });

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // console.log("WHAT IS THE MAIN VLAUE", $("#mainvalue").val())

  const addContribution = function (storyid) {
    // let storyid = $("#mainvalue").val();
    console.log("WHAT ARE YOU????", storyid)
    $.ajax({
      url: `/stories/${storyid}`,
      method:'PUT',
      dataType: 'json',
      data: {contributionId: $("#mainvalue").val()},
      success: (response) => {
        //so we can loop through here OR create a function thats loops the data and call it in here
        console.log("It works", response)
        for (let text of response) {
          $('.append').append(text.contributiontext)
          $('contribution-id').hide();
        }
      },
      error:  (error) => {
        console.log('error from addContribution', error);
      }
    });
  }g

  $(".add-contribution").on("submit", function (e) {
    e.preventDefault();
    let addContributionId = $(this).children().attr("story-Id")
    console.log("AM I ADDING THIS", addContributionId)

    // console.log('WHAT IS ADD-CONTRIBUTION-ID', addContributionId);
    addContribution(addContributionId);
  })


  /// if contributions.accepted_at === true then contribution_text.appendTo(body of the story)

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

