var movieListCtrl = generateFnCtrl('Popular Movies', 'popular');
var movieUpcomingCtrl = generateFnCtrl('Upcoming Movies', 'upcoming');
var movieNowPlayingCtrl = generateFnCtrl('Now Playing Movies', 'now_playing');
var movieTopRatedCtrl = generateFnCtrl('Top Rated Movies', 'top_rated');

angular
    .module('movieDBControllers', ['movieDBServices'])
    .controller('MovieListController', movieListCtrl )
    .controller('MovieUpcomingController', movieUpcomingCtrl )
    .controller('MovieNowPlayingController', movieNowPlayingCtrl )
    .controller('MovieTopRatedController', movieTopRatedCtrl );

function groupResults (movies) {

    var sizeGroups = 6;
    var groupedMovies = movies.reduce( function( acc, current, index ){
        index%sizeGroups? acc[acc.length-1].push(current) : acc.push([current]);
        return acc;
    }, [])

    return groupedMovies;
}

function generateFnCtrl( title, apiUrl ) {

    return function($scope, $rootScope, MovieListService, myMovieConfig) {

        var apiKey = $rootScope.apiKeyMovieDbApp;
        $scope.title = title;
        $scope.section = apiUrl;

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