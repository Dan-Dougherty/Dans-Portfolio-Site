function toggleMenu() {
  $('#nav-list').toggleClass('open')
  $('#hamburger-menu').toggleClass('open')
}

$(document).ready(function () {
  var headerHeight = $('header').outerHeight()

  // Smooth scrolling for internal links with hashes
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault()

    var targetId = $(this).attr('href').substring(1)
    var targetElement = $('#' + targetId)

    if (targetElement.length) {
      $('html, body').animate(
        {
          scrollTop: targetElement.offset().top - headerHeight,
        },
        800
      )
    }
  })

// Handle 'Work' link navigation from other pages
  $('#work-link').on('click', function (e) {
    if (window.location.pathname !== '/index.html') {
      e.preventDefault()
      localStorage.setItem('scrollTarget', $(this).data('target'))
      window.location.href = 'index.html'
    }
  })

  // Scroll to target element after page load
  var scrollTarget = localStorage.getItem('scrollTarget')
  if (scrollTarget) {
    var targetElement = $('#' + scrollTarget)
    if (targetElement.length) {
      $('html, body').animate(
        {
          scrollTop: targetElement.offset().top - headerHeight,
        },
        800
      )
    }
    localStorage.removeItem('scrollTarget')
  }
})

$(document).ready(function () {
  $(window).on('scroll', function () {
    $('.hidden').each(function () {
      var elementTop = $(this).offset().top
      var viewportBottom = $(window).scrollTop() + $(window).height()

      if (elementTop < viewportBottom - 50) {
        $(this).addClass('fade-in')
      }
    })
  })
})

// Contact Form

$(document).ready(function () {
  $('.contact-form').on('submit', function (e) {
    e.preventDefault()

    // Simple validation
    var isValid = true
    $('.contact-form input, .contact-form textarea').each(function () {
      if ($(this).val() === '') {
        isValid = false
        $(this).css('border-color', 'red')
      } else {
        $(this).css('border-color', '#ccc')
      }
    })

    // Email validation
    var email = $('#email').val()
    var emailPattern =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/
    if (!emailPattern.test(email)) {
      isValid = false
      $('#email-error').show()
    } else {
      $('#email-error').hide()
    }

    if (isValid) {
      $('.contact-form').hide()
      $('.contact-container').append(
        '<p>Thank you for your message! I will get back to you soon.</p>'
      )
    }
  })
})

// Typewriter Effect

$(document).ready(function () {
  var text = $('#typewriter').text()
  var index = 0
  var speed = 75

  function typeWriter() {
    if (index < text.length) {
      $('#typewriter').text(text.substring(0, index + 1))
      index++
      setTimeout(typeWriter, speed)
    } else {
      $('#typewriter').addClass('finished')
      $('#hero-paragraph').addClass('visible')
      $('#hero-button').addClass('visible')
    }
  }

  // Clear the text initially and start the typewriter effect
  $('#typewriter').text('')
  typeWriter()

  // Fade in the image as the typewriter effect starts
  $('#personal-img').addClass('visible')
})

// Juxtapose

window.onload = function () {
  new juxtapose.JXSlider('#juxtapose-container', [
    {
      src: 'img/before.jpg',
      label: 'Before',
    },
    {
      src: 'img/after.jpg',
      label: 'After',
    },
  ])
}

// Game

let score = 0
let highScore = localStorage.getItem('highScore') || 0 // Retrieve high score from localStorage
let activeHole = null
let timer
const initialSpeed = 800 // Set a faster initial speed

// Display initial high score
document.getElementById('high-score').innerText = highScore

function showGame() {
  document.getElementById('game-container').style.display = 'flex' // Use 'flex' to enable flexbox centering
  startGame()
}

function hideGame() {
  document.getElementById('game-container').style.display = 'none'
  clearInterval(timer)
  resetGame()
}

function startGame() {
  clearInterval(timer) // Ensure any existing timer is cleared
  timer = setInterval(() => {
    const holes = document.querySelectorAll('.hole')
    if (activeHole) {
      activeHole.classList.remove('mole')
      endGame() // End game if the mole was not clicked
    }
    const randomIndex = Math.floor(Math.random() * holes.length)
    activeHole = holes[randomIndex]
    activeHole.classList.add('mole')
    activeHole.onclick = whackMole
  }, initialSpeed)
}

function whackMole() {
  score++
  document.getElementById('score').innerText = score
  activeHole.classList.remove('mole')
  activeHole.onclick = null
  activeHole = null
  if (timer === null) {
    startGame()
  }
}

function endGame() {
  clearInterval(timer)
  timer = null
  if (activeHole) {
    activeHole.classList.remove('mole')
    activeHole.onclick = null
  }
  if (score > highScore) {
    highScore = score
    document.getElementById('high-score').innerText = highScore
    localStorage.setItem('highScore', highScore) // Store high score in localStorage
  }
  alert('Game Over! Your score: ' + score + '. Click on a mole to restart.')
  resetGame()
}

function resetGame() {
  score = 0
  document.getElementById('score').innerText = score
  const holes = document.querySelectorAll('.hole')
  holes.forEach((hole) => {
    hole.classList.remove('mole')
    hole.onclick = null
  })
  activeHole = null
}

// Blog Archive # posts per page

document.addEventListener('DOMContentLoaded', function () {
  const postsPerPage = 4; // Number of posts per page
  const blogGrid = document.querySelector('.blog-grid');
  const posts = Array.from(blogGrid.children);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  let currentPage = 1;

  function displayPage(page) {
      blogGrid.innerHTML = '';
      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage;
      const paginatedPosts = posts.slice(start, end);
      paginatedPosts.forEach(post => blogGrid.appendChild(post));
      updatePaginationControls();
  }

  function updatePaginationControls() {
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = '';

      const prevPageLink = document.createElement('a');
      prevPageLink.href = '#';
      prevPageLink.textContent = '« Previous';
      prevPageLink.style.display = currentPage === 1 ? 'none' : 'inline-block';
      prevPageLink.addEventListener('click', function (e) {
          e.preventDefault();
          if (currentPage > 1) {
              currentPage--;
              displayPage(currentPage);
          }
      });

      pagination.appendChild(prevPageLink);

      for (let i = 1; i <= totalPages; i++) {
          const pageLink = document.createElement('a');
          pageLink.href = '#';
          pageLink.textContent = i;
          if (i === currentPage) {
              pageLink.classList.add('active');
          }
          pageLink.addEventListener('click', function (e) {
              e.preventDefault();
              currentPage = i;
              displayPage(currentPage);
          });
          pagination.appendChild(pageLink);
      }

      const nextPageLink = document.createElement('a');
      nextPageLink.href = '#';
      nextPageLink.textContent = 'Next »';
      nextPageLink.style.display = currentPage === totalPages ? 'none' : 'inline-block';
      nextPageLink.addEventListener('click', function (e) {
          e.preventDefault();
          if (currentPage < totalPages) {
              currentPage++;
              displayPage(currentPage);
          }
      });

      pagination.appendChild(nextPageLink);
  }

  displayPage(currentPage); // Initial display
});