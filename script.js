// ── Toggle light labels ──────────────────────────────────────────────
document.querySelectorAll('.toggle-input').forEach(toggle => {
  toggle.addEventListener('change', () => {
    const label = toggle.closest('.room-control')?.querySelector('.control-label');
    if (label) {
      label.textContent = toggle.checked ? 'Light (On)' : 'Light (Off)';
      label.style.color = toggle.checked ? '#9333ea' : '';
    }
    const deviceInfo = toggle.closest('.device-item')?.querySelector('.device-info span');
    // no text change for device items, just visual
  });
  // Init state
  const label = toggle.closest('.room-control')?.querySelector('.control-label');
  if (label && toggle.checked) {
    label.textContent = 'Light (On)';
    label.style.color = '#9333ea';
  }
});

// ── AC temperature control ───────────────────────────────────────────
const acRange = document.getElementById('ac-range');
const acDisplay = document.getElementById('ac-display');
const acToggle = document.getElementById('ac-toggle');

function updateACDisplay(val) {
  acDisplay.textContent = `${val}°C`;
}

if (acRange) {
  acRange.addEventListener('input', () => {
    updateACDisplay(acRange.value);
  });
}

window.adjustTemp = function (delta) {
  if (!acToggle.checked) return;
  const newVal = Math.min(30, Math.max(16, parseInt(acRange.value) + delta));
  acRange.value = newVal;
  updateACDisplay(newVal);
};

if (acToggle) {
  acToggle.addEventListener('change', () => {
    const acCard = acToggle.closest('.ac-card');
    if (!acToggle.checked) {
      acDisplay.textContent = 'Off';
      acDisplay.style.color = '#9ca3af';
    } else {
      updateACDisplay(acRange.value);
      acDisplay.style.color = '';
    }
  });
}

// ── Scene selection ───────────────────────────────────────────────────
document.querySelectorAll('.scene-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.scene-card').forEach(c => c.classList.remove('active-scene'));
    card.classList.add('active-scene');
  });
});

// ── Nav item active state ─────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});

// ── Dots menu (simple tooltip) ────────────────────────────────────────
document.querySelectorAll('.dots-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const existing = document.querySelector('.dots-menu');
    if (existing) { existing.remove(); return; }

    const menu = document.createElement('div');
    menu.className = 'dots-menu';
    menu.innerHTML = `
      <button>Rename</button>
      <button>Settings</button>
      <button>Remove</button>
    `;
    Object.assign(menu.style, {
      position: 'absolute',
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      padding: '6px 0',
      zIndex: '999',
      minWidth: '130px',
    });
    menu.querySelectorAll('button').forEach(b => {
      Object.assign(b.style, {
        display: 'block',
        width: '100%',
        padding: '8px 16px',
        border: 'none',
        background: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        fontSize: '13px',
        color: '#1f2937',
      });
      b.addEventListener('mouseover', () => b.style.background = '#f3e8ff');
      b.addEventListener('mouseout', () => b.style.background = 'none');
    });

    const rect = btn.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY + 4}px`;
    menu.style.left = `${rect.left + window.scrollX - 80}px`;
    document.body.appendChild(menu);

    document.addEventListener('click', () => menu.remove(), { once: true });
  });
});

// ── Search filter ─────────────────────────────────────────────────────
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.room-card').forEach(card => {
      const name = card.querySelector('.room-name')?.textContent.toLowerCase() || '';
      card.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
  });
}

// ── Download button ───────────────────────────────────────────────────
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    // Simple feedback animation
    const orig = downloadBtn.textContent;
    downloadBtn.textContent = '✓ Downloaded!';
    downloadBtn.style.background = '#16a34a';
    setTimeout(() => {
      downloadBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download`;
      downloadBtn.style.background = '';
    }, 2000);
  });
}
