// defining the app module of the project
var moviesDBApp = angular.module('moviesDBApp', [
    'ngRoute',
    'movieDBControllers',
    'movieDBDirectives'
]);

moviesDBApp.run(function($rootScope, $location) {

    var localPopularMovies = localStorage.getItem('popularMoviesData');
    $rootScope.dataMovies = [];

    if ( localPopularMovies ) {
        sData = localStorage.getItem('popularMoviesData');
        aData = JSON.parse(sData);
        $rootScope.dataMovies['popular'] = aData;
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

moviesDBApp.constant("myMovieConfig", {
    "moviesEndpoint": "https://api.themoviedb.org/3/movie",
    "apiKey": "ba09f3c8c6c830377b422df18cfa833e"
})

moviesDBApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'templates/movies.html',
            controller: 'MovieListController'
        })
        .when('/popular', {
            templateUrl: 'templates/movies.html',
            controller: 'MovieListController'
        })
        .when('/upcoming', {
            templateUrl: 'templates/movies.html',
            controller: 'MovieUpcomingController'
        })
        .when('/topRated', {
            templateUrl: 'templates/movies.html',
            controller: 'MovieTopRatedController'
        })
        .when("/nowPlaying", {
            templateUrl: "templates/movies.html",
            controller: "MovieNowPlayingController"
        })
        .when("/settings", {
            templateUrl: "templates/settings.html",
            controller: "settingsController"
        })
        .otherwise({
            redirectTo: '/popular'
        });
});