// funktion der henter alle brugerne fra databasen
$(document).ready(function() {
    $("#test").click(function () {

            var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:10018/api/users/",
            "method": "GET"
/*            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "c20629fd-6e17-a36f-b1fb-48d05a57af6a"
            }*/
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });

/*      var username = $("#username").val();
        var password = $("#password").val();

        if(username == "Tobias" && password == "1234") {
            window.location.href = "AdminMenuScreen.html";
        }
        else {
            alert("Something went wrong. Try again.")
        }*/

/*        $.ajax({
            url: "http://localhost:10018/api/users/",
            dataType: 'json',
            "method": "GET",
            "content-type": "application/json",
            success: function(data, response){
                console.log("You made it!");
                console.log(response);
            },
            error: function(xhr) {
                console.log("Error: " + xhr.statusText);
            }
        });*/
    });
});

/*
$(document).ready(function() {
    $("#test").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            "method": "POST",
            url: "http://localhost:10018/api/login/",
            data: "name=" + username + "&pwd=" + password,
            success: function(html){
                if (html == 'true') {
                    window.location.href="AdminMenuScreen.html";
                }
                else {
                    alert("Something went wrong. Try again.")
                }
            }
        });
        return false;
    });
});*/

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