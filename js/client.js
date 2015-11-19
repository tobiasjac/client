//function that runs as soon as the "login"-button on the front page is clicked
$(document).ready(function() {
    $("#login").click(function () {

        var loginInfo = {
            "username" : $("#username").val(),
            "password" : $("#password").val()
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/login/",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(loginInfo)
        };

        $.ajax(settings).done(function (data, status, xhr) {
            if (xhr.status == 200) {
                window.location.href="../html/UserMenu.html";
            }
            else {
                alert("Fail");
            }
        });
    });
});

//function that get all users from the database and inserts them into table
$(document).ready(function() {
    $("#test1").click(function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/games/open",
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>' +item.opponent.id
                    + '</td><td>' + item.name + '</td><td>'+ item.created + '</td><td>'+ item.winner.id + '</td></tr>';
            });
            $('#table').append(trHTML);
            console.log(response);
        });
    });
});
// method that get all scores from database and populates table
$(document).ready(function() {
    $("#test2").click(function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/scores/",
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.score + '</td><td>' +item.user.username + '</td><td>' + item.user.id +
                    '</td><td>' +item.opponent.id + '</td><td>' + item.game.gameId + '</td></tr>';
            });
            $('#table').append(trHTML);
            console.log(response);
        });
    });
});
//method that deletes a game in the database according to gameId specified by user
$(document).ready(function() {
    $("#gameid").click(function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/games/" + $("#id").val(),
            "method": "POST",
            "processData": false,
            "data": ""
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });
});

