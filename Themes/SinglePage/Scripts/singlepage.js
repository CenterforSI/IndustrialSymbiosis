//change active nav class on click - in global scope
function navActive(element) {
    element = element.replace('index.html', '');
    var navLinks = $('#singlepagenav ul.nav li.nav-item a.nav-link');
    var linkIndex;
    var clickedLink = element.split('#')[1];
    for (var k = 0; k < navLinks.length; k++) {
        if (clickedLink === navLinks[k].href.split('#')[1]) {
            linkIndex = k;
            $(navLinks[k]).addClass('active');
        }
    }
    for (var j = 0; j < navLinks.length; j++) {
        if ($(element)[0].href === navLinks[j].href) {
            linkIndex = j;
        }
    }
    navLinks.splice(linkIndex, 1);
    navLinks.removeClass('active');
}
//define global variable for form refresh and handle no-refresh on click with iframe


$(document).ready(function () {

    var width = $(document).width();
    $("a[data-toggle='collapse']").click(function () {
        $(this).children(".arrow").toggle();
    })

    //sticky topnav
    $('.widget-singlepage').Stickyfill();

    //Progress bar
    $(window).scroll(function () {
        var s = $(window).scrollTop(),
              d = $(document).height(),
              c = $(window).height();
        scrollPercent = (s / (d - c)) * 100;
        var position = scrollPercent;

        $("#progressbar").attr('value', position);

    });

    $('.widget-content').magnificPopup({
        delegate: 'a.lightbox', // child items selector, by clicking on it popup will open
        type: 'image'
    });

    //scrollspy offset
    $('a.nav-link').on('click', function (e) {
        e.preventDefault();
        var navHeight = 0 - $('#layout-navigation').height();
        var hreff = $(this).attr('href');
        hreff = hreff.replace('index.html', '');
        $(hreff)[0].scrollIntoView();
        scrollBy(0, navHeight);
        var headingClicked = $(this).attr('href');
        setTimeout(navActive, 20, headingClicked);
        //e.preventDefault();
        
    });
    $('.carousel').bcSwipe({ threshold: 50 });
});




//adjust accordion spacing on widget-expanding-section
$('article.widget-expanding-section .col-md-8.lead a.collapse-link').click(function () {
    var columnFour = $(this).parent().parent().children('div.col-md-4.lead-image');
    var allChildren = $(this).parent().children();
    var totalHeight = 0;
    for (i = 0; i < allChildren.length; i++) {
        totalHeight += allChildren[i].offsetHeight;
    }
    if ($(window).width() > 768 && $(this)[0].attributes['aria-expanded'].value === 'false') {
        columnFour.css('height', totalHeight);
    } else if ($(window).width() > 768 && $(this)[0].attributes['aria-expanded'].value === 'true') {
        columnFour.css('height', '100%');
    }
})
$(window).resize(function () {
    if ($(window).width() <= 768) {
        $('article.widget-expanding-section .col-md-4.lead-image').css('height', '100%');
    }
})

$('body').scrollspy({ target: '.widget-navigation' })
