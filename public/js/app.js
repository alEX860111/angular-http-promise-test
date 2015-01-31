var app = angular.module("myapp", []);

app.controller("myctrl", ["$scope", "movieService", function($scope, movieService) {
  movieService.getMovie()
    .then(function(movieData) {
      $scope.movieData = movieData;
    });
}]);

app.factory('movieService', ["$http", "movieConverter", function($http, movieConverter) {
  return {
    getMovie: function() {
      return $http.get('/movie')
        .then(function(response) {
          return movieConverter.processMovie(response.data);
        });
    }
  };
}]);

app.factory('movieConverter', function() {
  return {
    processMovie: function(movie) {
      movie.title = movie.title.toUpperCase();
      movie.price = movie.price / 100;
      return movie;
    }
  };
});
