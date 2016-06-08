var movieListCtrl = generateFnCtrl('Popular Movies', 'popular');
var movieUpcomingCtrl = generateFnCtrl('Upcoming Movies', 'upcoming');
var movieNowPlayingCtrl = generateFnCtrl('Now Playing Movies', 'now_playing');
var movieTopRatedCtrl = generateFnCtrl('Top Rated Movies', 'top_rated');

angular
    .module('movieDBControllers', ['movieDBServices'])
        .controller('MovieListController', movieListCtrl )
        .controller('MovieUpcomingController', movieUpcomingCtrl )
        .controller('MovieNowPlayingController', movieNowPlayingCtrl )
        .controller('MovieTopRatedController', movieTopRatedCtrl );

function generateFnCtrl( title, sectionId ) {

    return function($scope, $rootScope, listMovies ) {

        $scope.title = title;
        $scope.section = sectionId;

        listMovies.getList(sectionId)
            .then( function(data) {
                $rootScope.dataMovies[sectionId] = data;
                $scope.movieList = data;
            })

    }
}