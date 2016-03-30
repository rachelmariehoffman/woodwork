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
                            }
                            else if (response.status === 401) {
                                alert("Incorrect username or password.");
                            }
                            else if (response.data === null) {
                                alert("The connection with the server was unsuccessful.");
                            }
                            else {
                                alert("Something went wrong, try again.");
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
                        alert("Passwords do not match.");
                    }
                    else {
                        UserService.create($scope.user)
                            .then(function(response) {
                                if (response.status === 200) {
                                    console.log(response);
                                    $ionicHistory.nextViewOptions({
                                        historyRoot: true,
                                        disableBack: true
                                    });
                                    loginAfterRegister();
                                }
                                else {
                                    alert("Something went wrong, try again.");
                                }
                            }, function(response) {
                                if (response.status === 422) {
                                    console.log(response);
                                    alert("Email is already registered.");
                                }
                                else if (response.data === null) {
                                    console.log(response);
                                    alert("The connection with the server was unsuccessful.");
                                }
                                else {
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
                        }
                        else {
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

.controller('LobbyCtrl', ['$scope', '$state', '$ionicHistory', 'UserService', '$window',
        function($scope, $state, $ionicHistory, UserService, $window) {
            $scope.logout = function() {
                UserService.logout($window.localStorage.token)
                    .then(function(response) {
                        //The successful code for logout is 204
                        if (response.status === 204) {
                            $ionicHistory.nextViewOptions({
                                historyRoot: true,
                                disableBack: true
                            });
                            $state.go('landing');
                        }
                        else {
                            alert("Could not logout at this moment, try again.");
                        }
                    }, function(response) {
                        alert("Could not logout at this moment, try again.");
                    });
            }; //end $scope.logout
            $scope.scheduleGo = function() {
                $state.go('schedule');
            };
            $scope.opponentsGo = function() {
                $state.go('opponents');
            };
            $scope.statisticsGo = function() {
                $state.go('statistics');
            };
        } //end function
    ]) //end LobbyCtrl

.controller('SchedCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'gamesFact', 'oppsFact',
    function($scope, $state, $stateParams, $ionicHistory, gamesFact, oppsFact) {
        $scope.games = gamesFact.gamesArray;
        $scope.opps = oppsFact.oppsArray;
        $scope.newGame = {};
        $scope.addGame = function(form) {
            if (!$scope.newGame.date || $scope.newGame.date === '') { 
                alert("Please enter a game date."); 
            } else if (!$scope.newGame.time || $scope.newGame.time === '') { 
                alert("Please enter a game time."); 
            } else if (!$scope.newGame.opponent || $scope.newGame.opponent === '') { 
                alert("Please enter an opponent."); 
            } else {
                $scope.games.push($scope.newGame);
                $scope.newGame = {};
                $state.go('schedule');
            }
        }; //end $scope.addGame
        $scope.addGameGo = function() {
            $state.go('addGame');  
        };
    } //end function
]) //end SchedCtrl

.controller('GameCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'gamesFact', 'resultsFact', 'UserService', '$window',
    function($scope, $state, $stateParams, $ionicHistory, gamesFact, resultsFact, UserService, $window) {
        $scope.games = gamesFact.gamesArray;
        $scope.game = gamesFact.gamesArray[$stateParams.id];
        
        $scope.newNote = [];
        $scope.newOutcome = [];
        
        $scope.results = resultsFact.resultsArray;
        $scope.goalsForTotal = 0;
        $scope.goalsAgainstTotal = 0;
        $scope.outcomesTotal = 0;
        $scope.goalsForAverage = ($scope.goalsForTotal / $scope.outcomesTotal).toFixed(1);
        $scope.goalsAgainstAverage = ($scope.goalsAgainstTotal / $scope.outcomesTotal).toFixed(1);
        
        
        $scope.logout = function() {
            UserService.logout($window.localStorage.token)
                .then(function(response) {
                    //The successful code for logout is 204
                    if (response.status === 204) {
                        $ionicHistory.nextViewOptions({
                            historyRoot: true,
                            disableBack: true
                        });
                        $state.go('landing');
                    }
                    else {
                        alert("Could not logout at this moment, try again.");
                    }
                }, function(response) {
                    alert("Could not logout at this moment, try again.");
                });
        }; //end $scope.logout
        
        $scope.addNote = function(form) {
            if (!$scope.newNote.gameNotes || $scope.newNote.gameNotes === '') { 
                alert("Please enter game notes."); 
            } else {
                if ($scope.game.notes === undefined)
                    $scope.game.notes = [];
                    $scope.game.notes.push($scope.newNote);
                    console.log($scope.newNote);
                    console.log($scope.game.notes);
                    $scope.newNote = [];
            }
        }; //end $scope.addNote
        
        // $scope.addStats = function() {
        //     $scope.results.goalsForTotal = 100;
        //     // $scope.goalsForTotal += $scope.newOutcome.goalsFor;
        //     // $scope.goalsAgainstTotal += $scope.newOutcome.goalsAgainst;
        //     // $scope.outcomesTotal ++;  
        // };
        
        $scope.addOutcome = function(outcome) {
            if (!Number.isInteger($scope.newOutcome.goalsFor)) {    
                alert("Please enter the number of goals for."); 
            } else if (!Number.isInteger($scope.newOutcome.goalsAgainst)) {    
                alert("Please enter the number of goals against.");
            } else if ($scope.game.outcome === undefined) {
                
                if ($scope.newOutcome.goalsFor > $scope.newOutcome.goalsAgainst) {
                    $scope.newOutcome.result = "Win";
                    
                    // $scope.goalsForTotal = 100;
                    // $scope.goalsAgainstTotal = 50;
                    // $scope.outcomesTotal = 2;
                    
                    $scope.goalsForTotal = $scope.goalsForTotal + $scope.newOutcome.goalsFor;
                    $scope.goalsAgainstTotal = $scope.goalsAgainstTotal + $scope.newOutcome.goalsAgainst;
                    $scope.outcomesTotal = $scope.outcomesTotal + 1;
                    $scope.goalsForAverage = ($scope.goalsForTotal / $scope.outcomesTotal).toFixed(1);
                    $scope.goalsAgainstAverage = ($scope.goalsAgainstTotal / $scope.outcomesTotal).toFixed(1);
                    
                    $scope.results.push($scope.goalsForTotal);
                    $scope.results.push($scope.goalsAgainstTotal);
                    $scope.results.push($scope.outcomesTotal);

                    console.log($scope.goalsForTotal);
                    console.log($scope.goalsAgainstTotal);
                    console.log($scope.outcomesTotal + 1);
                    
                    console.log($scope.newOutcome.goalsFor);
                    console.log($scope.newOutcome.goalsAgainst);

                    console.log($scope.goalsForAverage);
                    console.log($scope.goalsAgainstAverage);
                    
                    $scope.game.outcome = [];
                    $scope.game.outcome.pop();
                    $scope.game.outcome.push($scope.newOutcome);
                    $scope.newOutcome = [];
                    $scope.outcomeHide = true;
                    
                } else if ($scope.newOutcome.goalsFor < $scope.newOutcome.goalsAgainst) {
                    $scope.newOutcome.result = "Loss";
                    $scope.game.outcome = [];
                    $scope.game.outcome.pop();
                    $scope.game.outcome.push($scope.newOutcome);
                    $scope.newOutcome = [];
                    $scope.outcomeHide = true;
                    
                } else if ($scope.newOutcome.goalsFor === $scope.newOutcome.goalsAgainst) {
                    $scope.newOutcome.result = "Tie";
                    $scope.game.outcome = [];
                    $scope.game.outcome.pop();
                    $scope.game.outcome.push($scope.newOutcome);
                    $scope.newOutcome = [];
                    $scope.outcomeHide = true;
                    
                }
            }
        }; //end $scope.addOutcome
        
    } //end function
]) //end GameCtrl

// .controller('StatsCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'gamesFact', 'resultsFact', 'UserService', '$window',
//     function($scope, $state, $stateParams, $ionicHistory, gamesFact, resultsFact, UserService, $window) {
        
//         $scope.results = resultsFact.resultsArray;
//         $scope.goalsForTotal = $scope.results.goalsForTotal;
//         $scope.goalsAgainst = $scope.results.goalsAgainstTotal;
        
//         $scope.goalsForAverage = $scope.results.goalsForTotal / $scope.results.outcomesTotal;
//         $scope.goalsAgainstAverage = $scope.results.goalsAgainstTotal / $scope.results.outcomesTotal;
//     }
// ])

.controller('OppsCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'gamesFact', 'oppsFact',
    function($scope, $state, $stateParams, $ionicHistory, gamesFact, oppsFact) {
        $scope.opps = oppsFact.oppsArray;
        $scope.opp = oppsFact.oppsArray[$stateParams.id];
        $scope.newOpp = {};
        $scope.addOpp = function(form) {
            $scope.opps.push($scope.newOpp.name);
            $scope.newOpp = {};
        };
    }
])

.controller('TeamCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'gamesFact', 'oppsFact',
    function($scope, $state, $stateParams, $ionicHistory, gamesFact, oppsFact) {
        $scope.opps = oppsFact.oppsArray;
        $scope.opp = oppsFact.oppsArray[$stateParams.id];
        $scope.games = gamesFact.gamesArray;
        $scope.game = gamesFact.gamesArray[$stateParams.id];
        
        $scope.filteredGames = $scope.games.filter(function(obj) {
            return obj.opponent === $scope.opp;
        }); 
    }
]);