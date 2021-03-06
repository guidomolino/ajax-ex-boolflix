
function searchBtn() {
  var btn = $("#searchbar-btn");
  btn.click(searchInput);
}

function searchInput() {

  var ricercaUtente = $("#searchbar").val();
  var apiKey = "78cbe2d71a8afe04bdaddc012b93da5f";
  console.log(ricercaUtente);
  searchFilm(ricercaUtente, apiKey);
  searchTV(ricercaUtente, apiKey);
  $(".results").css("display", "block");

}


// AJAX FILM
function searchFilm(ricercaUtente, apiKey) {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: apiKey,
      query: ricercaUtente
    },
    success: function(data, state){

      var resultsNum = data["total_results"];
      var filmList = data["results"];
      console.log(filmList);
      console.log(resultsNum);

      if (filmList) {

        var template = $("#film-template").html();
        var target = $("#filmList");
        var compiled = Handlebars.compile(template);

        for (var i = 0; i < filmList.length; i++) {
          var film = filmList[i];

          var vote = film["vote_average"];
          var language = film["original_language"];
          var poster = film["poster_path"];
          film.stars = starredVote(vote);
          film.flag = languageIcon(language);
          film.copertina = copertinaUrl(poster);

          var filmHTML = compiled(film);
          target.append(filmHTML);
        }

      }

    },
    error: function(request, state, error) {
      console.log(state);
      console.log(request);
      console.log(error);
    }
  })
}

// AJAX SERIE TV
function searchTV(ricercaUtente, apiKey) {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {
      api_key: apiKey,
      query: ricercaUtente
    },
    success: function(data, state){

      var resultsNum = data["total_results"];
      var tvList = data["results"];
      console.log(tvList);
      console.log(resultsNum);

      if (tvList) {

        var target = $("#tvList");
        var template = $("#tv-template").html();
        var compiled = Handlebars.compile(template);

        for (var i = 0; i < tvList.length; i++) {
          var tv = tvList[i];

          var vote = tv["vote_average"];
          var language = tv["original_language"];
          var poster = tv["poster_path"];
          tv.stars = starredVote(vote);
          tv.flag = languageIcon(language);
          tv.copertina = copertinaUrl(poster);

          var tvHTML = compiled(tv);
          target.append(tvHTML);

        }

      }

    },
    error: function(request, state, error) {
      console.log(state);
      console.log(request);
      console.log(error);
    }
  })
}

// funzione voti in stelle
function starredVote(vote) {

  // numero stelle = voto / 2 arrotondato per eccesso
  var starsNumber = Math.round(vote/2);
  var starsListHTML = '';

  // stampo stelle in base al numero
  for (var i = 0; i < starsNumber; i++) {
    starsListHTML += '<i class="fas fa-star"> </i>'
  }
  return starsListHTML;
}

// funzione bandiere lingue
function languageIcon(language) {
  // it, en, fr, de, es, cn
  var flagIcon = '';
  if (language == "en") {
    flagIcon += '<img src="img/flag-en.png" alt="">'
  }else if (language = "it") {
    flagIcon += '<img src="img/flag-it.png" alt="">'
  }else if (language = "es") {
    flagIcon += '<img src="img/flag-es.png" alt="">'
  }else if (language = "de") {
    flagIcon += '<img src="img/flag-de.png" alt="">'
  }else if (language = "cn") {
    flagIcon += '<img src="img/flag-cn.png" alt="">'
  }else if (language = "fr") {
    flagIcon += '<img src="img/flag-fr.png" alt="">'
  }else {
    flagIcon += language
  }
  return flagIcon;
}

//funzione url di background
function copertinaUrl(poster) {
  var urlMain = 'https://image.tmdb.org/t/p/';
  var urlSize = 'w342';
  var finalUrl = urlMain + urlSize + poster;
  return finalUrl;
}


function init() {
  searchBtn();
}

$(document).ready(init);
