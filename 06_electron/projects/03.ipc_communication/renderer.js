document.getElementById('send').addEventListener('click', () => {
  window.api.sendLog('Hello from Renderer');
});

document.getElementById('time').addEventListener('click', async () => {
  const time = await window.api.getTime();
  document.getElementById('output').innerText = `Time: ${time}`;
});

window.api.onMainMessage((msg) => {
  document.getElementById('output').innerText = `Main says: ${msg}`;
});
