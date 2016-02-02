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

app.directive("btnDisconnect", function ($location, LoginService) {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope) {
            scope.disconnect = function () {
                LoginService.disconnect();
                $location.path("/");
            }
        },
        template: '<div><button class="btn btn-primary btn-sm" ng-click="disconnect()">Déconnexion</button></div>'
    }
});
