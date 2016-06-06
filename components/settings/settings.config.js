angular
  .module('settingsModule')
	.config(['$routeProvider', function config( $routeProvider ) {

	  $routeProvider
			.when("/settings", {
				templateUrl: 'components/settings/settings.template.html',
				controller: "SettingsController"
			})

	}]);