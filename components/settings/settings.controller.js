angular
  .module('settingsModule')
  .controller('SettingsController', settingsCtrl );

function settingsCtrl( $scope, $rootScope, $q, remoteBigListMovies) {

    $scope.localMovies = function( section ) {
        console.log (section);
        remoteBigListMovies.getList( section )
            .then( saveLocalStorage.bind(null, section)  )
            .then( toRootScope.bind(null, section) )
    }

    function toRootScope(section, data) {
        $rootScope.dataMovies[section] = data;
    }
};

function saveLocalStorage (section, data) {
    var sMoviesData = JSON.stringify(data);
    localStorage.setItem(section+'-MoviesData', sMoviesData);
    return data;
}