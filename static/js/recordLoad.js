$(document).ready(function () {
    $.ajax({
        url: "/ajax-GET-record",
        dataType: "json",
        type: "GET",
        beforeSend: function () {
            //console.log("beforeSend function");
        },
        // data: { name: userId },
        success: function (data) {
            console.log("Success Data Load! :", data);
            //only its time part should be selected to be shown
            $("#tr1 div.time").text(data[0].time);
            $("#tr1 div.description").text(data[0].description);
            $("#tr1 div.expense").text(data[0].expense);
            //img1
            //img2



        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }

    })




});