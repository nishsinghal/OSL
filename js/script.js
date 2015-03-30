var friends = [
{"firstName": "Josh", "lastName": "Leahy", "rooms": ["Deluxe", "Another"]},
{"firstName": "Edward", "lastName": "Cresswell", "rooms": ["Shared"]},
{"firstName": "Annie", "lastName": "Yang", "rooms": ["Animal"]},
{"firstName": "Christopher", "lastName": "Wiggins", "rooms": ["Deluxe", "Animal"]},
{"firstName": "Sasha", "lastName": "Mani", "rooms": ["Deluxe", "Shared"]},
{"firstName": "Thomas", "lastName": "Smith", "rooms": ["Deluxe"]},
{"firstName": "Sophie", "lastName": "Brown", "rooms": ["Another"]},
{"firstName": "Cheryl", "lastName": "Li", "rooms": ["Animal"]}
];

// Arrays for each room type
var deluxe = [];
var shared = [];
var animal = [];
var another = [];
var other = [];

//Function to check css for media query
function checkSize(){
  if ($(".right").css("float") == "none" ){
    console.log('small!');
    $('.room-type').on('click', 'li', function(){
      $('.room-type').find('li').css('display', 'block');
    });
  }
}

$(document).ready(function(){

  // run test on initial page load
  checkSize();

  // run test on resize of the window
  $(window).resize(checkSize);

// Populate arrays for each room type
$(friends).each(function(index, element){
  var parent = element;
  $(element.rooms).each(function(index, element){
    switch(element){
      case "Deluxe":
      deluxe.push(parent);
      break;
      case "Shared":
      shared.push(parent);
      break;
      case "Animal":
      animal.push(parent); 
      break;
      case "Another":
      another.push(parent);
      break;
      case "Other":
      other.push(parent);
      break;
    }
  });
});

// Sort Arrays by last name
function compare(a,b) {
  if (a.lastName < b.lastName){
    return -1;
  } else if (a.lastName > b.lastName){
    return 1;
  } else {
    return 0;
  }
}

deluxe = deluxe.sort(compare);
shared = shared.sort(compare);
animal = animal.sort(compare);
another = another.sort(compare);
other = other.sort(compare);

function formatName(arrayName, index){
  return "<span class='friend-name'>" + arrayName[index].firstName + " "
   + arrayName[index].lastName + "</span>";
}

// Change friend info text depending on number of friends
function friendStay(array){
  if (array.length === 0){
    $(".friends").empty();
  } else if (array.length < 2){
    $(".friends").html(formatName(array, 0) + " has stayed here");
  } else if (array.length < 3){
    $(".friends").html(formatName(array, 0) + " and " + formatName(array, 1) + " have stayed here");
  } else if (array.length < 4){
    $(".friends").html(formatName(array, 0) + ", " + formatName(array, 1) + " and 1 other friend have stayed here");
  } else {
    $(".friends").html(formatName(array, 0) + ", " + formatName(array, 1) + " and 2 other friends have stayed here");
  }
}

var timeOut;

function nextSlide(){
  var $curr = $('.slider .pictures .current'),
  $both = $('.slider .current');

  $.each($both, function(){
    if ($curr.first().is(':last-child')){
      $(this).removeClass('current').siblings().first().addClass('current');
    } else {
      $(this).removeClass('current').next().addClass('current');
    }
  });
}

function previousSlide(){
  var $curr = $('.slider .pictures .current'),
  $both = $('.slider .current');

  $.each($both, function(){
    if ($curr.first().is(':first-child')){
      $(this).removeClass('current').siblings().last().addClass('current');
    } else {
      $(this).removeClass('current').prev().addClass('current');
    }
  });
}

function startTimer(){
  timeOut = setInterval(function(){
    nextSlide();
  }, 2000);
}

function stopTimer(){
  clearInterval(timeOut);
}

$('.slider .thumbs').on('click', 'img', function(){
  stopTimer();
  var index = $(this).parent().index();
  $(".pictures").children().removeClass('current').eq(index).addClass("current");
  $(".thumbs").children().removeClass('current').eq(index).addClass("current");
  startTimer();
});

startTimer();

$('.rightarrow').on('click', function(){
  stopTimer();
  nextSlide();
  startTimer();
});

$('.leftarrow').on('click', function(){
  stopTimer();
  previousSlide();
  startTimer();
});

  // Choose room type
  $('.room-type').on('click', 'li', function(){
    var name = $(this).text();
    $(".room-name").text(name + "Room");
    var icon = $(this).find('.icon').css('background-image');
    icon = icon.replace('url(','').replace(')','').replace('2.png','.png');
    $('.icon-big').attr('src', icon);
    $('.room-type nav ul').children().removeClass('selected');
    $(this).addClass("selected");
    $('.right').addClass('slideup');
    setTimeout(function(){
      $('.right').removeClass('slideup');
    },500);

    // run dynamic user story for chosen room type
    if ($(this).index() === 0){
      friendStay(deluxe)();
    } else if ($(this).index() == 1){
      friendStay(shared)();
    } else if ($(this).index() == 2){
      friendStay(animal)();
    } else if ($(this).index() == 3){
      friendStay(another)();
    } else if ($(this).index() == 4){
      friendStay(other)();
    }

  });

  friendStay(animal)();

});