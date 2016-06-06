 angular
  .module('settingsModule')
  .controller('SearchController', searchCtrl );


function searchCtrl( $scope, $rootScope ) {

	 $scope.filterSearch = function( section ) {

			section = $scope.section;
	 		console.log ("estamos buscandoi en " + section);
	    if ($scope.searchValue) {
	        var searchValue = $scope.searchValue.toLowerCase();
	        var currentData = $rootScope.dataMovies[$scope.section]
	        var filteredData = currentData.filter(function( oMovie ) {
	            return ( oMovie.title.toLowerCase().indexOf(searchValue) != -1);
	        })
	        $rootScope.dataMovies[$scope.section] = filteredData;
	    }
	    else {
	        sData = localStorage.getItem(section + '-MoviesData');
	        aData = JSON.parse(sData);
	        $rootScope.dataMovies[section] = aData;
	    }
	    var groupedMovies = groupResults( $rootScope.dataMovies[$scope.section] );
	    $scope.movieList = groupedMovies;

	}

}