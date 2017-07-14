
$(document).ready(function() {
    $("#temp").text(00);
    $("#humidade").text(00);

    var socket = io();
    var led;
    var $led = $("#led");


    socket.on('dados', function(dado) {
        $("#temp").text(dado.Temperatura);
        $("#humidade").text(dado.Umidade);
        led = dado.LED;

        if (led == "LED01_off") {
            $led.removeClass('btn-success').addClass('btn-danger');
            $led.attr('status', led).find('span').text("Desligado");
        } else {
            $led.removeClass('btn-danger').addClass('btn-success');
            $led.attr('status', led).find('span').text("Ligado");
        }
    });

    $led.click(function() {
        status = (led == "LED01_on") ? "LED01_off" : "LED01_on";
        socket.emit('Led', status);
    });

});
