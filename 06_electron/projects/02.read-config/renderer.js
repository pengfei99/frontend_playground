function render(config) {
  document.title = config.title || 'App';
  document.getElementById('page-title').innerText = config.title || 'Untitled';

  const container = document.getElementById('content');
  container.innerHTML = '';

  config.widgets.forEach(widget => {
    let el;

    switch (widget.type) {
      case 'text':
        el = document.createElement('p');
        el.textContent = widget.value;
        break;
      case 'link':
        el = document.createElement('a');
        el.href = widget.url;
        el.textContent = widget.label;
        el.target = '_blank';
        break;
      case 'button':
        el = document.createElement('button');
        el.className = widget.className || 'btn';

        // Create button content with optional image
        if (widget.image) {
          // Create a container for better alignment of image and text
          const contentContainer = document.createElement('span');
          contentContainer.className = 'button-content';

          // Create and configure the image
          const img = document.createElement('img');
          img.src = widget.image;
          img.alt = widget.imageAlt || '';
          img.className = 'button-icon';

          // Set image size if provided
          if (widget.imageWidth) img.width = widget.imageWidth;
          if (widget.imageHeight) img.height = widget.imageHeight;

          // Add image to container
          contentContainer.appendChild(img);

          // Add a space between image and text
          const spacer = document.createElement('span');
          spacer.innerHTML = '&nbsp;';
          contentContainer.appendChild(spacer);

          // Add text if provided
          if (widget.label) {
            const textSpan = document.createElement('span');
            textSpan.textContent = widget.label;
            contentContainer.appendChild(textSpan);
          }

          // Add the content container to the button
          el.appendChild(contentContainer);
        } else {
          // No image, just set the text content
          el.textContent = widget.label || 'Button';
        }
        // 
        if (widget.action) {
          el.addEventListener('click', () => {
            if (widget.action === 'send-event') {
              // Send an event to the main process
              window.electronAPI.sendEvent(widget.eventName, widget.eventData);
            } 
          });
        }
        break;
    }

    if (el) container.appendChild(el);
  });
}

// Accesses the electronAPI object that was exposed to the renderer process through the preload script
// getConfig() and onConfigUpdated() are methods defined in the preload script
// getConfig() is an asynchronous function that retrieves the configuration object from the main process
// .then(render) attaches a success callback to the Promise returned by getConfig(). It means that when the Promise 
// resolves, the render function will be called with the configuration object as its argument.
// This is equivalent to .then(config => render(config)) but shorter, 
window.electronAPI.getConfig().then(render);
window.electronAPI.onConfigUpdated(render);
