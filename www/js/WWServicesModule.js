angular.module('WWServicesModule', [])

.service('WWSaveService', ['$state', 
    function($state){
        var service = this;
        var gameEntries = [];
        var gameNoteEntries = [];
        var opponentEntries = [];
        
        service.saveGame = function(date, time, opponent){
            var gameEntry = {
              "date": date,
              "time": time,
              "opponent": opponent
            };
            gameEntries.push(gameEntry);
            $state.go('schedule');
        };
        
        service.saveGameNote = function(goalsFor, goalsAgainst, gameNotes){
            var gameNoteEntry = {
              "goalsFor": goalsFor,
              "goalsAgainst": goalsAgainst,
              "gameNotes": gameNotes
            };
            gameNoteEntries.push(gameNoteEntry);
            $state.go('game');
        };
        
        service.saveOpponent = function(teamName){
            var opponentEntry = {
              "teamName": teamName
            };
            opponentEntries.push(opponentEntry);
            $state.go('opponents');
        };
        
        service.getGames = function(){
            return gameEntries;
        };
        service.getGameNotes = function(){
            return gameNoteEntries;
        };
        service.getOpponents = function(){
            return opponentEntries;
        };
    }
])

.service('WWUserService', 
    function(){
        var service = this;
        service.saveUser = function(){
        };
    }
);