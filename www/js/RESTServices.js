angular.module('RESTConnection', [])

.constant('ENDPOINT_URL', 'https://woodwork-backend-rhoffmanssf.c9users.io/api/')

.service('UserService', ['$http', 'ENDPOINT_URL',
    function($http, ENDPOINT_URL) {
        var service = this,
            path = 'WWUsers/';

        function getUrl() {
            return ENDPOINT_URL + path;
        }
        service.create = function(user) {
            return $http.post(getUrl(), user);
        };
        service.login = function(user) {
            user["ttl"] = 1209600000;
            return $http.post(getUrl() + "login", user);
        };
        service.logout = function(token) {
            return $http({
                url: getUrl() + "logout",
                method: "POST",
                headers: {
                    'Authorization': token
                }
            });
        }; //end service.logout
    } //end function
]) //end UserService

.service('SchedService', ['$http', 'ENDPOINT_URL',
    function($http, ENDPOINT_URL) {
        var service = this,
            path = 'Schedule/';
        function getUrl() {
            return ENDPOINT_URL + path;
        }
        service.create = function(answer, token) {
            return $http({
                url: getUrl(),
                method: "POST",
                data: JSON.stringify(answer),
                headers: {
                    'Authorization': token
                }
            });
        };
        service.all = function(userID, token) {
            return $http.get(getUrl()+"?filter[where][userID]="+userID,{
                params: { access_token: token }
            });    
        };
    } //end function
]) //end SchedService

.service('GameService', ['$http', 'ENDPOINT_URL',
    function($http, ENDPOINT_URL) {
        var service = this,
            path = 'Game/';
        function getUrl() {
            return ENDPOINT_URL + path;
        }
        service.create = function(answer, token) {
            return $http({
                url: getUrl(),
                method: "POST",
                data: JSON.stringify(answer),
                headers: {
                    'Authorization': token
                }
            });
        };
        service.all = function(userID, token) {
            return $http.get(getUrl()+"?filter[where][userID]="+userID,{
                params: { access_token: token }
            });    
        };
    } //end function
]) //end GameService

.service('OppService', ['$http', 'ENDPOINT_URL',
    function($http, ENDPOINT_URL) {
        var service = this,
            path = 'Opponents/';
         function getUrl() {
            return ENDPOINT_URL + path;
        }
        service.create = function(answer, token) {
            return $http({
                url: getUrl(),
                method: "POST",
                data: JSON.stringify(answer),
                headers: {
                    'Authorization': token
                }
            });
        };
        service.all = function(userID, token) {
            return $http.get(getUrl()+"?filter[where][userID]="+userID,{
                params: { access_token: token }
            });    
        };       
    } //end function
]); //end OppService