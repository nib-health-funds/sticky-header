# sticky-header

A header that's always on screen after the user has scrolled below the header's natural position.

## Example 

HTML:

    <div class="sticky-header js-sticky-header">
      Header
    </div>
    
JavaScript:

    var stickyheader = require('sticky-header');
    var element = document.querySelector('.js-sticky-header');
    
    stickyheader(element);