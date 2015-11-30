//function that runs as soon as the "login"-button on the front page is clicked
$(document).ready(function () {
    $("#login").click(function () {

        var loginInfo = {
            "username": $("#username").val(),
            "password": $("#password").val()
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/login/",
            "method": "POST",
            "processData": false,
            "data": JSON.stringify(loginInfo)
        };

        $.ajax(settings).done(function (data, status, xhr) {
            if (xhr.status == 200) {
                $.session.set('loggedInId', data.userid);
                $.session.set('username', loginInfo.username);
                window.location.href = "../html/UserMenu.html";
            }
            })
            .fail(function () {
                alert("Wrong username or password. Try again!")
        });
    });
    // function that prints username
    $(function() {
        $("#userLoggedIn").append($.session.get('username'));
    });
});

//function that get all open games from the database and inserts them into table
$(document).ready(function () {

    $("#table td").remove();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:10018/api/games/open",
        "method": "GET"
    };

    $.ajax(settings).done(function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.name +
                '</td><td>' + item.created + '</td></tr>';
        });
        $('#table').append(trHTML);
        //console.log(response);

        $("#populategame").click(function () {

            $("#table td").remove();

            $.ajax(settings).done(function (response) {
                var trHTML = '';
                $.each(response, function (i, item) {
                    trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.name +
                        '</td><td>' + item.created + '</td></tr>';
                });
                $('#table').append(trHTML);
                //console.log(response);
            });
        });
    });
});
// method that get the 3 highest scores from database and populates table
$(document).ready(function () {

        $("#table td").remove();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/scores/",
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.score + '</td><td>' + item.user.username + '</td><td>' + item.user.id +
                    '</td><td>' + item.game.gameId + '</td></tr>';
            });
            $('#scoresTable').append(trHTML);
            //console.log(response);
        });
});
//method that deletes a game in the database according to gameId specified by user
$(document).ready(function () {
    $("#deletegame").click(function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/games/" + $("#gameid").val(),
            "method": "POST",
            "processData": false,
            "data": ""
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });
});
// function that creates game in database
$(document).ready(function () {
    $(".creategame").click(function () {

        var gameSettings = {
            "host": {
                "id": $.session.get('loggedInId'),
                "controls": $(".controls").val()
            },
            "name": $(".gamename").val(),
            "mapSize": $(".mapsize").val()
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/games/",
            "method": "POST",
            "processData": false,
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

        var gameSettings = {
            "opponent": {
                "id": $.session.get('loggedInId')
            },
            "gameId": $("#gameid").val()
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/games/join",
            "method": "POST",
            "processData": false,
            "data": JSON.stringify(gameSettings)
        };

        $.ajax(settings).done(function (response) {

            console.log(response);
        });
    });
});
// function that populates table with all the user's pending games
$(document).ready(function () {

    // removes data from table
    $("#table2 td").remove();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:10018/api/games/pending/" + $.session.get('loggedInId'),
        "method": "GET"
    };

    $.ajax(settings).done(function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                + '</td><td>' + item.name + '</td><td>' + item.created + '</td></tr>';
        });
        $('#table2').append(trHTML);
        //console.log(response);
    });
    $("#populategame2").click(function () {

        $("#table2 td").remove();

        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                    + '</td><td>' + item.name + '</td><td>' + item.created + '</td></tr>';
            });
            $('#table2').append(trHTML);
            //console.log(response);
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

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/games/start/",
            "method": "POST",
            "processData": false,
            "data": JSON.stringify(gameSettings)
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });

    });
});
// function that lists all of the user's finished game in a table
$(document).ready(function () {

    // removes data from table
    $("#table3 td").remove();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:10018/api/games/finished/" + $.session.get('loggedInId'),
        "method": "GET"
    };

    $.ajax(settings).done(function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                + '</td><td>' + item.winner.id + '</td><td>' + item.name + '</td><td>'
                + item.created + '</td></tr>';
        });
        $('#table3').append(trHTML);
        //console.log(response);
    });

    $("#populategame3").click(function () {

        $("#table3 td").remove();

        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' + item.opponent.id
                    + '</td><td>' + item.winner.id + '</td><td>' + item.name + '</td><td>'
                    + item.created + '</td></tr>';
            });
            $('#table3').append(trHTML);
            //console.log(response);
        });
    });
});