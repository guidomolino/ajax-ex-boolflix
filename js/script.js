
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
        var compiled = Handlebars.compile(template);
        var target = $("#filmList");

        for (var i = 0; i < filmList.length; i++) {
          var film = filmList[i];
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

        var template = $("#tv-template").html();
        var compiled = Handlebars.compile(template);
        var target = $("#tvList");

        for (var i = 0; i < tvList.length; i++) {
          var tv = tvList[i];
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


function init() {
  searchBtn();
}

$(document).ready(init);
