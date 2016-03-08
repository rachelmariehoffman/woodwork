angular.module('starter.controllers', [])

.controller('LoginCtrl', ['$scope', '$state', 'UserService', '$ionicHistory', '$window',
    function($scope, $state, UserService, $ionicHistory, $window) {
        $scope.user = {};
        $scope.loginSubmitForm = function(form) {
            if (form.$valid) {
                UserService.login($scope.user)
                .then(function(response) {
                    if (response.status === 200) {
                        //Should return a token
                        console.log(response);
                        $window.localStorage["userID"] = response.data.userId;
                        $window.localStorage['token'] = response.data.id;
                        $ionicHistory.nextViewOptions({
                          historyRoot: true,
                          disableBack: true
                        }); 
                        $state.go('lobby');
                    } else if (response.status === 401) {
                        alert ("Incorrect username or password.");
                    } else if (response.data === null) {
                        alert ("The connection with the server was unsuccessful.");
                    } else {
                        alert ("Something went wrong, try again.");
                    }
                });
            } //end if
        }; //end $scope.loginSubmitForm
    } //end function
]) //end LoginCtrl

.controller('RegisterCtrl', ['$scope', '$state', 'UserService', '$ionicHistory', '$window',
    function($scope, $state, UserService, $ionicHistory, $window) {
        $scope.user = {};
        $scope.repeatPassword = {};
        $scope.registerSubmitForm = function(form) {
            if (form.$valid) {
                if ($scope.user.password != $scope.repeatPassword.password) {
                    alert ("Passwords do not match.");
                } else {
                    UserService.create($scope.user)
                    .then(function(response) {
                        if (response.status === 200) {
                            console.log(response);
                            $ionicHistory.nextViewOptions({
                               historyRoot: true,
                               disableBack: true
                            });
                            loginAfterRegister();
                        } else {
                            alert("Something went wrong, try again.");
                        } 
                    }, function(response) {
                        if (response.status === 422) {
                            console.log(response);
                            alert("Email is already registered.");
                        } else if (response.data === null) {
                            console.log(response);
                            alert("The connection with the server was unsuccessful.");
                        } else {
                            console.log(response);
                            alert("Something went wrong, try again.");
                        }   
                    });
                } //end else
            }
        }; //end registerForm
        function loginAfterRegister() {
            UserService.login($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    $window.localStorage["userID"] = response.data.userId;
                    $window.localStorage['token'] = response.data.id;
                    $ionicHistory.nextViewOptions({
                       historyRoot: true,
                       disableBack: true
                    });
                    $state.go('lobby');
                } else {
                    // invalid response
                    $state.go('landing');
                }
            }, function(response) {
                // something went wrong
                console.log(response);
                $state.go('landing');
            }); //end UserService.login
        } //end loginAfterRegister
    } //end function
]) //end RegisterCtrl

.controller('LobbyCtrl',['$scope', '$state', '$ionicHistory', 'UserService', '$window', 
    function($scope, $state, $ionicHistory, UserService, $window) {
        $scope.logout = function() {
             UserService.logout($window.localStorage.token)
             .then(function(response) {
                //The successful code for logout is 204
                if(response.status === 204) {
                    $ionicHistory.nextViewOptions({
                      historyRoot: true,
                      disableBack: true
                    });
                    $state.go('landing');
                } else {
                     alert("Could not logout at this moment, try again.");
                }
            }, function(response) {
                alert("Could not logout at this moment, try again.");
            });
        };
    }
]);