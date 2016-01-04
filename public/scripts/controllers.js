"use strict";

app.controller("LoginCtrl", function ($scope, $location, LoginService) {
    $scope.login = function () {
        if (LoginService.login($scope.iduser, $scope.password)) {
            $location.path("/home");
        } else {
            $scope.message = "Utilisateur inconnu ou mauvais mot de passe.";
        }
    };
});

app.controller("HomeCtrl", function ($scope, $location, UsersService, LoginService) {
    $scope.user = UsersService.fetchOne('luke');

    $scope.disconnect = function () {
        LoginService.disconnect();
        $location.path("/");
    };
 });

app.controller("TrainingsCtrl", function ($scope, $location, TrainingsService, LoginService) {
    $scope.trainings = TrainingsService.fetch();

    $scope.addNewTraining = function () {
        $location.path("/training");
    };
    $scope.submit = function () {
        TrainingsService.push($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };
});

app.controller("TrainingCtrl", function ($scope, $location, TrainingsService, LoginService) {
    $scope.edit = function (index) {
        console.log(index);
        // var id = $scope.trainings[index].id;
        // $location.path("/training");
    };
    $scope.remove = function (index) {
        console.log(index);
        TrainingsService.delete(index);
    };
});
