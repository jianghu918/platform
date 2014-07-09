jQuery(function($) {

    //Contact Form
    $('#contact-form input#submit').click(function() {
        $('#contact-form .submit-button-wrap').append('<img src="images/ajax-loader.gif" class="loaderIcon" alt="Loading..." />');

        var name = $('input#name').val();
        var email = $('input#email').val();
        var subject = $('input#subject').val();
        var comments = $('textarea#comments').val();

        $.ajax({
            type: 'post',
            url: 'sendEmail.php',
            data: 'name=' + name + '&email=' + email + '&subject=' + subject + '&comments=' + comments,

            success: function(results) {
                $('#contact-form img.loaderIcon').fadeOut(1000);
                $('#response').html(results);
            }
        }); // end ajax
    });


    //Book a Table Form (Modal)
    $('#resform input#res-submit').click(function() {
        $('#resform .submit-button-wrap').append('<img src="images/ajax-loader.gif" class="loaderIcon" alt="Loading..." />');

        var date = $('#res-date').val();
        var time = $('#res-time').val();
        var person = $('#res-person').val();
        var email = $('#res-email').val();
        var tel = $('#res-tel').val();

        $.ajax({
            type: 'post',
            url: 'booking.php',
            data: 'date=' + date + '&time=' + time + '&person=' + person + '&email=' + email + '&tel=' + tel,

            success: function(results) {
                $('#resform img.loaderIcon').fadeOut(1000);
                $('#res-response').html(results);
            }
        }); // end ajax
    });


    //Order Catering (Modal)
    $('#order-submit').click(function() {
        $('#order-form .submit-button-wrap').append('<img src="images/ajax-loader.gif" class="loaderIcon" alt="Loading..." />');

        var name = $('#order-name').val();
        var surname = $('#order-l-name').val();
        var eventtype = $('#order-event').val();
        var date = $('#order-date').val();
        var person = $('#order-person').val();
        var email = $('#order-email').val();
        var tel = $('#order-tel').val();

        $.ajax({
            type: 'post',
            url: 'catering.php',
            data: 'name=' + name + '&surname=' + surname + '&eventtype=' + eventtype + '&date=' + date + '&person=' + person + '&email=' + email + '&tel=' + tel,

            success: function(results) {
                $('#order-form img.loaderIcon').fadeOut(1000);
                $('#order-response').html(results);
            }
        }); // end ajax

        return false;
    });


    //Order Catering (Page)
    $('#order-catering-submit').click(function() {
        $('#order-catering .submit-button-wrap').append('<img src="images/ajax-loader.gif" class="loaderIcon" alt="Loading..." />');

        var name = $('#order-catering-name').val();
        var surname = $('#order-catering-l-name').val();
        var eventtype = $('#order-catering-event').val();
        var date = $('#order-catering-date').val();
        var person = $('#order-catering-person').val();
        var email = $('#order-catering-email').val();
        var tel = $('#order-catering-tel').val();

        $.ajax({
            type: 'post',
            url: 'catering.php',
            data: 'name=' + name + '&surname=' + surname + '&eventtype=' + eventtype + '&date=' + date + '&person=' + person + '&email=' + email + '&tel=' + tel,

            success: function(results) {
                $('#order-catering img.loaderIcon').fadeOut(1000);
                $('#order-catering-response').html(results);
            }
        }); // end ajax

        return false;
    });
});
		