angular
  .module('settingsModule')
  .controller('SettingsController', settingsCtrl );

function settingsCtrl( $scope, $rootScope, $q, $window, MovieListService, myMovieConfig ) {

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

        // just a url to check the connection w/ the API Key
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


    $scope.localMovies = function( section ) {

        $rootScope.dataMovies['popular'] = [];

        var url = myMovieConfig.moviesEndpoint + '/' + section + '?api_key='+$scope.apiKey;
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
                localStorage.setItem(section+'-MoviesData', sPopularMoviesData);
                sData = localStorage.getItem(section+'-MoviesData');
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


