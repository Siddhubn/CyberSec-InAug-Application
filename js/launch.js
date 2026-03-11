const deviceStatus = document.getElementById('deviceStatus');
const launchSequence = document.getElementById('launchSequence');
let launched = false;

function renderStatus(status) {
  deviceStatus.innerHTML = '';
  let allAuth = true;
  let authCount = 0;
  const roleNames = {
    principal: 'Principal',
    coordinator1: 'Club Coordinator 1',
    coordinator2: 'Club Coordinator 2',
    coordinator3: 'Club Coordinator 3',
    hod1: 'HOD 1',
    hod2: 'HOD 2',
    president: 'President'
  };
  Object.entries(status).forEach(([dev, val]) => {
    const div = document.createElement('div');
    div.className = 'device-status ' + (val ? 'auth' : 'unauth');
    div.innerHTML = `<b>${roleNames[dev] || dev}</b><br>${val ? '✅' : '❌'}`;
    deviceStatus.appendChild(div);
    if (val) authCount++;
    if (!val) allAuth = false;
  });
  // Show summary
  const authSummary = document.getElementById('authSummary');
  const now = new Date();
  authSummary.innerHTML = `<span style="font-size:1.3em;color:#0ff;">Authorized: <b>${authCount} / 7</b></span> <span style="font-size:0.9em;color:#888;">(Last update: ${now.toLocaleTimeString()})</span>`;
  if (allAuth && !launched) {
    launched = true;
    startLaunchSequence();
  }
}

function pollStatus() {
  fetch('http://' + location.hostname + ':5000/status')
    .then(r => r.json())
    .then(renderStatus);
}
setInterval(pollStatus, 2000);
pollStatus();

function startLaunchSequence() {
  deviceStatus.style.display = 'none';
  launchSequence.style.display = 'block';
  let logs = [
    'Initializing CyberSec Club Systems...',
    'Booting up security modules...',
    'Establishing encrypted channels...',
    'Verifying device integrity...',
    'All devices authenticated!',
    'Launching sequence...'
  ];
  let i = 0;
  function showLog() {
    if (i < logs.length) {
      launchSequence.innerHTML += `<div class="boot-log">${logs[i]}</div>`;
      i++;
      setTimeout(showLog, 800);
    } else {
      setTimeout(startCountdown, 1000);
    }
  }
  showLog();
}
function startCountdown() {
  launchSequence.innerHTML = '';
  let count = 5;
  function next() {
    if (count > 0) {
      launchSequence.innerHTML = `<div class="countdown-glitch">${count}</div>`;
      count--;
      setTimeout(next, 700);
    } else {
      showLogo();
    }
  }
  next();
}
function showLogo() {
  launchSequence.innerHTML = `
    <div class="matrix-bg"></div>
    <img src="cybersec.png" class="cyber-logo-glow" style="width:180px;filter:drop-shadow(0 0 40px #0ff);">
    <div class="holo-text">CyberSec Club, Atria IT – Officially Launched 🚀</div>
  `;
  // Matrix code effect
  const matrixBg = document.querySelector('.matrix-bg');
  if (matrixBg) {
    let cols = 40, rows = 20;
    let html = '';
    for (let r=0; r<rows; r++) {
      for (let c=0; c<cols; c++) {
        html += `<span style="color:#0f0;opacity:${Math.random()}">${String.fromCharCode(0x30A0 + Math.floor(Math.random()*96))}</span>`;
      }
      html += '<br>';
    }
    matrixBg.innerHTML = html;
    matrixBg.style.position = 'absolute';
    matrixBg.style.top = 0;
    matrixBg.style.left = 0;
    matrixBg.style.width = '100%';
    matrixBg.style.height = '100%';
    matrixBg.style.zIndex = '-1';
    matrixBg.style.pointerEvents = 'none';
    matrixBg.style.background = 'rgba(0,0,0,0.8)';
    matrixBg.style.fontSize = '1em';
    matrixBg.style.lineHeight = '1em';
  }
}
