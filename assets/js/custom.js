$(document).ready(function () {
    $("#owl1").owlCarousel({
        margin: 10,
        loop: true,
        nav: true,
        navText: ["<img src='./assets/images/icons/left-arrow.png'>","<img src='./assets/images/icons/right-arrow.png'>"],

        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 1,
                nav: true
            }
        }
    });
    $('#owl2').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        center: true,
        nav: true,
        navText: ["<img src='./assets/images/home/awesome-arrow-left.png'>","<img src='./assets/images/home/awesome-arrow-right.png'>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    })
    $('#owl3').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 4
            }
        }
    })
    $("#team").owlCarousel({
        margin: 10,
        loop: true,
        responsive: {
          0:{
            items:1,
            nav: false
          },
          600:{
            items:1,
            nav: false
          },
          1000:{
            items:4,
            nav: false
          }
        }
      });
    $("#services_owl").owlCarousel({
        margin: 10,
        loop: true,
        responsive: {
          0:{
            items:1,
            nav: false
          },
          600:{
            items:1,
            nav: false
          },
          1000:{
            items:4,
            nav: false
          }
        }
      });

    AOS.init();
    // End Ready fuction
    $("#thumbnailslider").owlCarousel({
      margin: 10,
      loop: true,
      responsive: {
        0:{
          items:1,
          nav: false
        },
        600:{
          items:1,
          nav: false
        },
        1000:{
          items:1,
          nav: false
        }
      }
    });
    $("#thumbnailslider1").owlCarousel({
      margin: 10,
      loop: true,
      responsive: {
        0:{
          items:1,
          nav: false
        },
        600:{
          items:1,
          nav: false
        },
        1000:{
          items:3,
          nav: false
        }
      }
    });

      $("#toggle").click(function(){
        $(".toggle-content").toggle();
      });
      $("#toggle1").click(function(){
        $(".toggle-content1").toggle();
      });
    
      $("#toggle2").click(function(){
        $(".toggle-content2").toggle();
      });
      $("#toggle3").click(function(){
        $(".toggle-content3").toggle();
      });
      $("#toggle4").click(function(){
        $(".toggle-content4").toggle();
      });
      /*Drop down menu*/
 
      // $('.menu-dropdown').hover(function () {
      //     $(".slide-show").show();

      //   });
      //   $('.menu-dropdown').mouseout(function () {
      //     $(".slide-show").hide();

      //   });


        });
      



// Show the first tab and hide the rest
$('#tabs-nav li:first-child').addClass('active');
$('.tab-content').hide();
$('.tab-content:first').show();
$('.tab-content:first').css("background-color");

// Click function
$('#tabs-nav li').click(function(){
  $('#tabs-nav li').removeClass('active');
  $(this).addClass('active');
  $('.tab-content').hide();
  
  var activeTab = $(this).find('a').attr('href');
  $(activeTab).fadeIn();
  return false;
});

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".drop_down");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  toggleBtnIcon.className = isOpen ? "bi bi-x" : "bi bi-list";
};