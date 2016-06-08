 angular
  .module('settingsModule')
  .controller('SearchController', searchCtrl );


function searchCtrl( $scope, $rootScope ) {

	 $scope.filterSearch = function( section ) {

	 		var section = $scope.section;
			var searchValue = $scope.searchValue;
			var filteredData = $rootScope.dataMovies[section];

	    if ( searchValue ) {
	        searchValue = searchValue.toLowerCase();
	        filteredData = filteredData.filter(function( oMovie ) {
	            return ( oMovie.title.toLowerCase().indexOf(searchValue) != -1);
	        })
	    }
	    $scope.movieList = filteredData;

	}

}