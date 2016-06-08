angular.module('movieDBServices')
    .factory('remoteListMovies', function($http) {
        //
        return {
        	getList : getList
        }

        function getList(url) {
            return $http.get(url);
        };
    })