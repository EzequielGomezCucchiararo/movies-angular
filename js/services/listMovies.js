angular.module('movieDBServices')
    .service('listMovies', function($q, appConfig, $rootScope, remoteListMovies) {

        this.getList = function (section) {

            var localData = getLocalStorage(section);
            var url = appConfig.moviesEndpoint + '/' + section + '?api_key=' + $rootScope.apiKey;

            if (localData) {
            	return $q(function(resolve, reject) {
            		resolve(localData);
				})
            } else {
                return remoteListMovies.getList(url)
					.then( filterResults )
                	.then( saveLocalStorage.bind(null, section) )
            }
        }

    })

function filterResults(oData) {
    return oData.data.results;
}

function saveLocalStorage(section, data) {
    var sMoviesData = JSON.stringify(data);
    localStorage.setItem(section + '-MoviesData', sMoviesData);
    return data;
}

function getLocalStorage(section) {
    var sMoviesData = localStorage.getItem(section + '-MoviesData');
    return JSON.parse(sMoviesData);
}