angular.module('gifu.services', [])
.factory('Push', function ($http) {
	var apiToken = '/RXnNemjOGFHrzOATnXusIwYVaAw8nT4K2X4Ac3OnJ+TJxGBWH91d1WqbGvyG8VQnC+yzNotLCjPDpSYIaw+pA==';
	return {
		addDevice: function (token, callback) {
			$http.post('http://gifu.goldarkapi.com/push/devices', {token: token, platform: 'android'}, {headers: {'X-Api-Token': apiToken}})
			.success(function (data) {
				callback(data)
			})
			.error(function (data) {
				callback(data);
			});
		},
		sendMessage: function (deviceId, message, callback) {
			$http.post('http://gifu.goldarkapi.com/push/devices/' + deviceId + '/messages', {message: message}, {headers: {'X-Api-Token': apiToken}})
			.success(function (data) {
				callback(data)
			})
			.error(function (data) {
				callback(data);
			});
		}
	}
})
.factory('Fuel', function ($http) {
	return {
		isInDanger: function (callback) {
			$http.get('https://api.moj.io/v1/Vehicles', {headers: {'MojioAPIToken': 'b755db9e-ea2e-4789-9e49-00d5796ad91e'}})
			.success(function (data) {
				if (data.Data[0].FuelLevel <= 15) {
					callback(true);
				} else {
					callback(false);
				}
			})
			.error(function (data) {
				callback(false);
			});
		}
	}
})
.factory('Coords', function ($http) {
	return {
		lat: 0,
		lng: 0
	}
})
.factory('Stations', function ($http) {
	return {
		station: {},
		search: function (coords, callback) {
			var url = 'https://cs6-nbwa.navbuilder.nimlbs.net/lws/api/v2/search/json?'
			url += 'search_center=' + coords + '&query=gas+station&apikey=%20RwKEdt2mXQLNz58W7cuVJDzLxP5JVcnkSwnLf9rz&pid=411164';
			$http.get(url)
			.success(function (data) {
				var output = [];
				var places = data.places;
				for (var i = 0; i < places.length; i++) {
					var place = places[i];
					JSON.stringify(place);
					output.push({
						name: place.name,
						distance: (parseFloat(place.distance) / 1000).toFixed(2),
						city: location.city,
						loc: {
							lat: place.location.coordinate.latitude,
							lng: place.location.coordinate.longitude
						},
						address: place.location.formatted_address,
						currency: '$',
						phone: (place.phones.length > 0 ? '(' + place.phones[0].area + ')'  + ' ' + place.phones[0].number: '')
					});
				}
				callback(output);
			})
			.error(function (data) {
				callback([]);
			});
			/*
			return [
				{
					'id': 1,
					'logo': 'http://lorempixel.com/160/160',
					'name': 'Costco',
					'address': '22 S Marting King Blvd',
					'currency': '$',
					'distance': 6.88,
					'phone': '(702) 252 4644',
					'prices': {
						'unleaded': 3.45,
						'midgrade': 3.59,
						'premium': 3.69,
						'diesel': 3.89
					}
				},
				{
					'id': 2,
					'logo': 'http://lorempixel.com/160/160',
					'name': 'Arco',
					'address': '6460 S Decatur Blvd',
					'currency': '$',
					'distance': 6.09,
					'phone': '(702) 252 4644',
					'prices': {
						'unleaded': 3.45,
						'midgrade': 3.59,
						'premium': 3.69,
						'diesel': 3.89
					}
				},
				{
					'id': 3,
					'logo': 'http://lorempixel.com/160/160',
					'name': 'Quick Stop',
					'address': '2083 Fremont St',
					'currency': '$',
					'distance': 7.48,
					'phone': '(702) 252 4644',
					'prices': {
						'unleaded': 3.45,
						'midgrade': 3.59,
						'premium': 3.69,
						'diesel': 3.89
					}
				}
			];*/
		},
		get: function (id) {
			var stations = this.search();
			for (var i = 0; i < stations.length; i++) {
				if (stations[i].id == id) {
					return stations[i];
				}
			}
			return null;
		}
	};
});