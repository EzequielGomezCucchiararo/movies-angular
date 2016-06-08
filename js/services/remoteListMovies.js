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
    .factory('remoteBigListMovies', function($q, $rootScope, $http, appConfig) {

 				return {
        	getList : getBigList
        }

        function joinResults(aResults) {
            return aResults.reduce(function(acc, current, index) {
                return acc.concat(current.data.results);
            }, [])
        }

        function getBigList(section) {

            $rootScope.dataMovies[section] = [];

            console.log ("here!!");

            var url = appConfig.moviesEndpoint + '/' + section + '?api_key=' + $rootScope.apiKey;
            url += "&page=<%PAGE-NUMBER%>"

            var getPromise = function(pageNumber) {
                var myPagedUrl = url.replace("<%PAGE-NUMBER%>", pageNumber);
                return $http.get(myPagedUrl);
            };

            var urlPromises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(getPromise);

            return $q.all(urlPromises).then(joinResults);

        };

    });