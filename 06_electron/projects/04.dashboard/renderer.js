console.log('Renderer loaded');

window.api.getConfig().then(render);

function getColorClass(percent) {
  if (percent < 25) return 'green';
  if (percent < 65) return 'yellow';
  return 'red';
}

function updateBar(barEl, percent) {
  barEl.style.width = `${percent}%`;
  barEl.className = `bar ${getColorClass(percent)}`;
}

function render(config) {
  // update title
  document.title = config.title;
  document.getElementById('page-title').textContent = `Welcome to ${config.title}`;

  // CPU
  const cpu = config.cpu;
  document.getElementById('cpu-value').textContent = `${cpu.toFixed(1)}%`;
  updateBar(document.getElementById('cpu-bar'), cpu);

  // Memory
  const { used, total } = config.memory;
  const memPercent = (used / total) * 100;
  document.getElementById('memory-value').textContent = `${used} MB / ${total} MB (${memPercent.toFixed(1)}%)`;
  updateBar(document.getElementById('memory-bar'), memPercent);
}

