// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/users"
//   }).done((users) => {
//     for(user in users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

//build up div that contains the new contribution
const createContributionElem = (contributionObj) => {

};

//loops through all contributions
const renderContributions = (contributions) {

};

const loadContributions = () => {
  $.ajax({
    url: "/stories/:id", //????
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


$(document).ready(function () {
  loadContributions();

  // //form submit handler
  // const $submitTweet = $('#submit-tweet');
  // $submitTweet.on('submit', function (e) {
  //   e.preventDefault();
  //   const serializedData = $(this).serialize();
  //   //handle errors
  //   removeError();
  //   if ($('#tweet-text').val() === '' || null) {
  //     appendError("You're a goose! 🐙 Type something! Anything!");
  //   } else if ($('#tweet-text').val().length > 140) {
  //     appendError("Ope! Too many characters 🙈 Love that enthusiasm! 💙 Just keep it under 140!")
  //   } else {
  //     //post tweets
  //     $.post('/tweets', serializedData)
  //       .then((response) => {
  //         loadTweets();
  //         $(this).children('textarea').val('');
  //         resetCounter();
  //       })
  //   }
  // });
});

