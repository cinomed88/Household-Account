$(document).ready(function() {


    $('#btnSubmit').click(function(e) {
        let formData = { description: $("#description_input").val(),
                         expense: $("#expense_input").val()
                       };
        console.log("Form data to send:", formData);
        $.ajax({
            url: "/post-submit",
            dataType: "json",
            type: "POST",
            data: formData,
            success: (data) => {
                console.log("SUCCESS JSON:", data);
                $(description_input).val('');
                $(expense_input).val('');
                
                $("#p2").html(data[0] + " " + data[1]['description']
                              + ", " + data[1]['expense']
                             );

            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#p2").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });

    });

    // $('#btnSubmit').click(function(e) {

    //     var form = $('#frmUploader')[0];
    //     var formdata = new FormData(form);
    //     console.log(formdata);

    //     $.ajax({
    //         url: "/uploadImage",
    //         enctype: 'multipart/form-data',
    //         processData: false,
    //         contentsType: false,
    //         cache: false,
    //         data: formdata,
    //         type: "POST",
    //         success: (data) => {
    //              console.log("SUCCESS Image Successfully", data);
    //         },
    //         error: function(jqXHR, textStatus, errorThrown) {
    //             console.log("ERROR:", jqXHR, textStatus, errorThrown);
    //         }
    //     });
    // });


});