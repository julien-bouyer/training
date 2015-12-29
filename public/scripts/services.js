"use strict";

app.service("LoginService", function (UsersService) {

    return {
        login: function (iduser, password) {
            var user,
                logged = false;
            user = UsersService.fetchOne(iduser);
            if (user && user.password == password) {
                logged = true;
                var loggedUser = angular.fromJson(angular.toJson(user));
                var loggedUser_stringify = JSON.stringify(loggedUser);
                sessionStorage.setItem("loggedUser", loggedUser_stringify);
            }
            sessionStorage.setItem("logged", logged);
            return logged;
        },
        getUser: function () {
            var user_json = sessionStorage.getItem("loggedUser");
            return JSON.parse(user_json);
        },
        checkConnection: function () {
            var logged = sessionStorage.getItem("logged");
            return !logged || logged.toLowerCase() == 'false' ? false : true;
        },
        disconnect: function () {
            sessionStorage.setItem("logged", false);
        }
    }
});

app.service("UsersService", function () {
    var init,
        load,
        loaded = false,
        save,
        users;

    init = function () {
        console.log("init users");
        users = [{
            id: 'luke',
            name: 'Luke SKYWALKER',
            password: 'luke'
        }, {
            id: 'han',
            name: 'Han SOLO',
            password: 'han'
        }, {
            id: 'leia',
            name: 'Leia ORGANA',
            password: 'leia'
        }];
        save();
    };

    load = function () {
        if (!loaded) {
            console.log("loading users");
            var users_json = localStorage.getItem("users");
            users = JSON.parse(users_json);
            loaded = true;
        }
    };

    save = function () {
        users = angular.fromJson(angular.toJson(users));
        var users_stringify = JSON.stringify(users);
        localStorage.setItem("users", users_stringify);
    };

    return {
        load: function () {
            if (!localStorage.getItem("users")) {
                init();
            }
            load();
        },

        fetch: function () {
            return users;
        },

        fetchOne: function (id) {
            var user;
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    user = users[i];
                    break;
                }
            }
            return user;
        },

        push: function (user) {
            users.push(user);
            save();
        },

        delete: function (index) {
            users.splice(index, 1);
            save();
        }
    };
});


app.service("TrainingsService", function () {
    var init,
        loaded = false,
        save,
        trainings;

    init = function () {
        console.log("init trainings");
        trainings = [
            {
                id: 0,
                name: "AngularJS",
                description: "La formation AngularJS est top !",
                link: "https://git.softeam.fr/angularjs-formation",
                duration: 3
            }, {
                id: 1,
                name: "Java POO",
                description: "Formation à Java et la programmation orientée objets.",
                link: "https://git.softeam.fr/java-poo-formation",
                duration: 4
            }, {
                id: 2,
                name: "JSF2",
                description: "Formation JSF2 pour tout savoir sur JavaServer Faces v2.",
                link: "https://git.softeam.fr/jsf2-formation",
                duration: 2
            }, {
                id: 3,
                name: "Formation HTML JavaScript",
                description: "Cette formation détient les bases sur HTML et JavaScript.",
                link: "https://git.softeam.fr/html-js-formation",
                duration: 2
            }/*, {
                id: 0,
                name: "",
                description: "",
                link: "",
                duration: 0
            }*/
        ];
        save();
    };

    save = function () {
        trainings = angular.fromJson(angular.toJson(trainings));
        var trainings_stringify = JSON.stringify(trainings);
        localStorage.setItem("trainings", trainings_stringify);
    };


    return {
        load: function () {
            if (!localStorage.getItem("trainings")) {
                init();
            }
            if (!loaded) {
                console.log("loading trainings");
                var trainings_json = localStorage.getItem("trainings");
                trainings = JSON.parse(trainings_json);
                loaded = true;
            }
        },

        fetch: function () {
            return trainings;
        },

        fetchOne: function (id) {
            var training;
            for (var i = 0; i < trainings.length; i++) {
                if (trainings[i].id == id) {
                    training = trainings[i];
                    break;
                }
            }
            return training;
        },

        push: function (training) {
            training.id = trainings.length;
            trainings.push(training);
            save();
        },

        delete: function (index) {
            trainings.splice(index, 1);
            save();
        }
    };
});