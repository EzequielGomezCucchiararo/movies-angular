function groupResults (result) {

    var sizeGroups = 6;
    var movies = result.data.results;
    var groupedMovies = movies.reduce( function( acc, current, index ){
        index%sizeGroups? acc[acc.length-1].push(current) : acc.push([current]);
        return acc;
    }, [])

    return groupedMovies;
}

function generateFunctionController( title, apiUrl ) {

    return function($scope, $rootScope, MovieListService, myMovieConfig) {

        var apiKey = $rootScope.apiKeyMovieDbApp;

        if ( apiKey ) {

            $scope.loading = true;
            $scope.title = title;
            var url = myMovieConfig.moviesEndpoint + '/' + apiUrl + '?api_key=' + apiKey;

            function toScope(result) {
                var groupedMovies = groupResults(result);
                $scope.movieList = groupedMovies;
                $scope.loading = false;
            }

            MovieListService.getList(url)
                .then( toScope )
                .catch( function(error) {
                    console.log('error', error)
                });
       }
       else {
            console.log ("need an API key to do things...");
       }
    }

}

var movieDBControllers = angular.module('movieDBControllers', ['movieDBServices']);

// ba09f3c8c6c830377b422df18cfa833e
var settingsCtrl = function($scope, $rootScope, MovieListService, myMovieConfig) {

    var newApiKey = false;

    if ( $rootScope.apiKeyMovieDbApp ) {
        $scope.apiKey = $rootScope.apiKeyMovieDbApp;
        $scope.validateStatus = 1;
    }
    else {
        $scope.validateStatus = -1;
    }



    $scope.saveSettings = function() {

        var url = myMovieConfig.moviesEndpoint + '/popular?api_key='+$scope.apiKey;

        $scope.validateStatus = 0;

        MovieListService.getList(url)
            .then( toLocalStorage )
            .catch( function(error) {
                $scope.validateStatus = -1;
                console.log('We havent stored the new API KEY because of errors', error)
            });

        function toLocalStorage() {
            $rootScope.apiKeyMovieDbApp = $scope.apiKey;
            localStorage.setItem('apiKeyMovieDbApp', $scope.apiKey);
            $scope.validateStatus = 1;
            $scope.newApiKey = true;
        }

    }
};

movieDBControllers.controller('settingsController', settingsCtrl );

var movieListCtrl = generateFunctionController('Popular Movies', 'popular');
movieDBControllers.controller('MovieListController', movieListCtrl );

var movieUpcomingCtrl = generateFunctionController('Upcoming Movies', 'upcoming');
movieDBControllers.controller('MovieUpcomingController', movieUpcomingCtrl );

var movieNowPlayingCtrl = generateFunctionController('Now Playing Movies', 'now_playing');
movieDBControllers.controller('MovieNowPlayingController', movieNowPlayingCtrl );

var movieTopRatedCtrl = generateFunctionController('Top Rated Movies', 'top_rated');
movieDBControllers.controller('MovieTopRatedController', movieTopRatedCtrl );