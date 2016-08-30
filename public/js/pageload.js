function getApiData(subUrl, callback){
    $.ajax({
        type: "GET",
        url: $("#apiUrlHdn").val() + subUrl,
        dataType: 'json',
        success: function(response) {
            callback(response);
            },
        error: function(req, textStatus, error){
            console.log(error);
        }
    });
}

$(document).ready(function() {
    carregarSlide();
    carregarRedes();
});

function carregarSlide(){
    getApiData("/slide", function(slides){
        if(!slides || slides.length < 1){
            $("#top").hide();
        }
        else{
            var htmlSlides = "";
            $.each(slides, function(idx, obj){
                htmlSlides += '<div class="item';
                if(idx == 0){
                    htmlSlides += ' active';
                }
                htmlSlides += '"><img class="img-responsive" src="';
                htmlSlides += obj.linkimagem;
                htmlSlides += '" alt="slider"></div>';                
            });
            $(".carousel-inner").html(htmlSlides);
            $("#main-slide").carousel("pause").removeData();
            $("#main-slide").carousel();
        }
    });
}

function carregarRedes(){
    getApiData("/rede", function(redes){
        if(!redes || redes.length < 1){
            $("#sectionRedes").hide();
        }
        else{
            var htmlSlides = "";
            $.each(redes, function(idx, obj){
                htmlSlides += '<div class="item';
                if(idx == 0){
                    htmlSlides += ' active';
                }
                htmlSlides += '"><img class="img-responsive center-block" src="';
                htmlSlides += obj.linkfoto;
                htmlSlides += '" alt="slider"></div>';                
            });

            $("#partners-carousel").html(htmlSlides);
            // Partners Carousel 
            $("#partners-carousel").owlCarousel({
                // Partners Carousel Settings
                navigation: false,
                pagination: false,
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: redes.length,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [979, 3],
                stopOnHover: true,
            });
        }
    });
}