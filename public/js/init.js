
(function($) {
  $(function() {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
  });
})(jQuery);

$('.dropdown-trigger').dropdown({
  closeOnClick: false,
  
});
// Modals Controller
$(document).ready(function(){
  $('.modal').modal();
});

// $(document).ready(function() {
//   if (
//     $(window).scroll(function() {
//       if ($(window).scrollTop() > 300) {
//         $(".navanim").addClass("limem");
//       } else {
//         $(".navanim").removeClass("limem");
//       }
//     })
//   );
// });


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, options);
});

$(document).ready(function() {
  $(".menu").click(function(e) {
    var linkHref = $(this).attr("href");
    console.log($(linkHref).offset().top);
    $("html, body").animate(
      {
        scrollTop: $(linkHref).offset().top
      },
      1200
    );
    e.preventDefault();
  });
});

$(document).ready(function() {
  $(".menu2").click(function(e) {
    var linkHref = $(this).attr("href");
    console.log($(linkHref).offset().top);
    $("html, body").animate(
      {
        scrollTop: $(linkHref).offset().top
      },
      1200
    );
    e.preventDefault();
  });
});
$(document).ready(function(){
  $('.collapsible').collapsible();
});
      

$(document).ready(function() {
  $(".smooth").click(function(e) {
    var linkHref = $(this).attr("href");
    console.log($(linkHref).offset().top);
    $("html, body").animate(
      {
        scrollTop: $(linkHref).offset().top
      },
      1200
    );

    e.preventDefault();
  });
});

$(document).ready(function() {
  $(".sidenav").sidenav();
});
$(document).ready(function() {
  $(".slider").slider();
});
$(document).ready(function(){
  $('.datepicker').datepicker();
});

setTimeout( function(){ 
$('.smile').addClass('fa-grin-alt').removeClass('fa-frown-open');  
}  , 2000 );

// Animation of navigation bar
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 150) {
      $("nav").addClass("sticky-nav");
    }
  });
});

$(document).ready(function() {
  if (
    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        $(".navanim").addClass("limem");
      } else {
        $(".navanim").removeClass("limem");
      }
    })
  );
});

$(document).ready(function() {
  if (
    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        $(".ul").addClass("slock");
      } else {
        $(".ul").removeClass("slock");
      }
    })
  );
});

$(document).ready(function() {
  var nav = $("#nav-icon1");
  nav.click(function() {
    nav.addClass(function(index, currentClass) {
      var addedClass = "";
      if (currentClass === "") {
        addedClass = "open";
        setTimeout(function() {
          nav.removeClass(addedClass);
        }, 1000);
      }
      return addedClass;
    });
  });
});

$(document).ready(function() {
  $(".brand-logo").click(function(e) {
    var linkHref = $(this).attr("href");
    console.log($(linkHref).offset().top);
    $("html, body").animate(
      {
        scrollTop: $(linkHref).offset().top
      },
      1200
    );
    e.preventDefault();
  });
});

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

$(document).ready(function() {
  $(".modal").modal({
    opacity: 0.9,
    inDuration: 1000,
    outDuration: 1000
  });
});

$(".jquery-background-video").bgVideo({ fadeIn: 2000 });

