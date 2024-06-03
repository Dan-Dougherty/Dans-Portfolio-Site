function toggleMenu() {
    $('#nav-list').toggleClass('open');
    $('#hamburger-menu').toggleClass('open');
}

$(document).ready(function() {
    var headerHeight = $('header').outerHeight();

    // Smooth scrolling for internal links with hashes
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var targetId = $(this).attr('href').substring(1);
        var targetElement = $('#' + targetId);

        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - headerHeight
            }, 800);
        }
    });

    // Handle 'Work' link navigation from other pages
    $('#work-link').on('click', function(e) {
        if (window.location.pathname !== '/index.html') {
            e.preventDefault();
            localStorage.setItem('scrollTarget', $(this).data('target'));
            window.location.href = 'index.html';
        }
    });

    // Scroll to target element after page load
    var scrollTarget = localStorage.getItem('scrollTarget');
    if (scrollTarget) {
        var targetElement = $('#' + scrollTarget);
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - headerHeight
            }, 800);
        }
        localStorage.removeItem('scrollTarget');
    }
});

$(document).ready(function() {
    $(window).on('scroll', function() {
        $('.hidden').each(function() {
            var elementTop = $(this).offset().top;
            var viewportBottom = $(window).scrollTop() + $(window).height();

            if (elementTop < viewportBottom - 50) {
                $(this).addClass('fade-in');
            }
        });
    });
});

// Typewriter

$(document).ready(function() {
    var text = $('#typewriter').text();
    var index = 0;
    var speed = 100;

    function typeWriter() {
        if (index < text.length) {
            $('#typewriter').text(text.substring(0, index + 1));
            index++;
            setTimeout(typeWriter, speed);
        } else {
            $('#typewriter').addClass('finished'); // Add class to remove blinking caret
            $('#hero-paragraph').addClass('visible'); // Show the paragraph
            $('#hero-button').addClass('visible'); // Show the button
        }
    }

    // Clear the text initially and start the typewriter effect
    $('#typewriter').text('');
    typeWriter();

    // Fade in the image as the typewriter effect starts
    $('#personal-img').addClass('visible');
});