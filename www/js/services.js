angular.module('gifu.services', [])
.factory('Stations', function ($http) {
	return {
		search: function () {
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
			];
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