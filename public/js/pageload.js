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
            $(".carousel-inner").after(htmlSlides);
            $("#main-slide").carousel("pause").removeData();
            $("#main-slide").carousel();
        }
    });
}