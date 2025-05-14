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
    }

    if (el) container.appendChild(el);
  });
}

window.electronAPI.getConfig().then(render);
window.electronAPI.onConfigUpdated(render);
