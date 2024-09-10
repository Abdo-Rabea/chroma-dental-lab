// todo: delete me in production
const observer = new MutationObserver((mutationsList, observer) => {
  const el = document.querySelector('[aria-label="Tanstack query devtools"]');
  if (el) {
    el.style.direction = 'ltr';
    // Stop observing once the element is found and updated
    observer.disconnect();
  }
});

// Start observing the document for changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });
