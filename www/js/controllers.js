angular.module('gifu.controllers', ['ionic', 'ngCordova', 'gifu.services'])
.controller('AppCtrl', function ($scope) {

})
.controller('StationsCtrl', function ($scope, $location, $cordovaGeolocation, Coords, Stations, Fuel, Push, localStorageService) {
	$scope.msg = 'Loading...';
	$scope.error = false;

	if (!localStorageService.get('deviceId')) {
		var timer = setInterval(function () {
		if (pushToken) {
			Push.addDevice(pushToken, function (data) {
				localStorageService.set('deviceId', data.id);
				clearInterval(timer);
			});
		}
		}, 1000);
	}
	
	Fuel.isInDanger(function (data) {
		if (data) {
			if (localStorageService.get('deviceId')) {
				Push.sendMessage(localStorageService.get('deviceId'), 'You are low on gas.', function (data) {
					alert(JSON.stringify(data));
				});
			}
		}
	});
	/*
	setInterval(function () {
		Fuel.isInDanger(function (data) {
			if (data) {
				
				
				if (pushToken) {
					Push.addDevice(pushToken, function (data) {
						alert(JSON.stringify(data));
					});
				}
				
			}
		});
	}, 1000);*/

	Coords.lat = 36.109754;
    Coords.lng = -115.173873;
    Stations.search(Coords.lat + ',' + Coords.lng, function (data) {
		if (data.length == 0) {
			$scope.error = true;
			$scope.msg = 'There are no nearby gas stations.';
			return;
		}
		$scope.msg = '';
		$scope.stations = data;
	});

	/*
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
    	Coords.lat = 36.109754;
    	Coords.lng = -115.173873;
    	Stations.search(Coords.lat + ',' + Coords.lng, function (data) {
			if (data.length == 0) {
				$scope.error = true;
				$scope.msg = 'There are no nearby gas stations.';
				return;
			}
			$scope.msg = '';
			$scope.stations = data;
		});
    });*/

	$scope.setStation = function () {
		Stations.station = $scope.stations[this.$index];
		$location.path('/station');
	};
})
.controller('StationCtrl', function ($scope, $stateParams, Stations) {
	$scope.station = Stations.station;
});