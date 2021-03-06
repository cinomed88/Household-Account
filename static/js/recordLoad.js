$(document).ready(function () {

    var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');    
    var month = new Array('January', 'February', 'March' , 'April', 'May', 
        'June', 'July', 'August', 'September', 'October', 'November', 'December');
    
    var currentTime = new Date();

    function setDate(d){
        var mm = String(d.getMinutes()).padStart(2, '0');
        var hh = String(d.getHours()).padStart(2, '0');
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = d.getFullYear();

        $("#heading2").text( month[d.getMonth()] + ", " + d.getDate()
            + " (" + week[d.getDay()] + ")" );
        $("#time_input").text( hh + ":" + mm);  // remove??

        var cDate = yyyy +'-'+ mm +'-'+ dd;
        var showDate = {Date : cDate};
        return showDate;
    }

    var showDate = setDate(currentTime);


    $('#btnPlusDate').click(function(e) {
        currentTime.setDate(currentTime.getDate() + 1);
        showDate = setDate(currentTime);
        loadRecord();
        // $.ajax({
        //     url: "/plus-date",
        //     dataType: "json",
        //     type: "GET",
        //     data: showDate,
        //     success: (data) => {
        //         console.log("plus succeed", data);
        //         loadRecord();
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         $("#p2").text(jqXHR.statusText);
        //         console.log("ERROR:", jqXHR, textStatus, errorThrown);
        //     }
        // });

    });
    $('#btnMinusDate').click(function(e) {
        currentTime.setDate(currentTime.getDate() - 1);
        showDate = setDate(currentTime);
        loadRecord();
        // $.ajax({
        //     url: "/minus-date",
        //     dataType: "json",
        //     type: "GET",
        //     data: showDate,
        //     success: (data) => {
        //         console.log("minus succeed", data);
        //         loadRecord();
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         $("#p2").text(jqXHR.statusText);
        //         console.log("ERROR:", jqXHR, textStatus, errorThrown);
        //     }
        // });

    });

    
    loadRecord();

    function loadRecord(){
        $.ajax({
            url: "/ajax-GET-record",
            dataType: "json",
            data: showDate,
            type: "GET",
            beforeSend: function () {
                //console.log("beforeSend function");
            },
            success: function (data) {
                console.log("Success Data Load! :", data);
    
                let TotalExpense = 0;
                $("#list_record").html('');
            
                for (var i=0; i<data.length; i++){
                    var record = '<div id="tr'+i+'" class="transaction" class="odd_row"></div>';
                    var time = '<div class="time"></div>';
                    var description = '<div class="description"></div>';
                    var expense = '<div class="expense"></div>';
                    var img = '<div class="img"><a href=""><img src="/img/receipt.png"/></a></div>';
    
                    $("#list_record").append(record);
                    $("#tr"+i).append(time);
                    $("#tr"+i).append(description);
                    $("#tr"+i).append(expense);
                    $("#tr"+i).append(img);
    
                    var d = new Date(data[i].time);
                    $("#tr"+i+" div.time").text(String(d.getHours()).padStart(2,'0') +":"+ String(d.getMinutes()).padStart(2,'0')); //UTC+0 time?
                    $("#tr"+i+" div.description").text(data[i].description);
                    $("#tr"+i+" div.expense").text(data[i].expense);
                    $("#tr"+i+" div.img > a").attr("href", data[i].img);
    
                    TotalExpense += data[i].expense;
                }
                $("#totalExpense").text(TotalExpense);
                
    
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
    
        })
    }


});