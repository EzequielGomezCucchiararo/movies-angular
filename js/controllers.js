function groupResults (movies) {

    var sizeGroups = 6;
    var groupedMovies = movies.reduce( function( acc, current, index ){
        index%sizeGroups? acc[acc.length-1].push(current) : acc.push([current]);
        return acc;
    }, [])

    return groupedMovies;
}

function generateFunctionController( title, apiUrl ) {

    return function($scope, $rootScope, MovieListService, myMovieConfig) {

        var apiKey = $rootScope.apiKeyMovieDbApp;
        $scope.title = title;

        $scope.filterSearch = function() {
            if ($scope.searchValue) {
                var searchValue = $scope.searchValue.toLowerCase();
                var currentData = $rootScope.dataMovies[apiUrl]
                var filteredData = currentData.filter(function( oMovie ) {
                    console.log (oMovie.title);
                    console.log ($scope.searchValue);
                    return ( oMovie.title.toLowerCase().indexOf(searchValue) != -1);
                })
                $rootScope.dataMovies[apiUrl] = filteredData;
            }
            else {
                sData = localStorage.getItem('popularMoviesData');
                aData = JSON.parse(sData);
                $rootScope.dataMovies['popular'] = aData;
            }
            var groupedMovies = groupResults( $rootScope.dataMovies[apiUrl] );
            $scope.movieList = groupedMovies;
        }

        if ( $rootScope.dataMovies[apiUrl] ) {
            var groupedMovies = groupResults( $rootScope.dataMovies[apiUrl] );
            $scope.movieList = groupedMovies;
            console.log ( apiUrl + " movies read from localStorage")
            console.log ( $scope.movieList );
            return;
        }

        if ( apiKey ) {

            console.log ("let's go and load some popilar movues");
            $scope.loading = true;

            var url = myMovieConfig.moviesEndpoint + '/' + apiUrl + '?api_key=' + apiKey;

            function toScope(result) {
                var groupedMovies = groupResults(result.data.results);
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
var settingsCtrl = function($scope, $rootScope, $q, $window, MovieListService, myMovieConfig) {

    var newApiKey = false;

    if ( $rootScope.apiKeyMovieDbApp ) {
        $scope.apiKey = $rootScope.apiKeyMovieDbApp;
        $scope.validateStatus = 1;
    }
    else {
        $scope.validateStatus = -1;
    }


    $scope.reloadPage = function(){
        console.log("reloading....")
        $window.location.reload();
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


    $scope.localPopularMovies = function() {

        $rootScope.dataMovies['popular'] = [];

        var url = myMovieConfig.moviesEndpoint + '/popular?api_key='+$scope.apiKey;
        url += "&page=<%PAGE-NUMBER%>"
        var getPromise = function( pageNumber ) {
            var myPagedUrl = url.replace("<%PAGE-NUMBER%>",pageNumber);
            return MovieListService.getList(myPagedUrl)
        };
        var urlPromises = [1,2,3,4,5,6,7,8,9,10].map(getPromise);

        $q.all( urlPromises )
            .then( joinResults )
            .then (function(processedValues){
                var sData, aData;
                var sPopularMoviesData = JSON.stringify(processedValues);
                localStorage.setItem('popularMoviesData', sPopularMoviesData);
                sData = localStorage.getItem('popularMoviesData');
                aData = JSON.parse(sData);
                $rootScope.dataMovies['popular'] = aData;

                console.log ($rootScope.dataMovies['popular']);
            });

        function joinResults ( aResults ) {
            return aResults.reduce(function(acc, current, index){
                return acc.concat(current.data.results);
            },[])
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