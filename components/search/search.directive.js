angular.module('searchModule', [])
    .directive('searchMoviesBox', function() {
        return {
            restrict: 'AE', // usage of the directive: E -> element
            templateUrl: 'components/search/search.template.html',
            controller: 'SearchController'
        };
    });