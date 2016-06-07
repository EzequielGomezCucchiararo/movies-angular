angular.module('moviesDBApp')
    .run( function( $rootScope, $location ) {

        localStorage.setItem('apiKeyMovieDbApp', "ba09f3c8c6c830377b422df18cfa833e");

        // ba09f3c8c6c830377b422df18cfa833e
        var localPopularMovies = localStorage.getItem('popular-MoviesData');
        var localUpcomingMovies = localStorage.getItem('upcoming-MoviesData');
        var localNowPlayingMovies = localStorage.getItem('now_playing-MoviesData');
        var localTopRatedMovies = localStorage.getItem('top_rated-MoviesData');

        $rootScope.dataMovies = [];

        if ( localPopularMovies ) {
            aData = JSON.parse(localPopularMovies);
            $rootScope.dataMovies['popular'] = aData;
        }

        if ( localUpcomingMovies ) {
            aData = JSON.parse(localUpcomingMovies);
            $rootScope.dataMovies['upcoming'] = aData;
        }

        if ( localNowPlayingMovies ) {
            aData = JSON.parse(localNowPlayingMovies);
            $rootScope.dataMovies['now_playing'] = aData;
        }

        if ( localTopRatedMovies ) {
            aData = JSON.parse(localTopRatedMovies);
            $rootScope.dataMovies['top_rated'] = aData;
        }

        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            var apiKey;
            if ( $rootScope.apiKeyMovieDbApp == null ) {
                apiKey = localStorage.getItem('apiKeyMovieDbApp');
                if ( apiKey ) {
                    $rootScope.apiKeyMovieDbApp = apiKey;
                }
                else {
                    $location.path( "/settings" );
                }
            }
        });

    });