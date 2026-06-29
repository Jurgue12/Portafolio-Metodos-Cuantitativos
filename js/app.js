(() => {
  'use strict';

  const TOPICS = [
    { id: 'markov', num: '01', title: 'Análisis Markov', desc: 'Cuota de mercado retail en Limón', result: '49.24%', done: true, href: '#markov' },
    { id: 'control', num: '02', title: 'Control Estadístico', desc: 'Corte preciso de alambre', result: 'Bajo control', done: true, href: '#control' },
    { id: 'simulation', num: '03', title: 'Simulación Monte Carlo', desc: 'Terminal de aduanas', result: '3 escenarios', done: true, href: '#simulation' },
    { id: 'networks', num: '04', title: 'Modelos de Redes', desc: 'Dijkstra y Kruskal', result: '9 km / 17 km', done: true, href: '#networks' },
    { id: 'transport', num: '05', title: 'Transporte y Asignación', desc: 'Distribución desde Moín', result: '₡3.31M', done: true, href: '#transport' },
    { id: 'programming', num: '06', title: 'Programación', desc: 'Metas, no lineal y entera', result: 'Z = $526.75 / $390', done: true, href: '#programming' },
  ];

  const MARKOV = {
    chains: ['Maxi Palí', 'Megasuper', 'Locales'],
    colors: ['#00d4aa', '#f0a500', '#7c8db5'],
    P: [[0.88, 0.07, 0.05], [0.10, 0.85, 0.05], [0.15, 0.10, 0.75]],
    initial: [0.45, 0.35, 0.20],
    steady: [0.4924, 0.3409, 0.1667],
    maxPeriod: 10,
  };

  function multiplyMarkov(v, P) {
    return [0, 1, 2].map(j => v.reduce((s, vi, i) => s + vi * P[i][j], 0));
  }

  function computeMarkovStates() {
    const states = [MARKOV.initial];
    for (let n = 0; n < MARKOV.maxPeriod; n++) {
      states.push(multiplyMarkov(states[n], MARKOV.P));
    }
    return states;
  }

  const MARKOV_STATES = computeMarkovStates();

  const SIM = {
    a: {
      data: [{ x: 15, f: 20 }, { x: 30, f: 40 }, { x: 45, f: 30 }, { x: 60, f: 10 }],
      rn: [25, 88, 12, 65, 92, 8, 45, 73, 19, 54],
      theoretical: 34.5,
      unit: 'min',
    },
    b: {
      data: [{ x: 50, f: 15 }, { x: 100, f: 45 }, { x: 150, f: 30 }, { x: 200, f: 10 }],
      rn: [50, 10, 85, 42, 95, 22, 67, 5, 33, 78],
      theoretical: 117.5,
      unit: 'u',
    },
    c: {
      data: [{ x: 10, f: 30 }, { x: 20, f: 40 }, { x: 30, f: 20 }, { x: 40, f: 10 }],
      rn: [75, 18, 55, 32, 91, 4, 61, 89, 27, 49],
      theoretical: 21,
      unit: 'días',
    },
  };

  const NETWORK = {
    nodes: [
      { id: 'A', x: 80, y: 190, label: 'A' },
      { id: 'B', x: 200, y: 80, label: 'B' },
      { id: 'C', x: 280, y: 190, label: 'C' },
      { id: 'D', x: 200, y: 300, label: 'D' },
      { id: 'E', x: 420, y: 80, label: 'E' },
      { id: 'F', x: 500, y: 190, label: 'F' },
    ],
    edges: [
      { from: 'A', to: 'B', w: 7 },
      { from: 'A', to: 'C', w: 5 },
      { from: 'A', to: 'D', w: 6 },
      { from: 'B', to: 'C', w: 2 },
      { from: 'B', to: 'E', w: 4 },
      { from: 'C', to: 'D', w: 3 },
      { from: 'C', to: 'E', w: 6 },
      { from: 'C', to: 'F', w: 4 },
      { from: 'D', to: 'F', w: 8 },
      { from: 'E', to: 'F', w: 3 },
    ],
    shortest: [['A', 'C'], ['C', 'F']],
    mst: [['B', 'C'], ['C', 'D'], ['E', 'F'], ['C', 'F'], ['A', 'C']],
  };

  const TRANSPORT = {
    origins: ['Moín', 'Cieneguita', 'Liverpool'],
    dests: ['Limón C.', 'Siquirres', 'Guápiles', 'Talamanca'],
    profit: [[16, 11, 8, 5], [15, 12, 9, 6], [14, 13, 10, 7]],
    supply: [120, 100, 80],
    demand: [70, 90, 80, 60],
    solution: [[70, 50, 0, 0], [0, 40, 60, 0], [0, 0, 20, 60]],
  };

  const ASSIGN = {
    trucks: ['Camión 1', 'Camión 2', 'Camión 3', 'Camión 4'],
    routes: ['Limón C.', 'Siquirres', 'Guápiles', 'Talamanca'],
    matrix: [[90, 75, 70, 60], [80, 88, 82, 74], [70, 78, 92, 85], [75, 80, 86, 95]],
    optimal: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
  };

  const CONTROL = {
    samples: 24,
    n: 4,
    constants: { A2: 0.729, D3: 0, D4: 2.282 },
    xbar: [3.25, 3.11, 3.22, 3.39, 3.07, 2.86, 3.05, 2.65, 3.02, 2.85, 2.83, 2.97, 3.11, 2.83, 3.12, 2.86, 2.86, 2.74, 3.13, 2.89, 2.65, 3.28, 2.94, 2.64],
    r: [0.71, 1.18, 1.43, 1.26, 1.17, 0.32, 0.53, 1.13, 0.71, 1.33, 1.17, 0.40, 0.85, 1.31, 1.06, 0.50, 1.43, 1.29, 1.41, 1.09, 1.08, 0.46, 1.58, 0.97],
    xbarBar: 2.972,
    rBar: 1.015,
    limits: {
      xbar: { lci: 2.231, lc: 2.972, lcs: 3.712 },
      r: { lci: 0, lc: 1.015, lcs: 2.317 },
    },
  };

  
  let markovPeriod = 0;
  let markovChart = null;
  let controlXbarChart = null;
  let controlRChart = null;
  let nonlinearChart = null;
  let integerChart = null;
  let currentSolutionId = null;

  function wrapWideTables(root = document) {
    const scrollHost = '.table-scroll-wrap, .matrix-wrap, .markov-forecast-wrap, .transport-scroll-wrap, .control-table-wrap, .scroll-x-host';
    const selector = [
      '.panel .data-table:not(.control-sample-table)',
      '.panel .resource-table',
      '#markovForecastTable table',
      '#controlStats table',
      '.step-body table',
      '.solution-content table',
    ].join(', ');

    root.querySelectorAll(selector).forEach((table) => {
      if (table.closest(scrollHost)) return;
      const wrap = document.createElement('div');
      wrap.className = 'table-scroll-wrap scroll-x-host';
      table.parentElement.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  function fixMobileTableScroll() {
    const hosts = document.querySelectorAll(
      '.table-scroll-wrap, .matrix-wrap, .markov-forecast-wrap, .transport-scroll-wrap, .control-table-wrap'
    );

    hosts.forEach((host) => {
      host.classList.add('scroll-x-host');
      const inner = host.querySelector('table, .transport-grid');
      if (!inner) return;

      inner.style.width = 'max-content';
      inner.style.minWidth = '100%';
      inner.style.maxWidth = 'none';

      const needsScroll = inner.scrollWidth > host.clientWidth + 4;
      host.classList.toggle('has-scroll', needsScroll);
      if (needsScroll) {
        inner.style.minWidth = `${inner.scrollWidth}px`;
      }
    });
  }

  let scrollFixTimer;
  function scheduleScrollFix() {
    clearTimeout(scrollFixTimer);
    scrollFixTimer = setTimeout(fixMobileTableScroll, 50);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initTheme();
    initCursor();
    initHeroCanvas();
    initNav();
    initReveal();
    initOverview();
    initResumenesPdf();
    initExerciseUI();
    initExerciseLayout();
    initTopicVideos();
    initStudentVideos();
    initHistoryVideoModal();
    initSolutionModal();
    initMarkov();
    initControl();
    initSimulation();
    initNetwork();
    initTransport();
    initProgramming();
    initTabs();
    initCounters();
    initPresentationSection();
    wrapWideTables();
    scheduleScrollFix();
    window.addEventListener('resize', scheduleScrollFix, { passive: true });
  });

  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('hidden');
      scheduleScrollFix();
    }, 1200);
  }

  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('decisionlab-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('decisionlab-theme', next);
      updateChartThemes();
    });
  }

  function getChartColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      text: isLight ? '#4a5f78' : '#8b9cb3',
      grid: isLight ? 'rgba(10,22,40,0.08)' : 'rgba(255,255,255,0.06)',
    };
  }

  function updateChartThemes() {
    const c = getChartColors();
    [markovChart, controlXbarChart, controlRChart, nonlinearChart, integerChart].forEach(ch => {
      if (!ch) return;
      if (ch.options.scales?.x?.ticks) ch.options.scales.x.ticks.color = c.text;
      if (ch.options.scales?.y?.ticks) ch.options.scales.y.ticks.color = c.text;
      if (ch.options.scales?.y?.grid) ch.options.scales.y.grid.color = c.grid;
      if (ch.options.plugins?.legend?.labels) ch.options.plugins.legend.labels.color = c.text;
      ch.update();
    });
  }

  function initCursor() {
    const glow = document.getElementById('cursorGlow');
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, t = 0;

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    function draw() {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const yBase = H * (0.3 + i * 0.12);
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 4) {
          const y = yBase + Math.sin(x * 0.008 + t + i) * 30 + Math.sin(x * 0.015 + t * 0.7) * 15;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0, 212, 170, ${0.08 + i * 0.04})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      t += 0.012;
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  function initNav() {
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav-links a');
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

    links.forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    const sections = document.querySelectorAll('section[id], header[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));

    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 50
        ? 'rgba(6, 13, 24, 0.92)'
        : 'rgba(6, 13, 24, 0.75)';
    });
  }

  function initReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    window.observeReveal = (el) => {
      if (!el || el.classList.contains('visible')) return;
      observer.observe(el);
    };

    document.querySelectorAll('.reveal').forEach(el => window.observeReveal(el));
  }

  function initCounters() {
    const stats = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        let current = 0;
        const step = () => {
          current += target / 30;
          if (current >= target) { el.textContent = target; return; }
          el.textContent = Math.floor(current);
          requestAnimationFrame(step);
        };
        step();
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(s => observer.observe(s));
  }

  function initOverview() {
    const pills = document.getElementById('topicPills');
    const cards = document.getElementById('topicCards');

    TOPICS.forEach(t => {
      pills.innerHTML += `<span class="pill ${t.done ? 'done' : 'pending'}">${t.title}</span>`;
      cards.innerHTML += `
        <a href="${t.href}" class="topic-card ${t.done ? '' : 'pending-card'}">
          <div class="card-num">${t.num}</div>
          <h4>${t.title}</h4>
          <p>${t.desc}</p>
          <div class="card-result">${t.result}</div>
        </a>`;
    });

    const done = TOPICS.filter(t => t.done).length;
    const total = TOPICS.length;
    const progressNum = document.getElementById('progressNum');
    const progressRing = document.getElementById('progressRing');
    if (progressNum) progressNum.textContent = `${done}/${total}`;
    if (progressRing) progressRing.style.strokeDashoffset = String(327 * (1 - done / total));
  }

  function initResumenesPdf() {
    const cfg = PORTFOLIO_CONFIG.resumenesPdf;
    if (!cfg?.file) return;

    const file = cfg.file;
    const titleEl = document.getElementById('resumenesPdfTitle');
    const descEl = document.getElementById('resumenesPdfDesc');
    const viewEl = document.getElementById('resumenesPdfView');
    const downloadEl = document.getElementById('resumenesPdfDownload');

    if (titleEl) titleEl.textContent = file;
    if (descEl && cfg.description) descEl.textContent = cfg.description;

    [viewEl, downloadEl].forEach(el => {
      if (!el) return;
      el.href = file;
      if (el.hasAttribute('download')) el.setAttribute('download', file);
    });

    document.querySelectorAll('#resumenesPdfCardPresentacion a').forEach(el => {
      el.href = file;
      if (el.hasAttribute('download')) el.setAttribute('download', file);
    });
  }

  
  function initExerciseUI() {
    Object.entries(EXERCISE_CONTEXTS).forEach(([key, text]) => {
      const el = document.getElementById('ctx-' + key);
      if (el) el.innerHTML = `<p>${text}</p>`;
    });

    const toolbars = {
      markov: [{ id: 'markov', label: 'Solución paso a paso — Markov' }],
      control: [{ id: 'control', label: 'Solución — Control estadístico' }],
      simulation: [
        { id: 'sim-a', label: 'Solución Parte A · Colas' },
        { id: 'sim-b', label: 'Solución Parte B · Insumos' },
        { id: 'sim-c', label: 'Solución Parte C · Mantenimiento' },
      ],
      networks: [{ id: 'networks', label: 'Solución paso a paso — Redes' }],
      transport: [
        { id: 'trans-vogel', label: 'Solución · Transporte Vogel' },
        { id: 'trans-assign', label: 'Solución · Asignación camiones' },
      ],
      programming: [
        { id: 'prog-goals', label: 'Solución · Por metas' },
        { id: 'prog-nonlinear', label: 'Solución · No lineal' },
        { id: 'prog-integer', label: 'Solución · Entera textil' },
      ],
    };

    Object.entries(toolbars).forEach(([key, buttons]) => {
      const tb = document.getElementById('toolbar-' + key);
      if (!tb) return;
      tb.innerHTML = buttons.map(b => `
        <button type="button" class="btn-solution" data-solution="${b.id}">
          <span class="btn-icon">◈</span> ${b.label}
        </button>`).join('');
    });

    document.querySelectorAll('.btn-solution').forEach(btn => {
      btn.addEventListener('click', () => openSolution(btn.dataset.solution));
    });
  }

  function initExerciseLayout() {
    const keys = ['markov', 'control', 'simulation', 'networks', 'transport', 'programming'];
    keys.forEach(key => {
      const ctx = document.getElementById('ctx-' + key);
      const toolbar = document.getElementById('toolbar-' + key);
      if (!ctx || !toolbar || ctx.closest('.exercise-resolution-block')) return;

      const workspace = document.createElement('div');
      workspace.className = 'exercise-workspace';

      let node = ctx.nextElementSibling;
      while (node && node !== toolbar) {
        const next = node.nextElementSibling;
        workspace.appendChild(node);
        node = next;
      }

      const block = document.createElement('div');
      block.className = 'exercise-resolution-block reveal';
      block.appendChild(workspace);

      const footer = document.createElement('div');
      footer.className = 'exercise-resolution-footer';
      footer.appendChild(toolbar);
      block.appendChild(footer);

      ctx.insertAdjacentElement('afterend', block);
      if (window.observeReveal) window.observeReveal(block);
    });
  }

  function initStudentVideos() {
    const videos = PORTFOLIO_CONFIG.studentVideos;
    if (!videos) return;

    const embedMode = useYoutubeEmbed();

    Object.entries(videos).forEach(([key, video]) => {
      if (!video?.id) return;

      const ctx = document.getElementById('ctx-' + key);
      if (!ctx) return;

      const section = ctx.closest('.section') || ctx.parentElement;
      const resolutionBlock = section?.querySelector('.exercise-resolution-block');
      if (!resolutionBlock) return;

      const panel = document.createElement('aside');
      panel.className = 'topic-video-panel topic-video-panel-student reveal';
      panel.innerHTML = buildStudentVideoPanel(video, key, embedMode);
      resolutionBlock.insertAdjacentElement('afterend', panel);
      if (window.observeReveal) window.observeReveal(panel);
      else panel.classList.add('visible');

      if (embedMode) {
        panel.querySelectorAll('.yt-play-trigger').forEach(btn => {
          btn.addEventListener('click', () => {
            const wrap = btn.closest('.topic-video-embed');
            mountYoutubeEmbed(wrap, btn.dataset.videoId, btn.dataset.videoTitle, true);
          });
        });
      }
    });
  }

  function buildStudentVideoPanel(video, sectionKey, embedMode) {
    const embed = embedMode !== false ? embedMode : useYoutubeEmbed();
    const safeTitle = video.title.replace(/"/g, '&quot;');
    const ytUrl = youtubeWatchUrl(video.id);
    const player = embed
      ? `<button type="button" class="yt-play-trigger"
          data-video-id="${video.id}" data-video-title="${safeTitle}"
          aria-label="Reproducir: ${safeTitle}">
          <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy">
          <span class="yt-play-btn" aria-hidden="true">▶</span>
          <span class="yt-play-label">Clic para reproducir aquí</span>
        </button>`
      : `<a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="yt-play-trigger yt-external"
          aria-label="Ver en YouTube: ${safeTitle}">
          <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy">
          <span class="yt-play-btn" aria-hidden="true">▶</span>
          <span class="yt-play-label">Ver en YouTube (pestaña nueva)</span>
        </a>`;

    return `
      <div class="topic-video-header">
        <span class="topic-video-tag student-video-tag">▶ Mi explicación</span>
        <h3>${video.title}</h3>
        ${video.description ? `<p class="topic-video-history">${video.description}</p>` : ''}
      </div>
      <div class="topic-video-grid">
        <article class="topic-video-item">
          <div class="topic-video-embed" id="tve-student-${sectionKey}">
            ${player}
          </div>
          <div class="topic-video-meta">
            <h4>${video.title}</h4>
            <p>${video.channel || 'Jurguen Salas Herrera'} · Video propio del portafolio</p>
            <a class="topic-video-yt-link" href="${ytUrl}" target="_blank" rel="noopener noreferrer">Abrir en YouTube ↗</a>
          </div>
        </article>
      </div>`;
  }

  function initTopicVideos() {
    const blocks = PORTFOLIO_CONFIG.topicVideos;
    if (!blocks) return;

    const sectionLinks = {
      markov: '#markov',
      control: '#control',
      simulation: '#simulation',
      networks: '#networks',
      transport: '#transport',
      programming: '#programming',
    };

    const embedMode = useYoutubeEmbed();

    Object.entries(blocks).forEach(([key, block]) => {
      if (!block?.videos?.length) return;

      const ctx = document.getElementById('ctx-' + key);
      if (!ctx) return;

      const section = ctx.closest('.section') || ctx.parentElement;
      const resolutionBlock = section?.querySelector('.exercise-resolution-block');
      if (!resolutionBlock) return;

      const panel = document.createElement('aside');
      panel.className = 'topic-video-panel reveal';
      panel.innerHTML = buildTopicVideoPanel(block, key, embedMode);
      resolutionBlock.insertAdjacentElement('afterend', panel);
      if (window.observeReveal) window.observeReveal(panel);
      else panel.classList.add('visible');

      if (embedMode) {
        panel.querySelectorAll('.yt-play-trigger').forEach(btn => {
          btn.addEventListener('click', () => {
            const wrap = btn.closest('.topic-video-embed');
            mountYoutubeEmbed(wrap, btn.dataset.videoId, btn.dataset.videoTitle, true);
          });
        });
      }
    });

    const grid = document.getElementById('historyOverviewGrid');
    if (grid) {
      grid.innerHTML = Object.entries(blocks).map(([key, block]) => {
        const video = block.videos[0];
        const href = sectionLinks[key] || '#overview';
        const safeTitle = video.title.replace(/"/g, '&quot;');
        const ytUrl = youtubeWatchUrl(video.id);
        const playControl = embedMode
          ? `<button type="button" class="history-overview-play-btn yt-overview-play"
              data-video-id="${video.id}" data-video-title="${safeTitle}"
              aria-label="Reproducir: ${safeTitle}">
              <div class="history-overview-thumb">
                <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="" loading="lazy">
                <span class="history-overview-play">▶ Reproducir aquí</span>
              </div>
            </button>`
          : `<a href="${ytUrl}" target="_blank" rel="noopener noreferrer"
              class="history-overview-play-btn" aria-label="Ver en YouTube: ${safeTitle}">
              <div class="history-overview-thumb">
                <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="" loading="lazy">
                <span class="history-overview-play">▶ Ver en YouTube</span>
              </div>
            </a>`;
        return `
          <article class="history-overview-card">
            ${playControl}
            <a href="${href}" class="history-overview-body">
              <span class="history-overview-topic">${TOPICS.find(t => t.id === key)?.title || key}</span>
              <p>${block.history.slice(0, 120)}…</p>
              <span class="history-overview-link">Ir al módulo →</span>
            </a>
          </article>`;
      }).join('');

      if (embedMode) {
        grid.querySelectorAll('.yt-overview-play').forEach(btn => {
          btn.addEventListener('click', () => {
            openHistoryVideoModal(btn.dataset.videoId, btn.dataset.videoTitle);
          });
        });
      }
    }
  }

  function useYoutubeEmbed() {
    const mode = PORTFOLIO_CONFIG.videoPlayback || 'auto';
    if (mode === 'external') return false;
    if (mode === 'embed') return true;
    return location.protocol === 'http:' || location.protocol === 'https:';
  }

  function youtubeWatchUrl(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  function youtubeEmbedUrl(videoId, autoplay) {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    });
    if (location.protocol === 'http:' || location.protocol === 'https:') {
      params.set('origin', location.origin);
    }
    if (autoplay) params.set('autoplay', '1');
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }

  function mountYoutubeEmbed(container, videoId, title, autoplay) {
    if (!container || !videoId) return;
    container.classList.add('is-playing');
    container.innerHTML = `
      <iframe
        src="${youtubeEmbedUrl(videoId, autoplay)}"
        title="${(title || 'Video de YouTube').replace(/"/g, '&quot;')}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }

  function initHistoryVideoModal() {
    const modal = document.getElementById('historyVideoModal');
    const embed = document.getElementById('historyVideoEmbed');
    const titleEl = document.getElementById('historyVideoTitle');
    if (!modal || !embed) return;

    const close = () => {
      modal.hidden = true;
      document.body.style.overflow = '';
      embed.innerHTML = '';
    };

    document.getElementById('historyVideoClose')?.addEventListener('click', close);
    document.getElementById('historyVideoBackdrop')?.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modal.hidden) close();
    });

    window.openHistoryVideoModal = (videoId, title) => {
      titleEl.textContent = title || 'Video histórico';
      mountYoutubeEmbed(embed, videoId, title, true);
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    };
  }

  function openHistoryVideoModal(videoId, title) {
    if (!useYoutubeEmbed()) {
      window.open(youtubeWatchUrl(videoId), '_blank', 'noopener,noreferrer');
      return;
    }
    if (window.openHistoryVideoModal) window.openHistoryVideoModal(videoId, title);
  }

  function buildTopicVideoPanel(block, sectionKey, embedMode) {
    const embed = embedMode !== false ? embedMode : useYoutubeEmbed();
    const items = block.videos.map((video, index) => {
      const safeTitle = video.title.replace(/"/g, '&quot;');
      const ytUrl = youtubeWatchUrl(video.id);
      const player = embed
        ? `<button type="button" class="yt-play-trigger"
            data-video-id="${video.id}" data-video-title="${safeTitle}"
            aria-label="Reproducir: ${safeTitle}">
            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy">
            <span class="yt-play-btn" aria-hidden="true">▶</span>
            <span class="yt-play-label">Clic para reproducir aqui</span>
          </button>`
        : `<a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="yt-play-trigger yt-external"
            aria-label="Ver en YouTube: ${safeTitle}">
            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy">
            <span class="yt-play-btn" aria-hidden="true">▶</span>
            <span class="yt-play-label">Ver en YouTube (pestaña nueva)</span>
          </a>`;
      return `
      <article class="topic-video-item">
        <div class="topic-video-embed" id="tve-${sectionKey}-${index}">
          ${player}
        </div>
        <div class="topic-video-meta">
          <h4>${video.title}</h4>
          <p>${video.channel} · ${video.duration}${video.lang ? ' · ' + video.lang : ''}</p>
          <a class="topic-video-yt-link" href="${ytUrl}" target="_blank" rel="noopener noreferrer">Abrir en YouTube ↗</a>
        </div>
      </article>`;
    }).join('');

    return `
      <div class="topic-video-header">
        <span class="topic-video-tag">◷ Origen histórico</span>
        <h3>${block.heading}</h3>
        <p class="topic-video-history">${block.history}</p>
      </div>
      <div class="topic-video-grid${block.videos.length > 1 ? ' multi' : ''}">${items}</div>`;
  }

  function initSolutionModal() {
    const modal = document.getElementById('solutionModal');
    const close = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };
    document.getElementById('modalClose').addEventListener('click', close);
    document.getElementById('modalBackdrop').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.getElementById('modalExportPdf').addEventListener('click', () => exportSolutionPdf(currentSolutionId));
    document.getElementById('modalPrint').addEventListener('click', () => printSolutionPdf(currentSolutionId));
  }

  function buildSolutionHtml(id) {
    const data = SOLUTIONS[id];
    if (!data) return '';

    let html = `
      <div class="solution-modal-context">
        <h4>Contexto del ejercicio</h4>
        <p>${data.context}</p>
      </div>`;

    data.steps.forEach((step, i) => {
      html += `
        <div class="solution-step">
          <div class="solution-step-num">${i + 1}</div>
          <h4>${step.heading}</h4>
          <div class="step-body">${step.body}</div>
        </div>`;
    });

    if (id === 'markov') {
      let table = '<table class="data-table"><thead><tr><th>Período</th><th>Maxi Palí</th><th>Megasuper</th><th>Locales</th></tr></thead><tbody>';
      MARKOV_STATES.forEach((s, i) => {
        table += `<tr><td>P${i}</td><td>${(s[0] * 100).toFixed(2)}%</td><td>${(s[1] * 100).toFixed(2)}%</td><td>${(s[2] * 100).toFixed(2)}%</td></tr>`;
      });
      table += `<tr><td>∞ estable</td><td>${(MARKOV.steady[0] * 100).toFixed(2)}%</td><td>${(MARKOV.steady[1] * 100).toFixed(2)}%</td><td>${(MARKOV.steady[2] * 100).toFixed(2)}%</td></tr></tbody></table>`;
      html += `<div class="solution-step"><div class="solution-step-num">${data.steps.length + 1}</div><h4>Tabla completa P0 – P10 + estado estable</h4><div class="step-body">${table}</div></div>`;
    }

    if (data.decision) {
      const metrics = (data.decision.metrics || []).map(m => `
        <div class="decision-metric">
          <span class="label">${m.label}</span>
          <span class="value">${m.value}</span>
        </div>`).join('');

      html += `
        <div class="solution-decision">
          <div class="solution-decision-header">
            <span class="icon">✓</span>
            <h3>${data.decision.title}</h3>
          </div>
          <p>${data.decision.text}</p>
          ${metrics ? `<div class="decision-metrics">${metrics}</div>` : ''}
        </div>`;
    }

    return html;
  }

  function openSolution(id) {
    const data = SOLUTIONS[id];
    if (!data) return;

    currentSolutionId = id;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalBody').innerHTML = buildSolutionHtml(id);
    wrapWideTables(document.getElementById('modalBody'));
    scheduleScrollFix();
    document.getElementById('solutionModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function buildPdfDocument(id) {
    const data = SOLUTIONS[id];
    const cfg = PORTFOLIO_CONFIG.student;
    const bodyHtml = buildSolutionHtml(id);
    return `
      <div class="pdf-document">
        <div class="pdf-cover">
          <h1>${data.title}</h1>
          <p class="sub">${data.subtitle}</p>
          <p class="meta">${cfg.name} · ${cfg.carnet} · ${cfg.course}<br>${cfg.campus} · DecisionLab Limón</p>
        </div>
        ${bodyHtml}
      </div>`;
  }

  async function exportSolutionPdf(id) {
    if (!id || !SOLUTIONS[id]) return;
    const btn = document.getElementById('modalExportPdf');
    const overlay = document.getElementById('pdfExportOverlay');
    if (btn) btn.classList.add('loading');
    overlay?.classList.add('active');

    try {
      await new Promise(r => setTimeout(r, 80));
      PdfGenerator.generate(id);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('No se pudo generar el PDF. Usa el botón ⎙ para imprimir.');
    } finally {
      overlay?.classList.remove('active');
      if (btn) btn.classList.remove('loading');
    }
  }

  function printSolutionPdf(id) {
    if (!id || !SOLUTIONS[id]) return;
    PdfGenerator.openPrintView(id);
  }

  function initPresentationSection() {
    const cfg = PORTFOLIO_CONFIG;

    const placeholder = document.getElementById('videoPlaceholder');
    const embed = document.getElementById('videoEmbed');
    const { type, url, title } = cfg.video;

    if (url && type === 'youtube') {
      placeholder.classList.add('hidden');
      if (useYoutubeEmbed()) {
        embed.classList.remove('hidden');
        embed.src = url.includes('/embed/') ? url : url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/');
        embed.title = title;
      } else {
        const idMatch = url.match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
        const watchUrl = idMatch ? youtubeWatchUrl(idMatch[1]) : url.replace('/embed/', '/watch?v=');
        embed.classList.add('hidden');
        placeholder.classList.remove('hidden');
        placeholder.innerHTML = `
          <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top:1rem">
            ▶ Ver video de presentación en YouTube
          </a>`;
      }
    } else if (url && type === 'drive') {
      placeholder.classList.add('hidden');
      embed.classList.remove('hidden');
      embed.src = url;
      embed.title = title;
    } else if (url && type === 'local') {
      placeholder.innerHTML = `<video controls style="width:100%;max-height:400px" src="${url}"></video><p class="video-hint">${title}</p>`;
    }

    const grid = document.getElementById('exportGrid');
    if (grid && cfg.pdfExports) {
      grid.innerHTML = cfg.pdfExports.map(e => `
        <button type="button" class="btn-export-item" data-export-id="${e.id}">
          ${e.label}<span>↓ PDF</span>
        </button>`).join('');

      grid.querySelectorAll('.btn-export-item').forEach(btn => {
        btn.addEventListener('click', async () => {
          const original = btn.innerHTML;
          btn.disabled = true;
          btn.textContent = 'Generando…';
          await exportSolutionPdf(btn.dataset.exportId);
          btn.disabled = false;
          btn.innerHTML = original;
        });
      });
    }

    initPresentationMode();
  }

  function initPresentationMode() {
    const sections = ['hero', 'overview', 'resumenes', 'markov', 'control', 'simulation', 'networks', 'transport', 'programming', 'presentacion'];
    const sectionLabels = {
      hero: 'Inicio',
      overview: 'Panorama',
      resumenes: 'Resúmenes ejecutivos',
      markov: 'Markov',
      control: 'Control estadístico',
      simulation: 'Simulación',
      networks: 'Redes',
      transport: 'Transporte',
      programming: 'Programación',
      presentacion: 'Video general y PDFs',
    };
    let idx = 0;

    const update = () => {
      const key = sections[idx];
      document.getElementById('presLabel').textContent =
        `${sectionLabels[key] || key} · ${idx + 1} / ${sections.length}`;
      document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' });
    };

    const startPresentation = () => {
      document.body.classList.add('presentation-mode');
      idx = 0;
      update();
    };

    document.getElementById('btnPresentationMode')?.addEventListener('click', startPresentation);

    document.querySelectorAll('.btn-presentation-mode').forEach(btn => {
      if (btn.id === 'btnPresentationMode') return;
      btn.addEventListener('click', startPresentation);
    });

    document.getElementById('presExit')?.addEventListener('click', () => {
      document.body.classList.remove('presentation-mode');
    });

    document.getElementById('presNext')?.addEventListener('click', () => {
      if (idx < sections.length - 1) { idx++; update(); }
    });

    document.getElementById('presPrev')?.addEventListener('click', () => {
      if (idx > 0) { idx--; update(); }
    });
  }

  function initMarkov() {
    renderMarkovMatrix();
    renderMarkovForecastTable();
    renderMarkovResults();
    initMarkovChart();

    document.getElementById('markovNext').addEventListener('click', () => {
      if (markovPeriod === 'steady') return;
      if (markovPeriod < MARKOV.maxPeriod) { markovPeriod++; updateMarkov(); }
    });
    document.getElementById('markovPrev').addEventListener('click', () => {
      if (markovPeriod === 'steady') { markovPeriod = MARKOV.maxPeriod; updateMarkov(); return; }
      if (markovPeriod > 0) { markovPeriod--; updateMarkov(); }
    });
    document.getElementById('markovSteady').addEventListener('click', () => {
      markovPeriod = 'steady';
      updateMarkov();
    });
    scheduleScrollFix();
  }

  function renderMarkovForecastTable() {
    const wrap = document.getElementById('markovForecastTable');
    let html = `<table class="markov-forecast"><thead><tr><th>Período</th>`;
    MARKOV.chains.forEach(c => html += `<th>${c}</th>`);
    html += `<th>Suma</th></tr></thead><tbody>`;

    MARKOV_STATES.forEach((state, i) => {
      const sum = state.reduce((a, b) => a + b, 0);
      const rowCls = i === markovPeriod ? 'active-row' : '';
      html += `<tr class="${rowCls}" data-period="${i}"><td>P${i}</td>`;
      state.forEach(v => html += `<td>${(v * 100).toFixed(2)}%</td>`);
      html += `<td>${sum.toFixed(4)}</td></tr>`;
    });

    const steadyCls = markovPeriod === 'steady' ? 'steady-row active-row' : 'steady-row';
    html += `<tr class="${steadyCls}"><td>∞</td>`;
    MARKOV.steady.forEach(v => html += `<td class="highlight-cell">${(v * 100).toFixed(2)}%</td>`);
    html += `<td>1.0000</td></tr></tbody></table>`;
    wrap.innerHTML = html;
  }

  function renderMarkovMatrix() {
    const wrap = document.getElementById('markovMatrix');
    let html = '<table class="markov-table"><thead><tr><th></th>';
    MARKOV.chains.forEach(c => html += `<th>→ ${c.split(' ')[0]}</th>`);
    html += '</tr></thead><tbody>';
    MARKOV.P.forEach((row, i) => {
      html += `<tr><th>${MARKOV.chains[i]}</th>`;
      row.forEach(v => html += `<td>${v.toFixed(2)}</td>`);
      html += '</tr>';
    });
    html += '</tbody></table>';
    wrap.innerHTML = html;
  }

  function getMarkovState() {
    if (markovPeriod === 'steady') return MARKOV.steady;
    return MARKOV_STATES[markovPeriod];
  }

  function updateMarkov() {
    const periodEl = document.getElementById('markovPeriod');
    periodEl.textContent = markovPeriod === 'steady' ? '∞' : markovPeriod;
    document.getElementById('markovPrev').disabled = markovPeriod === 0;
    document.getElementById('markovNext').disabled = markovPeriod === 'steady' || markovPeriod === MARKOV.maxPeriod;
    renderMarkovResults();
    renderMarkovForecastTable();
    highlightMarkovChart();
    scheduleScrollFix();
  }

  function renderMarkovResults() {
    const state = getMarkovState();
    const wrap = document.getElementById('markovResults');
    wrap.innerHTML = MARKOV.chains.map((name, i) => `
      <div class="result-card active">
        <div class="label">${name}</div>
        <div class="value">${(state[i] * 100).toFixed(2)}%</div>
      </div>`).join('');
  }

  function initMarkovChart() {
    const c = getChartColors();
    const ctx = document.getElementById('markovChart').getContext('2d');
    const labels = MARKOV_STATES.map((_, i) => 'P' + i).concat(['∞']);

    markovChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: MARKOV.chains.map((name, i) => ({
          label: name,
          data: [...MARKOV_STATES.map(s => +(s[i] * 100).toFixed(2)), +(MARKOV.steady[i] * 100).toFixed(2)],
          borderColor: MARKOV.colors[i],
          backgroundColor: MARKOV.colors[i] + '33',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 7,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: c.text, font: { family: 'Plus Jakarta Sans' } } },
        },
        scales: {
          x: { ticks: { color: c.text }, grid: { display: false } },
          y: {
            ticks: { color: c.text, callback: v => v + '%' },
            grid: { color: c.grid },
            min: 15,
            max: 52,
          },
        },
      },
    });
  }

  function highlightMarkovChart() {
    if (!markovChart) return;
    const idx = markovPeriod === 'steady' ? MARKOV.maxPeriod + 1 : markovPeriod;
    markovChart.data.datasets.forEach((ds, i) => {
      ds.pointRadius = ds.data.map((_, j) => j === idx ? 8 : 4);
      ds.pointBackgroundColor = ds.data.map((_, j) => j === idx ? MARKOV.colors[i] : MARKOV.colors[i] + '99');
    });
    markovChart.update('none');
  }

  function initControl() {
    renderControlStats();
    renderControlTable();
    renderControlResults();
    initControlCharts();
    scheduleScrollFix();
  }

  function renderControlStats() {
    const el = document.getElementById('controlStats');
    if (!el) return;
    const { xbarBar, rBar, constants, n, samples } = CONTROL;
    el.innerHTML = `
      <div class="table-scroll-wrap scroll-x-host">
        <table class="data-table control-limits-table">
          <thead><tr><th>Gráfico</th><th>LCI</th><th>LC</th><th>LCS</th></tr></thead>
          <tbody>
            <tr><td>X̄</td><td>${CONTROL.limits.xbar.lci.toFixed(3)}</td><td>${xbarBar.toFixed(3)}</td><td>${CONTROL.limits.xbar.lcs.toFixed(3)}</td></tr>
            <tr><td>R</td><td>${CONTROL.limits.r.lci.toFixed(3)}</td><td>${rBar.toFixed(3)}</td><td>${CONTROL.limits.r.lcs.toFixed(3)}</td></tr>
          </tbody>
        </table>
      </div>
      <ul class="control-meta">
        <li><span>Subgrupos</span><strong>${samples}</strong></li>
        <li><span>Tamaño n</span><strong>${n}</strong></li>
        <li><span>A₂ / D₃ / D₄</span><strong>${constants.A2} / ${constants.D3} / ${constants.D4}</strong></li>
        <li><span>∑X̄</span><strong>71.32</strong></li>
        <li><span>∑R</span><strong>24.37</strong></li>
      </ul>`;
  }

  function renderControlTable() {
    const el = document.getElementById('controlTable');
    if (!el) return;
    let rows = CONTROL.xbar.map((xb, i) => {
      const ok = xb >= CONTROL.limits.xbar.lci && xb <= CONTROL.limits.xbar.lcs
        && CONTROL.r[i] >= CONTROL.limits.r.lci && CONTROL.r[i] <= CONTROL.limits.r.lcs;
      return `<tr class="${ok ? '' : 'out-of-control'}"><td>${i + 1}</td><td>${xb.toFixed(2)}</td><td>${CONTROL.r[i].toFixed(2)}</td><td>${ok ? '✓' : '✗'}</td></tr>`;
    }).join('');
    el.innerHTML = `<table class="data-table control-sample-table"><thead><tr><th>Hora</th><th>X̄</th><th>R</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderControlResults() {
    const el = document.getElementById('controlResults');
    if (!el) return;
    el.innerHTML = `
      <div class="result-card active"><div class="label">X̄ mín – máx</div><div class="value">2.64 – 3.39</div></div>
      <div class="result-card active"><div class="label">R mín – máx</div><div class="value">0.32 – 1.58</div></div>
      <div class="result-card active accent"><div class="label">Conclusión</div><div class="value">Bajo control</div></div>`;
  }

  function controlLimitDataset(label, value, color, dash) {
    return {
      label,
      data: Array(CONTROL.samples).fill(value),
      borderColor: color,
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderDash: dash || [],
      pointRadius: 0,
      fill: false,
      tension: 0,
    };
  }

  function initControlCharts() {
    const c = getChartColors();
    const labels = CONTROL.xbar.map((_, i) => String(i + 1));

    const xbarCtx = document.getElementById('controlXbarChart');
    if (xbarCtx) {
      controlXbarChart = new Chart(xbarCtx.getContext('2d'), {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'X̄ observado',
              data: CONTROL.xbar,
              borderColor: '#00d4aa',
              backgroundColor: 'rgba(0, 212, 170, 0.15)',
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.1,
              fill: false,
            },
            controlLimitDataset('LCS', CONTROL.limits.xbar.lcs, '#f0a500', [6, 4]),
            controlLimitDataset('LC', CONTROL.limits.xbar.lc, '#7c8db5'),
            controlLimitDataset('LCI', CONTROL.limits.xbar.lci, '#f0a500', [6, 4]),
          ],
        },
        options: controlChartOptions(c, 'Longitud promedio'),
      });
    }

    const rCtx = document.getElementById('controlRChart');
    if (rCtx) {
      controlRChart = new Chart(rCtx.getContext('2d'), {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'R observado',
              data: CONTROL.r,
              borderColor: '#5b9fd4',
              backgroundColor: 'rgba(91, 159, 212, 0.15)',
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.1,
              fill: false,
            },
            controlLimitDataset('LCS', CONTROL.limits.r.lcs, '#f0a500', [6, 4]),
            controlLimitDataset('LC', CONTROL.limits.r.lc, '#7c8db5'),
            controlLimitDataset('LCI', CONTROL.limits.r.lci, '#f0a500', [6, 4]),
          ],
        },
        options: controlChartOptions(c, 'Rango'),
      });
    }
  }

  function controlChartOptions(c, yLabel) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: c.text,
            font: { family: 'Plus Jakarta Sans', size: 11 },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Subgrupo (hora)', color: c.text },
          ticks: { color: c.text, maxRotation: 0 },
          grid: { display: false },
        },
        y: {
          title: { display: true, text: yLabel, color: c.text },
          ticks: { color: c.text },
          grid: { color: c.grid },
        },
      },
    };
  }

  function initSimulation() {
    ['a', 'b', 'c'].forEach(key => {
      buildSimTable(key);
      document.getElementById(`simRun${key.toUpperCase()}`).addEventListener('click', () => runSim(key));
      document.getElementById(`simReset${key.toUpperCase()}`).addEventListener('click', () => resetSim(key));
    });
    scheduleScrollFix();
  }

  function buildSimTable(key) {
    const sim = SIM[key];
    const total = sim.data.reduce((s, d) => s + d.f, 0);
    let cum = 0;
    let html = '<thead><tr><th>Valor</th><th>P(x)</th><th>Acum.</th><th>Rango</th></tr></thead><tbody>';

    sim.data.forEach(d => {
      const p = d.f / total;
      cum += p;
      const lo = Math.round((cum - p) * 100) + 1;
      const hi = Math.round(cum * 100);
      html += `<tr><td>${d.x}</td><td>${p.toFixed(2)}</td><td>${cum.toFixed(2)}</td><td>${lo}–${hi}</td></tr>`;
    });
    html += '</tbody>';
    document.getElementById(`simTable${key.toUpperCase()}`).innerHTML = html;
  }

  function assignValue(rn, data) {
    const total = data.reduce((s, d) => s + d.f, 0);
    let cum = 0;
    for (const d of data) {
      cum += d.f / total;
      if (rn <= Math.round(cum * 100)) return d.x;
    }
    return data[data.length - 1].x;
  }

  async function runSim(key) {
    const sim = SIM[key];
    const timeline = document.getElementById(`simTimeline${key.toUpperCase()}`);
    const result = document.getElementById(`simResult${key.toUpperCase()}`);
    timeline.innerHTML = '';
    result.innerHTML = 'Simulando…';

    const values = [];
    for (let i = 0; i < sim.rn.length; i++) {
      await sleep(350);
      const rn = sim.rn[i];
      const val = assignValue(rn, sim.data);
      values.push(val);
      timeline.innerHTML += `
        <div class="sim-step" style="animation-delay:${i * 0.05}s">
          <span class="rn">${rn}</span>
          <span class="arrow">→</span>
          <span>${val} ${sim.unit}</span>
        </div>`;
    }

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const diff = avg - sim.theoretical;
    const diffStr = diff >= 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
    result.innerHTML = `
      Promedio simulado: <strong>${avg.toFixed(1)} ${sim.unit}</strong>
      · Teórico: ${sim.theoretical} · Δ = ${diffStr}`;
  }

  function resetSim(key) {
    document.getElementById(`simTimeline${key.toUpperCase()}`).innerHTML = '';
    document.getElementById(`simResult${key.toUpperCase()}`).innerHTML =
      '<span>Promedio simulado: <strong>—</strong></span>';
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function initNetwork() {
    renderNetwork('shortest');
    document.querySelectorAll('.legend-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.legend-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderNetwork(btn.dataset.mode);
      });
    });
  }

  function edgeKey(a, b) {
    return [a, b].sort().join('-');
  }

  function renderNetwork(mode) {
    const svg = document.getElementById('networkSvg');
    const { nodes, edges, shortest, mst } = NETWORK;

    let highlightSet = new Set();
    let highlightNodes = new Set();
    let edgeClass = 'highlight';

    if (mode === 'shortest') {
      shortest.forEach(([a, b]) => highlightSet.add(edgeKey(a, b)));
      highlightNodes = new Set(['A', 'C', 'F']);
      setNetworkInfo('Ruta más corta: A → F', 'Algoritmo de Dijkstra desde el Puerto de Limón.', '9', 'km', [
        'Desde A: C es el camino más corto (5 km)',
        'Desde C: C→F = 4 km → total 9 km',
        'Alternativas A→D→F y A→B→E→F = 14 km (descartadas)',
      ]);
    } else if (mode === 'mst') {
      mst.forEach(([a, b]) => highlightSet.add(edgeKey(a, b)));
      highlightNodes = new Set(['A', 'B', 'C', 'D', 'E', 'F']);
      edgeClass = 'mst';
      setNetworkInfo('Árbol de expansión mínima', 'Algoritmo de Kruskal — conectar todos los nodos.', '17', 'km', [
        'B–C (2) + C–D (3) + E–F (3) = 8 km',
        'C–F (4) conecta componentes → 12 km',
        'A–C (5) incluye el puerto → 17 km total',
      ]);
    } else {
      setNetworkInfo('Red logística completa', 'Todas las conexiones del grafo.', '—', '', [
        '6 nodos · 10 aristas',
        'Selecciona un modo para ver la solución',
      ]);
    }

    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
    let html = '';

    edges.forEach(e => {
      const a = nodeMap[e.from], b = nodeMap[e.to];
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const cls = highlightSet.has(edgeKey(e.from, e.to)) ? edgeClass : '';
      html += `<line class="network-edge ${cls}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;
      html += `<text class="edge-label" x="${mx}" y="${my - 8}">${e.w}</text>`;
    });

    nodes.forEach(n => {
      const cls = highlightNodes.has(n.id) ? 'highlight' : '';
      html += `<g class="network-node ${cls}"><circle cx="${n.x}" cy="${n.y}" r="22"/><text x="${n.x}" y="${n.y}">${n.label}</text></g>`;
    });

    svg.innerHTML = html;
  }

  function setNetworkInfo(title, desc, num, unit, steps) {
    document.getElementById('networkTitle').textContent = title;
    document.getElementById('networkDesc').textContent = desc;
    document.getElementById('networkResult').innerHTML =
      num === '—' ? '<span class="big-num">—</span>' :
      `<span class="big-num">${num}</span><span class="big-unit">${unit}</span>`;
    document.getElementById('networkSteps').innerHTML = steps.map(s => `<li>${s}</li>`).join('');
  }

  function initTransport() {
    renderTransportMatrix();
    renderTransportSolution();
    renderAssignMatrix();
    renderAssignResult();
    scheduleScrollFix();
  }

  function renderTransportMatrix() {
    const { origins, dests, profit } = TRANSPORT;
    let html = '<div class="transport-grid" style="grid-template-columns:80px repeat(4,1fr)">';
    html += '<div class="transport-cell corner"></div>';
    dests.forEach(d => html += `<div class="transport-cell header">${d}</div>`);

    profit.forEach((row, i) => {
      html += `<div class="transport-cell header">${origins[i]}</div>`;
      row.forEach(v => html += `<div class="transport-cell">${v}<span class="sub">₡k/t</span></div>`);
    });
    html += '</div>';
    document.getElementById('transportMatrix').innerHTML = `<div class="transport-scroll-wrap scroll-x-host">${html}</div>`;
  }

  function renderTransportSolution() {
    const { origins, dests, profit, solution } = TRANSPORT;
    let html = '<div class="transport-grid" style="grid-template-columns:80px repeat(4,1fr)">';
    html += '<div class="transport-cell corner"></div>';
    dests.forEach(d => html += `<div class="transport-cell header">${d}</div>`);

    solution.forEach((row, i) => {
      html += `<div class="transport-cell header">${origins[i]}</div>`;
      row.forEach((qty, j) => {
        const cls = qty > 0 ? 'allocated' : '';
        html += `<div class="transport-cell ${cls}">${qty > 0 ? qty + ' t' : '—'}<span class="sub">${profit[i][j]} ₡k</span></div>`;
      });
    });
    html += '</div>';
    document.getElementById('transportSolution').innerHTML = `<div class="transport-scroll-wrap scroll-x-host">${html}</div>`;
  }

  function renderAssignMatrix() {
    const { trucks, routes, matrix, optimal } = ASSIGN;
    let html = '<div class="transport-grid assign-grid" style="grid-template-columns:100px repeat(4,1fr)">';
    html += '<div class="transport-cell corner"></div>';
    routes.forEach(r => html += `<div class="transport-cell header">${r}</div>`);

    matrix.forEach((row, i) => {
      html += `<div class="transport-cell header">${trucks[i]}</div>`;
      row.forEach((v, j) => {
        const cls = optimal[i][j] ? 'optimal' : '';
        html += `<div class="transport-cell ${cls}">${v}</div>`;
      });
    });
    html += '</div>';
    document.getElementById('assignMatrix').innerHTML = `<div class="transport-scroll-wrap scroll-x-host">${html}</div>`;
  }

  function renderAssignResult() {
    const pairs = [
      ['Camión 1', 'Limón Centro', 90],
      ['Camión 2', 'Siquirres', 88],
      ['Camión 3', 'Guápiles', 92],
      ['Camión 4', 'Talamanca', 95],
    ];
    document.getElementById('assignResult').innerHTML = pairs.map(([t, r, s]) => `
      <div class="assign-pair">
        <span class="truck">${t}</span>
        <span class="route">→ ${r}</span>
        <span class="score">${s}</span>
      </div>`).join('');
  }

  function initProgramming() {
    const xSlider = document.getElementById('goalX');
    const ySlider = document.getElementById('goalY');

    function updateGoals() {
      const x = +xSlider.value, y = +ySlider.value;
      document.getElementById('goalXVal').textContent = x;
      document.getElementById('goalYVal').textContent = y;

      const profit = 30 * x + 50 * y;
      const hours = 2 * x + 4 * y;
      const energy = 5 * x + 8 * y;

      const meters = [
        { label: 'P1 · Ganancia ($2 200)', val: profit, target: 2200, type: 'min', tol: 0 },
        { label: 'P2 · Horas (160 exactas)', val: hours, target: 160, type: 'exact', tol: 0 },
        { label: 'P3 · Energía (≤ 300 kWh)', val: energy, target: 300, type: 'max', tol: 0 },
      ];

      document.getElementById('goalMeters').innerHTML = meters.map(m => {
        let status, pct, cls;
        if (m.type === 'exact') {
          const diff = Math.abs(m.val - m.target);
          status = diff === 0 ? 'Exacto ✓' : `Δ ${diff} h`;
          cls = diff === 0 ? 'ok' : 'warn';
          pct = Math.min(100, (m.val / m.target) * 100);
        } else if (m.type === 'max') {
          status = m.val <= m.target ? 'Dentro del límite ✓' : `Exceso +${m.val - m.target} kWh`;
          cls = m.val <= m.target ? 'ok' : m.val <= m.target + 30 ? 'warn' : 'bad';
          pct = Math.min(100, (m.val / m.target) * 100);
        } else {
          status = m.val >= m.target ? 'Meta alcanzada ✓' : `Faltan $${m.target - m.val}`;
          cls = m.val >= m.target ? 'ok' : 'bad';
          pct = Math.min(100, (m.val / m.target) * 100);
        }
        return `
          <div class="meter">
            <div class="meter-header">
              <span>${m.label}</span>
              <span class="status ${cls}">${status} · ${m.val}</span>
            </div>
            <div class="meter-bar"><div class="meter-fill ${cls}" style="width:${pct}%"></div></div>
          </div>`;
      }).join('');

      const isOptimal = x === 40 && y === 20;
      document.getElementById('goalConclusion').textContent = isOptimal
        ? '✓ Solución óptima del modelo: cumple P1 y P2, pero excede P3 en 60 kWh.'
        : 'Ajusta los sliders hacia x=40, y=20 para ver la solución óptima del ejercicio.';
    }

    xSlider.addEventListener('input', updateGoals);
    ySlider.addEventListener('input', updateGoals);
    updateGoals();

    initNonlinearChart();
    initIntegerChart();
  }

  function initIntegerChart() {
    const c = getChartColors();
    const ctx = document.getElementById('integerChart').getContext('2d');

    const r1 = []; for (let x2 = 0; x2 <= 5; x2++) r1.push({ x: 10 - 2 * x2, y: x2 });
    const r2 = []; for (let x2 = 0; x2 <= 11; x2++) r2.push({ x: (11 - x2) / 2, y: x2 });
    const r3 = []; for (let x2 = 0; x2 <= 9; x2++) r3.push({ x: 9 - x2, y: x2 });

    integerChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          { label: 'Tela', data: r1.filter(p => p.x >= 0), showLine: true, borderColor: '#7c8db5', pointRadius: 0, borderWidth: 2 },
          { label: 'Tiempo', data: r2.filter(p => p.x >= 0), showLine: true, borderColor: '#f0a500', pointRadius: 0, borderWidth: 2 },
          { label: 'Botones', data: r3.filter(p => p.x >= 0), showLine: true, borderColor: '#00d4aa', pointRadius: 0, borderWidth: 2, borderDash: [4, 4] },
          { label: 'Óptimo (4, 3)', data: [{ x: 4, y: 3 }], backgroundColor: '#f0a500', borderColor: '#f0a500', pointRadius: 12 },
          { label: 'Vértices', data: [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 0, y: 5 }], backgroundColor: '#7c8db566', pointRadius: 6 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: c.text, boxWidth: 12 } } },
        scales: {
          x: { title: { display: true, text: 'Camisas x₁', color: c.text }, ticks: { color: c.text }, grid: { color: c.grid }, min: 0, max: 6 },
          y: { title: { display: true, text: 'Pantalones x₂', color: c.text }, ticks: { color: c.text }, grid: { color: c.grid }, min: 0, max: 6 },
        },
      },
    });
  }

  function initNonlinearChart() {
    const c = getChartColors();
    const ctx = document.getElementById('nonlinearChart').getContext('2d');

    const constraint1 = [];
    for (let y = 0; y <= 40; y += 2) constraint1.push({ x: (120 - 3 * y) / 2, y });
    const constraint2 = [];
    for (let y = 0; y <= 40; y += 2) constraint2.push({ x: 80 - 2 * y, y });

    nonlinearChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: '2x + 3y ≤ 120',
            data: constraint1.filter(p => p.x >= 0),
            showLine: true,
            borderColor: '#7c8db5',
            backgroundColor: 'transparent',
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: 'x + 2y ≤ 80',
            data: constraint2.filter(p => p.x >= 0),
            showLine: true,
            borderColor: '#f0a500',
            backgroundColor: 'transparent',
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: 'Óptimo (17.5, 10.5)',
            data: [{ x: 17.5, y: 10.5 }],
            backgroundColor: '#00d4aa',
            borderColor: '#00d4aa',
            pointRadius: 10,
            pointHoverRadius: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: c.text } },
        },
        scales: {
          x: {
            title: { display: true, text: 'Producto A (x)', color: c.text },
            ticks: { color: c.text },
            grid: { color: c.grid },
            min: 0, max: 45,
          },
          y: {
            title: { display: true, text: 'Producto B (y)', color: c.text },
            ticks: { color: c.text },
            grid: { color: c.grid },
            min: 0, max: 45,
          },
        },
      },
    });
  }

  function initTabs() {
    document.querySelectorAll('.tab-bar').forEach(bar => {
      bar.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          const section = bar.closest('.section');
          bar.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          section.querySelectorAll('[id^="sim-"], [id^="trans-"], [id^="prog-"]').forEach(p => {
            p.classList.toggle('active', p.id === target);
          });
        });
      });
    });
  }

})();
