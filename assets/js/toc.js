(function() {
  'use strict';

  function generateTOC() {
    var postContent = document.querySelector('.post-content');
    if (!postContent) return;

    var headings = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 2) return;

    var tocSidebar = document.querySelector('.toc-sidebar');
    var tocMobile = document.querySelector('.toc-mobile');

    if (!tocSidebar && !tocMobile) return;

    var tocItems = [];

    headings.forEach(function(heading, index) {
      if (!heading.id) {
        heading.id = 'heading-' + index;
      }

      var level = parseInt(heading.tagName.charAt(1));
      tocItems.push({
        id: heading.id,
        text: heading.textContent.trim(),
        level: level
      });
    });

    if (tocItems.length === 0) return;

    var tocHTML = buildTOCHTML(tocItems);

    if (tocSidebar) {
      var sidebarContainer = tocSidebar.querySelector('.toc-container');
      if (sidebarContainer) {
        var listContainer = sidebarContainer.querySelector('.toc-list-wrapper');
        if (listContainer) {
          listContainer.innerHTML = tocHTML;
        }
      }
      tocSidebar.style.display = '';
    }

    if (tocMobile) {
      var mobileContent = tocMobile.querySelector('.toc-mobile-content');
      if (mobileContent) {
        mobileContent.innerHTML = tocHTML;
      }
      tocMobile.style.display = '';
    }

    setupScrollSpy(headings);
    setupProgressBar();
    setupMobileToggle();
  }

  function buildTOCHTML(items) {
    if (items.length === 0) return '';

    var minLevel = Math.min.apply(null, items.map(function(item) { return item.level; }));

    var html = '<ul class="toc-list">';

    items.forEach(function(item) {
      var indent = item.level - minLevel;
      var paddingStyle = indent > 0 ? ' style="padding-left: ' + (indent * 0.75) + 'rem;"' : '';
      html += '<li' + paddingStyle + '>';
      html += '<a href="#' + item.id + '" data-target="' + item.id + '">' + escapeHTML(item.text) + '</a>';
      html += '</li>';
    });

    html += '</ul>';
    return html;
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function setupScrollSpy(headings) {
    var tocLinks = document.querySelectorAll('.toc-list a[data-target]');
    if (tocLinks.length === 0) return;

    var headingPositions = [];

    function updatePositions() {
      headingPositions = [];
      headings.forEach(function(heading) {
        headingPositions.push({
          id: heading.id,
          top: heading.getBoundingClientRect().top + window.pageYOffset - 100
        });
      });
    }

    updatePositions();

    var resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updatePositions, 100);
    });

    function highlightCurrentSection() {
      var scrollPosition = window.pageYOffset;
      var currentId = null;

      // Check if we're at the bottom of the page
      var isAtBottom = (window.innerHeight + window.pageYOffset) >= (document.body.scrollHeight - 50);

      if (isAtBottom && headingPositions.length > 0) {
        // If at the bottom, highlight the last heading
        currentId = headingPositions[headingPositions.length - 1].id;
      } else {
        for (var i = headingPositions.length - 1; i >= 0; i--) {
          if (scrollPosition >= headingPositions[i].top) {
            currentId = headingPositions[i].id;
            break;
          }
        }

        if (!currentId && headingPositions.length > 0) {
          currentId = headingPositions[0].id;
        }
      }

      tocLinks.forEach(function(link) {
        if (link.getAttribute('data-target') === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    var scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(highlightCurrentSection);
    });

    highlightCurrentSection();

    tocLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-target');
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          history.pushState(null, null, '#' + targetId);

          var mobileContent = document.querySelector('.toc-mobile-content');
          var mobileToggle = document.querySelector('.toc-mobile-toggle');
          if (mobileContent && mobileContent.classList.contains('open')) {
            mobileContent.classList.remove('open');
            if (mobileToggle) {
              mobileToggle.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });
  }

  function setupProgressBar() {
    var progressBar = document.querySelector('.toc-progress-bar');
    if (!progressBar) return;

    var postContent = document.querySelector('.post-content');
    if (!postContent) return;

    function updateProgress() {
      var contentRect = postContent.getBoundingClientRect();
      var contentTop = contentRect.top + window.pageYOffset;
      var contentHeight = contentRect.height;
      var scrollPosition = window.pageYOffset;
      var windowHeight = window.innerHeight;

      var progress = (scrollPosition - contentTop + windowHeight * 0.3) / contentHeight;
      progress = Math.max(0, Math.min(1, progress));

      progressBar.style.width = (progress * 100) + '%';
    }

    var scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(updateProgress);
    });

    updateProgress();
  }

  function setupMobileToggle() {
    var toggle = document.querySelector('.toc-mobile-toggle');
    var content = document.querySelector('.toc-mobile-content');

    if (!toggle || !content) return;

    toggle.addEventListener('click', function() {
      var isExpanded = content.classList.contains('open');
      content.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateTOC);
  } else {
    generateTOC();
  }
})();
