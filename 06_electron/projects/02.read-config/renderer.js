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
            } else if (widget.action === 'open-url' && widget.url) {
              // Open a URL
              window.open(widget.url, '_blank');
            } else if (widget.action === 'custom' && widget.callback) {
              // Execute custom function from config
              try {
                // Be careful with this approach - using Function constructor for dynamic code
                // This could pose security risks if config is from untrusted sources
                const customFn = new Function('data', widget.callback);
                customFn(widget.callbackData);
              } catch (err) {
                console.error('Error executing custom button action:', err);
              }
            }
          });
        }
        break;
    }

    if (el) container.appendChild(el);
  });
}

window.electronAPI.getConfig().then(render);
window.electronAPI.onConfigUpdated(render);
