console.log('Renderer loaded');

window.api.getConfig().then(render);

function render(config) {

// CPU
const cpu = config.cpu;
document.getElementById('cpu-value').textContent = `${cpu.toFixed(1)}%`;
document.getElementById('cpu-bar').style.width = `${cpu}%`;

// Memory
const { used, total } = config.memory;
const memPercent = (used / total) * 100;
document.getElementById('memory-value').textContent = `${used} MB / ${total} MB (${memPercent.toFixed(1)}%)`;
document.getElementById('memory-bar').style.width = `${memPercent}%`;
}

