function groupResults (result) {

    var sizeGroups = 6;
    var movies = result.data.results;
    var groupedMovies = movies.reduce( function( acc, current, index ){
        index%sizeGroups? acc[acc.length-1].push(current) : acc.push([current]);
        return acc;
    }, [])

    return groupedMovies;

}

angular.module('movieDBControllers', [])
    .controller('settingsController', function($scope) {


    })
    .controller('MovieListController', function($scope, $rootScope, movieListService, myMovieConfig) {

        console.log ( $rootScope.apiKey );
        console.log ( "sss" );
        $scope.loading = true;
        $scope.title = 'Popular Movies'
        var url = myMovieConfig.moviesEndpoint + '/popular?api_key=' + myMovieConfig.apiKey;

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
    })
    .controller('MovieUpcomingController', function($scope, $rootScope, movieListService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Upcoming Movies'
        var url = myMovieConfig.moviesEndpoint + '/upcoming?api_key=' + myMovieConfig.apiKey;

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

    })
    .controller('MovieNowPlayingController', function($scope, $rootScope, movieListService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Now Playing Movies'
        var url = myMovieConfig.moviesEndpoint + '/now_playing?api_key=' + myMovieConfig.apiKey;

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

    })
    .controller('MovieTopRatedController', function($scope, $rootScope, movieListService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Top Rated Movies'
        var url = myMovieConfig.moviesEndpoint + '/top_rated?api_key=' + myMovieConfig.apiKey;

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

    });