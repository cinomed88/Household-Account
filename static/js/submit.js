$(document).ready(function() {


    $('#submit').click(function(e) {
        let formData = { description: $("#description_input").val(),
                         expense: $("#expense_input").val()
                       };
        console.log("Form data to send:", formData);
        $.ajax({
            url: "/post-submit",
            dataType: "json",
            type: "POST",
            data: formData,
            success: function(data) {
                console.log("SUCCESS JSON:", data);
                $(description_input).val('');
                $(expense_input).val('');
                $("#p2").html(data[0] + " " + data[1]['description']
                              + " " + data[1]['expense']
                             );

            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#p2").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });
});