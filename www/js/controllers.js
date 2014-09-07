angular.module('gifu.controllers', ['ionic', 'ngCordova', 'gifu.services'])
.controller('AppCtrl', function ($scope) {

})
.controller('StationsCtrl', function ($scope, $location, $cordovaGeolocation, Coords, Stations) {
	$scope.msg = 'Loading...';
	$scope.error = false;

	$cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
    	var lat  = position.coords.latitude
    	var lng = position.coords.longitude
    	Coords.lat = lat;
    	Coords.lng = lng;
    	Stations.search(Coords.lat + ',' + Coords.lng, function (data) {
		if (data.length == 0) {
			$scope.error = true;
			$scope.msg = 'There are no nearby gas stations.';
			return;
		}
		$scope.msg = '';
		$scope.stations = data;
	});
    }, function(err) {
    	alert('error');
    });
    
	$scope.setStation = function () {
		Stations.station = $scope.stations[this.$index];
		$location.path('/station');
	};
})
.controller('StationCtrl', function ($scope, $stateParams, Stations) {
	$scope.station = Stations.station;
});