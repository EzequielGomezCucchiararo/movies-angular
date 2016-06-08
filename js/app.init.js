angular.module('moviesDBApp')
    .run(function($rootScope, appConfig, $location) {

        $rootScope.dataMovies = [];
        $rootScope.apiKey = appConfig.apiKey;

    });