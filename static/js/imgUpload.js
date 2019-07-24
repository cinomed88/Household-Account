$(document).ready(function () {
    var form = $('#frmUploader')[0];
    var data = new FormData(form);

    $.ajax({
        url: "/uploadImage",
        enctype: 'multipart/form-data',
        processData: false,
        contentsType: false,
        cache: false,
        type: "POST",
        success: function(data) {
            console.log("SUCCESS JSON:", data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
});