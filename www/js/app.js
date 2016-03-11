angular.module('starter', ['ionic', 'starter.controllers', 'RESTConnection'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: 'templates/landing.html',
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
        })
        .state('lobby', {
            url: '/lobby',
            templateUrl: 'templates/lobby.html',
            controller: 'LobbyCtrl'
        })
        .state('schedule', {
            url: '/schedule',
            templateUrl: 'templates/schedule.html',
            controller: 'SchedCtrl'
        })
        .state('game', {
            url: '/game/{id}',
            templateUrl: 'templates/game.html',
            controller: 'GameCtrl'
        })
        .state('opponents', {
            url: '/opponents',
            templateUrl: 'templates/opponents.html',
            controller: 'OppsCtrl'
        })
        .state('team', {
            url: '/team/{id}',
            templateUrl: 'templates/team.html',
            controller: 'TeamCtrl'
        })
        .state('statistics', {
            url: '/statistics',
            templateUrl: 'templates/statistics.html',
            controller: 'GameCtrl'
        });
})

.factory('gamesFact', [
    function() {
        var g = {
            gamesArray: [
                {
                    date: 'May 3',
                    time: '6:00pm',
                    opponent: 'Raptors',
                    notes: [
                        {
                            result: 'Win',
                            goalsFor: 5,
                            goalsAgainst: 4,
                            gameNotes: 'fast forward'
                        }
                    ]
                },
            ]
        };
        return g;
    }
])

.factory('oppsFact', [
    function() {
        var o = {
            oppsArray: [
                'Still Kickin',
                'Nacho Mamas',
                'Meatballs FC',
                'Hot Shots',
                'Raptors'
            ]
        };
        return o;
    }
]);