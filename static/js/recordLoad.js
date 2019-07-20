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

            for (var i=0; i<data.length; i++){
                var d = new Date(data[i].time);
                console.log(d);
                $("#tr"+(i+1)+" div.time").text(d.getHours() +":"+ d.getMinutes()); //UTC+0 time?
                $("#tr"+(i+1)+" div.description").text(data[i].description);
                $("#tr"+(i+1)+" div.expense").text(data[i].expense);
                //img1
                //img2
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }

    })




});