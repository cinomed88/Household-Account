$(document).ready(function () {
    $.ajax({
        url: "/ajax-GET-record",
        dataType: "json",
        type: "GET",
        beforeSend: function () {
            //console.log("beforeSend function");
        },
        success: function (data) {
            console.log("Success Data Load! :", data);
        
            for (var i=0; i<data.length; i++){
                var record = '<div id="tr'+i+'" class="transaction" class="odd_row"></div>';
                var time = '<div class="time"></div>';
                var description = '<div class="description"></div>';
                var expense = '<div class="expense"></div>';
                var img = '<div class="img"><a href=""><img src="/img/receipt.png"/></a></div>';

                $("#list").append(record);
                $("#tr"+i).append(time);
                $("#tr"+i).append(description);
                $("#tr"+i).append(expense);
                $("#tr"+i).append(img);

                var d = new Date(data[i].time);
                console.log(d);
                $("#tr"+i+" div.time").text(d.getHours() +":"+ d.getMinutes()); //UTC+0 time?
                $("#tr"+i+" div.description").text(data[i].description);
                $("#tr"+i+" div.expense").text(data[i].expense);
                $("#tr"+i+" div.img > a").attr("href", data[i].img);
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }

    })




});