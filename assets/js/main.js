jQuery(document).ready(function($) {

    $(".text1").fadeOut(6000,function(){
        $(".text2").fadeIn(3000);
      });

    var settings = {
        "url": "https://api.openweathermap.org/data/2.5/weather?q=Moskhaton&appid=3ec56aa9a6eb38bd6925006805f8e73c",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        var name = response['name'];
        var weather = response['weather'];
        var main = response['main'];
        var sys = response['sys'];

        country = sys.country;
        temp = main.temp;
        weather_data = weather[0];
        icon_code = weather_data.icon;
        url = 'https://openweathermap.org/img/wn/' + icon_code + '@2x.png';

        var temp_celsius = temp - 273.15;
        var temp_celsius = Math.round(temp_celsius);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        jQuery('.town').text(name + ',' + country);
        jQuery('.current_date').text(today);
        jQuery('.weather_icon').attr('src', url);
        jQuery('.temp').html(temp_celsius + '&#8451;');
    });

    function updateClock() {
        var currentTime = new Date();
        // Operating System Clock Hours for 12h clock
        var currentHoursAP = currentTime.getHours();
        // Operating System Clock Hours for 24h clock
        var currentHours = currentTime.getHours();
        // Operating System Clock Minutes
        var currentMinutes = currentTime.getMinutes();
        // Operating System Clock Seconds
        var currentSeconds = currentTime.getSeconds();
        // Adding 0 if Minutes & Seconds is More or Less than 10
        currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
        currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
        // Picking "AM" or "PM" 12h clock if time is more or less than 12
        var timeOfDay = (currentHours < 12) ? "AM" : "PM";
        // transform clock to 12h version if needed
        currentHoursAP = (currentHours > 12) ? currentHours - 12 : currentHours;
        // transform clock to 12h version after mid night
        currentHoursAP = (currentHoursAP == 0) ? 12 : currentHoursAP;
        // display first 24h clock and after line break 12h version
        var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
        // print clock js in div #clock.
        $("#clock").html(currentTimeString);}
        $(document).ready(function () {
        setInterval(updateClock, 0);
    });


    var photos = {
        "url": "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f1552c6e326ebf204ef8292166d43052&has_geo=1&lat=37.949394&lon=23.675705&radius=0.25&format=json&nojsoncallback=1",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(photos).done(function(response) {
        var photos = response['photos'];
        var photos = photos['photo'];
        var i = 0;
        for (i = 0; i < 6; i++) {
            var id = photos[i].id;
            var secret = photos[i].secret;
            var server = photos[i].server;
            url = 'https://live.staticflickr.com/' + server + '/' + id + '_' + secret + '_b.jpg';

            jQuery(".flickr-photos").append('<div class="col-md-4 align-self-center"> <img class="flickr-item mb-5 mt-5" src=' + url + '></div>')
        }
    });

    $(".flickr-link").mouseenter(function() {
        $(".flickr-logo").css("filter", "invert(100%) sepia(0%) saturate(939%) hue-rotate(1deg) brightness(108%) contrast(101%)");
    });

    $(".flickr-link").mouseleave(function() {
        $(".flickr-logo").css("filter", "none");
    });

    $('.transportbuttonsrow').hide();
    $('.transport-text-2').hide();
    $('.metromap').hide();
    $('.trammap').hide();

    $(".busesicon").click(function() {
        $('.metromap').hide();
        $('.trammap').hide();
        $('.transportbuttonsrow').css('display', 'flex');
        $('.transport-text-2').show();
    });

    $(".subwayicon").click(function() {
        $('.transportbuttonsrow').hide();
        $('.transport-text-2').hide();
        $('.trammap').hide();
        $('.metromap').show();
    });

    $(".tramicon").click(function() {
        $('.transportbuttonsrow').hide();
        $('.transport-text-2').hide();
        $('.metromap').hide();
        $('.trammap').show();
    });


    //staseis ajax

    var hsap = {
        "url": "https://telematics.oasa.gr/api/?act=getStopArrivals&p1=320043",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(hsap).done(function(response) {
        response = JSON.parse(response);
        var i = 0;
        if (response == 'null' || response == null) {
            jQuery('.body-isap').append('<p class="text-center"> No available routes for this station right now </p>');
        }else{
            for (i = 0; i <= 4; i++) {
                    route_code = response[i].route_code;
                    time = response[i].btime2;
                    if (route_code == '3656') {
                        route_code = '1';
                    }
                    if (route_code == '2034') {
                        route_code = '218';
                    }
                    if (route_code == '2141') {
                        route_code = '860';
                    }
                    if (route_code == '1889') {
                        route_code = '500';
                    }
                    if (route_code == '2899') {
                        route_code = '218 [Ending]';
                    }
                    if (route_code == '2900') {
                        route_code = '500';
                    }
                    if (route_code == '3622') {
                        route_code = '860';
                    }
                    jQuery('.body-isap').append('<p class="text-center"> The route ' + route_code + ' will be there in ' + time + ' minutes </p>');
                }
        }
    });

    var sotiras = {
        "url":"https://telematics.oasa.gr/api/?act=getStopArrivals&p1=320017",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(sotiras).done(function(response) {
        response = JSON.parse(response);
        var i = 0;
        if (response == 'null' || response == null) {
            jQuery('.body-sotiras').append('<p class="text-center"> No available routes for this station right now </p>');
        } else {
        for (i = 0; i <= 4; i++) {
                route_code = response[i].route_code;
                time = response[i].btime2;
                if (route_code == '3656') {
                    route_code = '1';
                }
                if (route_code == '2034') {
                    route_code = '218';
                }
                if (route_code == '2141') {
                    route_code = '860';
                }
                if (route_code == '1889') {
                    route_code = '500';
                }
                if (route_code == '2899') {
                    route_code = '218 [Ending]';
                }
                if (route_code == '2900') {
                    route_code = '500';
                }
                jQuery('.body-sotiras').append('<p class="text-center"> The route ' + route_code + ' will be there in ' + time + ' minutes </p>');
            }
        }
    });

    var gymnasio = {
        url:"https://telematics.oasa.gr/api/?act=getStopArrivals&p1=320021",
        method: "GET",
        timeout: 0,
    };

    $.ajax(gymnasio).done(function(response) {
        response = JSON.parse(response);
        var i = 0;
        if (response == 'null' || response == null) {
            jQuery('.body-gymnasio').append('<p class="text-center"> No available routes for this station right now </p>');
        } else {
        for (i = 0; i <= 4; i++) {
                route_code = response[i].route_code;
                time = response[i].btime2;
                if (route_code == '3922') {
                    route_code = '040';
                }
                if (route_code == '1881') {
                    route_code = 'B1';
                }
                if (route_code == '2045') {
                    route_code = 'A1';
                }
                if (route_code == '1889') {
                    route_code = '500';
                }
                if (route_code == '2812') {
                    route_code = '130';
                }
                if (route_code == '2900') {
                    route_code = '500';
                }
                if (route_code == '3028') {
                    route_code = 'Χ96';
                }
                if (route_code == '1979') {
                    route_code = '217';
                }
                if (route_code == '3030') {
                    route_code = 'X96 - Night Route';
                }
                if (route_code == '2810') {
                    route_code = '218';
                }
                jQuery('.body-gymnasio').append('<p class="text-center"> The route ' + route_code + ' will be there in ' + time + ' minutes </p>');
            }
        }
    });

    $(".transportation-row").mouseenter(function() {
        $(".transportation-row > a").css("color","#fff");
        $(".oasa-logo").css("filter","invert(100%) sepia(0%) saturate(0%) hue-rotate(51deg) brightness(150%) contrast(101%)");
    });

    $(".transportation-row").mouseleave(function() {
        $(".transportation-row > a").css("color","#003476");
        $(".oasa-logo").css("filter","none");
    });

    

    $(".carnivalclass").click(function() {
        var audio = document.getElementById("samba");
        audio.play();
    });



    var btn = $('#to-top-button');

    $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
    });

    btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    });



}); //close on ready 