angular.module('starter.controllers', [])

.controller('LoginCtrl', ['$scope', '$state', 'UserService', '$ionicHistory',
    function($scope, $state, UserService, $ionicHistory) {
        $scope.user = {};
        $scope.loginSubmitForm = function(form) {
            if (form.$valid) {
                UserService.login($scope.user)
                .then(function(response) {
                    if (response.status === 200) {
                        //Should return a token
                        console.log(response);
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

.controller('RegisterCtrl', ['$scope', '$state', 'UserService', '$ionicHistory',
    function($scope, $state, UserService, $ionicHistory) {
        $scope.user = {};
        $scope.repeatPassword = {};
        $scope.registerForm = function(form) {
            if ($scope.user.password != $scope.repeatPassword.password) {
                alert ("Passwords do not match");
            } else {
                UserService.create($scope.user)
                .then(function(response) {
                   if (response === 200) {
                     console.log(response);
                     $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableBack: true
                     });
                   } 
                });
            } //end else
        };
    } //end function
]); //end RegisterCtrl