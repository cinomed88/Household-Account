$(document).ready(function () {   
    var month = new Array('January', 'February', 'March' , 'April', 'May', 
        'June', 'July', 'August', 'September', 'October', 'November', 'December');

    var currentTime = new Date();

    function setMonth(d){
        var mm = String(d.getMinutes()).padStart(2, '0');
        var hh = String(d.getHours()).padStart(2, '0');
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = d.getFullYear();

        $("#heading2").text( month[d.getMonth()] + ", " + d.getFullYear() );

        // var cDate = yyyy +'-'+ mm;
        var showMonth = {Month : mm, Year: yyyy};
        return showMonth;
    }

    var showMonth = setMonth(currentTime);


    $('#btnPlusDate').click(function(e) {
        currentTime.setMonth(currentTime.getMonth() + 1);
        showMonth = setMonth(currentTime);
        loadRecord();

    });
    $('#btnMinusDate').click(function(e) {
        currentTime.setMonth(currentTime.getMonth() - 1);
        showMonth = setMonth(currentTime);
        loadRecord();

    });

    
    loadRecord();

    function loadRecord(){
        $.ajax({
            url: "/ajax-GET-monthly-record",
            dataType: "json",
            data: showMonth,
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
                    $("#tr"+i+" div.time").text(String(d.getMonth()).padStart(2,'0') +"/"+ String(d.getDate()).padStart(2,'0')); //UTC+0 time?
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