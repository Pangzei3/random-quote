
var quotesData=[], quotesDataLength=0, currentQuote = '', currentAuthor = '';

var colors = [
  '#00a8ff',
  '#00a8ff',
  '#fbc531',
  '#4cd137',
  '#487eb0',
  '#353b48',
  '#273c75',
  '#7f8fa6',
  '#e84118',
  '#e1b12c',
  '#192a56',
  '#73A857'
];

function getQuotes() {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }
  return $.ajax(settings).done(function (response) {
    quotesData = JSON.parse(response);
    quotesDataLength = quotesData.length;
    // console.log(quotesData);
  });
  // $.ajax({
  //   headers: {
  //     Accept: 'application/json'
  //   },
  //   url:
  //     'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
  //   success: function (jsonQuotes) {
  //     if (typeof jsonQuotes === 'string') {
  //       quotesData = JSON.parse(jsonQuotes);
  //       console.log('quotesData');
  //       console.log(quotesData);
  //     }
  //   }
  // });
}

function getRandomQuote() {
  // console.log(quotesData)
  return quotesData[Math.floor(Math.random()*quotesDataLength)];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.text;
  currentAuthor = randomQuote.author;

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.text);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').text(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
