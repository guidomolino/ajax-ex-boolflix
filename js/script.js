
function searchBtn() {
  var btn = $("#searchbar-btn");
  btn.click(searchInput);
}

function searchInput() {

  var ricercaUtente = $("#searchbar").val();
  console.log(ricercaUtente);

  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "78cbe2d71a8afe04bdaddc012b93da5f",
      query: ricercaUtente
    },
    success: function(data, state){

      var resultsNum = data["total_results"];
      var filmList = data["results"];
      console.log(filmList);
      console.log(resultsNum);

      if (filmList) {

        for (var i = 0; i < resultsNum; i++) {

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
