//function that runs as soon as the "login"-button on the front page is clicked
$(document).ready(function () {
    $("#login").click(function () {

        // object is created based on input from user
        var loginInfo = {
            "username": $("#username").val(),
            "password": $("#password").val()
        };

        // ajax settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/login/",
            "method": "POST",
            "data": JSON.stringify(loginInfo)
        };

        // settings is sent to server
        $.ajax(settings).done(function (data, status, xhr) {
                // if-statement that checks if the returned status from server
                // is equal to 200 OK
                if (xhr.status == 200) {
                    //below is id and username set and user is sent to menu
                    $.session.set('loggedInId', data.userid);
                    $.session.set('username', loginInfo.username);
                    window.location.href = "../html/UserMenu.html";
                }
            })
            // if status from server isn't 200 user will recieve the below alert
            .fail(function () {
                alert("Wrong username or password. Try again!")
            });
    });

    // function that prints username + user id on the different screens
    $(function () {
        $("#userLoggedIn").append($.session.get('username') + ", id: " + $.session.get('loggedInId'));
    });
});

//function that get all open games from the database and inserts them into table
$(document).ready(function () {
    // removes table data
    $("#table td").remove();

    // ajax settings
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.url + "/games/open",
        "method": "GET"
    };

    // table of open games is populated with the response from server
    $.ajax(settings).done(function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.name +
                '</td><td>' + item.created + '</td></tr>';
        });
        $('#table').append(trHTML);

        // if the button "populate table" is clicked the table will re-populate with data
        $("#populategame").click(function () {

            $("#table td").remove();

            // table of open games is populated with the response from server
            $.ajax(settings).done(function (response) {
                var trHTML = '';
                $.each(response, function (i, item) {
                    trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.name +
                        '</td><td>' + item.created + '</td></tr>';
                });
                $('#table').append(trHTML);
            });
        });
    });
});

// method that gets all of the scores from database and populates table with descending scores
$(document).ready(function () {

    // removes data from table
    $("#table td").remove();

    // ajax settings
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.url + "/scores/",
        "method": "GET"
    };

    // table of all scores is populated with the response from server
    $.ajax(settings).done(function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.score + '</td><td>' + item.user.username + '</td><td>' + item.user.id +
                '</td><td>' + item.game.gameId + '</td></tr>';
        });
        $('#scoresTable').append(trHTML);
    });
});
//method that deletes a game in the database according to gameId specified by user
$(document).ready(function () {
    $("#deletegame").click(function () {

        // ajax settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/" + $("#gameid").val(),
            "method": "POST"
        };
        // the object "settings" above is POST'ed to server with the id that the user specified
        $.ajax(settings).done(function (response) {
                console.log(response);
            })
            // if the deletion of the game was successfull the below alert is shown
            .success(function () {
                alert("Game was deleted! Update the tables by clicking 'populate'");
            })
            // if the deletion of the game failed the below alert is shown
            .fail(function () {
                alert("Something went wrong!");
            });
    });
});

// function that creates game in database
$(document).ready(function () {
    $(".creategame").click(function () {

        // an object containing the information about the game about to be created
        // host id that was set when the user logged in is set equal to the host's id
        // controls, name of game and mapsize is specified by user
        var gameSettings = {
            "host": {
                "id": $.session.get('loggedInId'),
                "controls": $(".controls").val()
            },
            "name": $(".gamename").val(),
            "mapSize": $(".mapsize").val()
        };

        // ajax settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/",
            "method": "POST",
            "data": JSON.stringify(gameSettings)
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });
});

// method that is used to join a game created/hosted by another user
$(document).ready(function () {
    $("#joingame").click(function () {

        // object containing the opponent id, which is set equel to the logged in user's id
        // game id is specified by user
        var gameSettings = {
            "opponent": {
                "id": $.session.get('loggedInId')
            },
            "gameId": $("#gameid").val()
        };

        // ajax settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/join",
            "method": "POST",
            "data": JSON.stringify(gameSettings)
        };

        // axax is POST'ed
        $.ajax(settings).done(function (response) {
                console.log(response);
            })
            // if the user joined the game successfully the below alert is shown
            .success(function () {
                alert("Game was joined! Update the tables by clicking 'populate'");
            })
            // if the user for some reason didn't join the game as intented the below alert is shown
            .fail(function () {
                alert("Something went wrong!");
            });
    });
});
// function that populates table with all the user's pending games
$(document).ready(function () {

    // removes data from table
    $("#table2 td").remove();

    // ajax settings
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.url + "/games/pending/" + $.session.get('loggedInId'),
        "method": "GET"
    };

    // table of pending games is populated with the response from server
    $.ajax(settings).done(function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                + '</td><td>' + item.name + '</td><td>' + item.created + '</td></tr>';
        });
        $('#table2').append(trHTML);
    });

    $("#populategame2").click(function () {

        // removes date from table
        $("#table2 td").remove();

        // table of pending games is populated with the response from server
        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                    + '</td><td>' + item.name + '</td><td>' + item.created + '</td></tr>';
            });
            $('#table2').append(trHTML);
        });
    });
});
// function that start a pending game with controls from user
$(document).ready(function () {
    $("#startgame").click(function () {

        var gameSettings = {
            "gameId": $(".gameid").val(),
            "opponent": {
                "controls": $(".controls").val()
            }
        };

        // ajax settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/start/",
            "method": "POST",
            "data": JSON.stringify(gameSettings)
        };

        $.ajax(settings).done(function (response) {

            // if/else-statement that checks if the winner of the game's id matches the one who's logged in
            if (response.winner.id == $.session.get('loggedInId')) {
                alert("Congratulations. You won!")
            } else {
                alert("Unfortunately, you lost!")
            }
        });

    });
});
// function that lists all of the user's finished game in a table
$(document).ready(function () {

    // removes data from table
    $("#table3 td").remove();

    // ajax settings
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.url + "/games/finished/" + $.session.get('loggedInId'),
        "method": "GET"
    };

    // table of finished games is populated with the response from server
    $.ajax(settings).done(function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                + '</td><td>' + item.winner.id + '</td><td>' + item.name + '</td><td>'
                + item.created + '</td></tr>';
        });
        $('#table3').append(trHTML);
    });

    $("#populategame3").click(function () {

        // remove data from table
        $("#table3 td").remove();


        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                    + '</td><td>' + item.winner.id + '</td><td>' + item.name + '</td><td>'
                    + item.created + '</td></tr>';
            });
            $('#table3').append(trHTML);
        });
    });
});