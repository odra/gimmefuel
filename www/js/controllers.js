angular.module('gifu.controllers', ['ionic', 'gifu.services'])
.controller('AppCtrl', function ($scope) {

})
.controller('StationsCtrl', function ($scope, Stations) {
	$scope.stations = Stations.search();
})
.controller('StationCtrl', function ($scope, $stateParams, Stations) {
	$scope.station = Stations.get($stateParams.id);
});