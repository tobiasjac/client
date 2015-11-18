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

        $.ajax(settings).done(function (response) {
                window.location.href="../html/UserMenu.html";
                if (xhr.status == 400) {
                    console.log("something went wrong");
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
            "url": "http://localhost:10018/api/users/",
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
                var trHTML = '';
                $.each(response, function (i, item) {
                    trHTML += '<tr><td>' + item.id + '</td><td>' + item.firstName + '</td><td>' +item.lastName + '</td><td>' + item.email + '</td><td>'+ item.username + '</td><td>'+ item.created + '</td></tr>';
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
            "url": "http://localhost:10018/api/games/2",
            "method": "DELETE"
        };

        $.ajax(settings.url + $("#id").val()).done(function (response) {
            console.log(response);
        });
    });
});