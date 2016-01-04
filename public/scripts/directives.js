"use strict";

app.directive("sftmTraining", function () {
    return {
        restrict: 'E',
        replace: true,
        scope : {
            // same as '=training'
            training: "=",
            // same as '&edit'
            edit: '&',
            // same as '&remove'
            remove: '&'
        },
        templateUrl: "templates/training-template.html"
    };
});

app.directive("checkConnection", function ($location, LoginService) {
    return {
        restrict: 'AE',
        replace: false,
        scope: {},
        link: function (scope) {
            var connected = LoginService.checkConnection();
            if (!connected) {
                $location.path("/login");
            }
        }
    };
});

app.directive("usersLoader", function (UsersService) {
   return {
       restrict: 'E',
       replace: false,
       scope: {},
       link: function (scope) {
           UsersService.load();
       }
   }
});

app.directive("trainingsLoader", function (TrainingsService) {
   return {
       restrict: 'E',
       replace: false,
       scope: {},
       link: function (scope) {
           TrainingsService.load();
       }
   }
});
