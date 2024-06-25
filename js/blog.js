// Blog Archive # posts per page

document.addEventListener('DOMContentLoaded', function () {
    const postsPerPage = 6; // Number of posts per page
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

// Display if only 1 or 2 blog posts on page

  document.addEventListener('DOMContentLoaded', function () {
    function applyBlogPostStyles() {
        var blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            var postCount = blogGrid.children.length;
            if (postCount === 1) {
                blogGrid.classList.add('single-post');
                blogGrid.classList.remove('two-posts');
            } else if (postCount === 2) {
                blogGrid.classList.add('two-posts');
                blogGrid.classList.remove('single-post');
            } else {
                blogGrid.classList.remove('single-post', 'two-posts');
            }
        }
    }

    applyBlogPostStyles(); // Apply styles on page load

    // Attach event listeners to pagination links
    var paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            // Simulate content loading
            setTimeout(function () {
                applyBlogPostStyles();
            }, 100); // Delay to ensure the new content is loaded
        });
    });
});

// Arrange blog posts based on date

document.addEventListener('DOMContentLoaded', function () {
    var blogGrid = document.querySelector('.blog-grid');
    if (blogGrid) {
        var blogPosts = Array.from(blogGrid.children);
        blogPosts.sort(function (a, b) {
            return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
        });
        blogPosts.forEach(function (post) {
            blogGrid.appendChild(post);
        });

        var postCount = blogGrid.children.length;
        if (postCount === 1) {
            blogGrid.classList.add('single-post');
        } else if (postCount === 2) {
            blogGrid.classList.add('two-posts');
        }
    }
});




