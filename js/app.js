// defining the app module of the project
var moviesDBApp = angular.module('moviesDBApp', [
    'ngRoute',
    'settingsModule',
    'searchModule',
    'movieDBControllers'
]);

moviesDBApp.constant("appConfig", {
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
        .otherwise({
            redirectTo: '/popular'
        });

});