$("document").ready(function() {


    $('[class^=\"search-box\"]').val("");
    $('[class^=\"search-box\"]').keyup('keypress', function(e) {
        if (e.keyCode === 13) {
            search("test");
        }
    });
    $('[class^=\"search-button2\"]').click(function() {
        search();
    });
    $('[class^=\"search-button1\"]').click(function() {
        window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
    });

});


function search() {

    var textInput = $('[class^=\"search-box\"]').val();

    if (textInput !== "") {
      $(".search-button1S1").fadeOut();
      $(".search-button2S1").fadeOut();
      $(".search-boxS1").fadeOut();
      $(".titleS1").fadeOut();
      $(".my-nameS1").fadeOut();
      setTimeout(function(){
        $(".search-button1S1").addClass("search-button1S2").removeClass("search-button1S1");
        $(".search-button2S1").addClass("search-button2S2").removeClass("search-button2S1");
        $(".search-boxS1").addClass("search-boxS2").removeClass("search-boxS1");
        $(".titleS1").addClass("titleS2").removeClass("titleS1");
        $(".my-nameS1").addClass("my-nameS2").removeClass("my-nameS1");
        console.log("test");


      $(".search-button1S2").fadeIn();
      $(".search-button2S2").fadeIn();
      $(".search-boxS2").fadeIn();  }, 500);
      //change css stage 1 to stage 2

        $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts|info&piprop=thumbnail&pithumbsize=500&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?&inprop=url&gsrsearch=" + textInput, function(data) {
            if (data.hasOwnProperty("query")) {
                var objArr = Object.getOwnPropertyNames(data.query.pages);

  //console.log(data);
                if (data.query.pages[objArr[0]].hasOwnProperty("thumbnail")) {

                    $("#results").hide().html("<div class=\"wiki-containers\"> <a href=\""+data.query.pages[objArr[0]].canonicalurl+"\"> <div class= \"wiki-thumnail\"> <img src=\"" + data.query.pages[objArr[0]].thumbnail.source + "\"></div>" + "<div class=\"wiki-description\"> <div class=\"wiki-title\">" + data.query.pages[objArr[0]].title + "</div>" + charLimiter(data.query.pages[objArr[0]].extract) + "</div></a>").fadeIn();


                } else {
                    $("#results").hide().html("<div class=\"wiki-containers\"> <a href=\""+data.query.pages[objArr[0]].canonicalurl+"\">  <div class= \"wiki-thumnail\"></div>" + "<div class=\"wiki-description\"> <div class=\"wiki-title\">" + data.query.pages[objArr[0]].title + "</div>" + charLimiter(data.query.pages[objArr[0]].extract) + "</div></a>").fadeIn();
                }


                for (var x = 1; x < Object.keys(data.query.pages).length; x++) {

                    if (data.query.pages[objArr[x]].hasOwnProperty("thumbnail")) {

                        $("#results").append("<div class=\"wiki-containers\"> <a href=\""+data.query.pages[objArr[x]].canonicalurl + "\"> <div class= \"wiki-thumnail\"> <img src=\"" + data.query.pages[objArr[x]].thumbnail.source + "\"></div>" + "<div class=\"wiki-description\"> <div class=\"wiki-title\">" + data.query.pages[objArr[x]].title + "</div>" + charLimiter(data.query.pages[objArr[x]].extract) + "</div></a>");

                    } else {
                        $("#results").append(" <div class=\"wiki-containers\"><a href=\""+data.query.pages[objArr[x]].canonicalurl+"\"> <div class= \"wiki-thumnail\"></div>" + "<div class=\"wiki-description\"> <div class=\"wiki-title\">" + data.query.pages[objArr[x]].title + "</div>" + charLimiter(data.query.pages[objArr[x]].extract) + "</div></a>");
                    }
                }

            } else {

                console.log("ERROR"); //TODO this
            }

        });

    }
    $(".my-nameS2").fadeIn();
}

function charLimiter(stringData){
  var limit=340;
if(stringData.length > limit){
  var temp = stringData.substring(0,limit);
 temp =temp.substring(0,temp.lastIndexOf(" ") - 1) +" ...";
 return temp;
}
return stringData;
}
