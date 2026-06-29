
const PdfGenerator = (() => {
  const PAGE_BOTTOM = 287;
  const MARGIN = 14;
  const ACCENT = [0, 140, 120];
  const DARK = [10, 22, 40];
  const GRAY = [80, 80, 80];

  const MARKOV_PDF = {
    P: [[0.88, 0.07, 0.05], [0.10, 0.85, 0.05], [0.15, 0.10, 0.75]],
    initial: [0.45, 0.35, 0.20],
    steady: [0.4924, 0.3409, 0.1667],
  };

  function computeMarkovStates() {
    const states = [MARKOV_PDF.initial];
    for (let n = 0; n < 10; n++) {
      const v = states[n];
      states.push([0, 1, 2].map(j => v.reduce((s, vi, i) => s + vi * MARKOV_PDF.P[i][j], 0)));
    }
    return states;
  }

  function sanitizeForPdf(text) {
    if (text == null) return '';
    let out = String(text);

    const replacements = [
      [/π/g, 'pi'],
      [/Π/g, 'PI'],
      [/∞/g, 'inf'],
      [/≤/g, '<='],
      [/≥/g, '>='],
      [/≠/g, '!='],
      [/−/g, '-'],      
      [/–/g, '-'],      
      [/—/g, '-'],      
      [/·/g, '.'],
      [/×/g, 'x'],
      [/÷/g, '/'],
      [/₁/g, '1'],
      [/₂/g, '2'],
      [/₃/g, '3'],
      [/⁺/g, '+'],
      [/⁻/g, '-'],
      [/₡/g, 'CRC'],
      [/✓/g, 'OK'],
      [/✗/g, 'X'],
      [/Δ/g, 'Delta'],
      [/→/g, '->'],
      [/←/g, '<-'],
      [/∩/g, 'n'],
      [/±/g, '+/-'],
      [/≈/g, '~'],
      [/[\u201C\u201D]/g, '"'],
      [/[\u2018\u2019]/g, "'"],
    ];

    replacements.forEach(([re, rep]) => { out = out.replace(re, rep); });

    
    out = out.replace(/[^\u0009\u000A\u000D\u0020-\u00FF]/g, '');

    return out;
  }

  function htmlToText(html) {
    if (!html) return '';
    const plain = html
      .replace(/<\/li>/gi, '\n')
      .replace(/<li[^>]*>/gi, '  - ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/tr>/gi, '\n')
      .replace(/<\/td>/gi, '  ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    return sanitizeForPdf(plain);
  }

  function createDoc() {
    if (!window.jspdf?.jsPDF) {
      throw new Error('jsPDF no cargó. Verifica la conexión a internet.');
    }
    const pdf = new window.jspdf.jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    return { pdf, y: MARGIN, maxW: pageW - MARGIN * 2 };
  }

  function ensureSpace(ctx, height) {
    if (ctx.y + height > PAGE_BOTTOM) {
      ctx.pdf.addPage();
      ctx.y = MARGIN;
    }
  }

  function writeLines(ctx, text, size, style, color) {
    const { pdf, maxW } = ctx;
    const safe = sanitizeForPdf(text);
    if (!safe) return;

    pdf.setFont('helvetica', style);
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(safe, maxW);
    const blockH = lines.length * (size * 0.38) + 2;
    ensureSpace(ctx, blockH);
    pdf.text(lines, MARGIN, ctx.y);
    ctx.y += blockH + 2;
  }

  function writeHeading(ctx, text, size = 11) {
    writeLines(ctx, text, size, 'bold', DARK);
  }

  function writeBody(ctx, text, size = 10) {
    writeLines(ctx, text, size, 'normal', GRAY);
  }

  function writeLabel(ctx, text) {
    writeLines(ctx, text, 10, 'bold', ACCENT);
  }

  function drawTable(ctx, head, body) {
    ensureSpace(ctx, 24);
    const safeHead = head.map(row => row.map(sanitizeForPdf));
    const safeBody = body.map(row => row.map(sanitizeForPdf));
    ctx.pdf.autoTable({
      startY: ctx.y,
      head: safeHead,
      body: safeBody,
      margin: { left: MARGIN, right: MARGIN },
      styles: { fontSize: 9, cellPadding: 2.5, textColor: DARK, font: 'helvetica' },
      headStyles: { fillColor: ACCENT, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 250, 248] },
    });
    ctx.y = ctx.pdf.lastAutoTable.finalY + 6;
  }

  function addMarkovTable(ctx) {
    writeLabel(ctx, 'Tabla P0 - P10 + estado estable');
    const states = computeMarkovStates();
    const head = [['Período', 'Maxi Palí', 'Megasuper', 'Locales']];
    const body = states.map((s, i) => [
      `P${i}`,
      `${(s[0] * 100).toFixed(2)}%`,
      `${(s[1] * 100).toFixed(2)}%`,
      `${(s[2] * 100).toFixed(2)}%`,
    ]);
    body.push([
      'inf',
      `${(MARKOV_PDF.steady[0] * 100).toFixed(2)}%`,
      `${(MARKOV_PDF.steady[1] * 100).toFixed(2)}%`,
      `${(MARKOV_PDF.steady[2] * 100).toFixed(2)}%`,
    ]);
    drawTable(ctx, head, body);
  }

  function generate(id) {
    const data = SOLUTIONS[id];
    if (!data) throw new Error('Ejercicio no encontrado');

    const cfg = PORTFOLIO_CONFIG.student;
    const ctx = createDoc();

    writeLines(ctx, data.title, 16, 'bold', DARK);
    writeLines(ctx, data.subtitle, 11, 'normal', ACCENT);
    writeLines(ctx, `${cfg.name} · ${cfg.carnet}`, 9, 'normal', GRAY);
    writeLines(ctx, `${cfg.course} · ${cfg.campus}`, 9, 'normal', GRAY);
    writeLines(ctx, 'DecisionLab Limon - Portafolio IF7200', 9, 'italic', GRAY);
    ctx.y += 4;

    writeLabel(ctx, 'Contexto del ejercicio');
    writeBody(ctx, data.context);
    ctx.y += 2;

    data.steps.forEach((step, i) => {
      writeHeading(ctx, `Paso ${i + 1}. ${step.heading}`);
      writeBody(ctx, htmlToText(step.body));
    });

    if (id === 'markov') addMarkovTable(ctx);

    if (data.decision) {
      ctx.y += 2;
      writeLabel(ctx, data.decision.title);
      writeBody(ctx, data.decision.text);
      (data.decision.metrics || []).forEach(m => {
        writeBody(ctx, `${m.label}: ${m.value}`, 10);
      });
    }

    const filename = `DecisionLab_${id}_${cfg.carnet}.pdf`;
    ctx.pdf.save(filename);
    return filename;
  }

  function openPrintView(id) {
    const data = SOLUTIONS[id];
    if (!data) return;
    const cfg = PORTFOLIO_CONFIG.student;

    let body = `
      <h1>${data.title}</h1>
      <p class="sub">${data.subtitle}</p>
      <p class="meta">${cfg.name} · ${cfg.carnet}<br>${cfg.course}</p>
      <h2>Contexto</h2><p>${data.context}</p>`;

    data.steps.forEach((step, i) => {
      body += `<h2>Paso ${i + 1}. ${step.heading}</h2>${step.body}`;
    });

    if (id === 'markov') {
      const states = computeMarkovStates();
      body += '<h2>Tabla P0–P10</h2><table border="1" cellpadding="6" cellspacing="0" width="100%"><tr><th>Período</th><th>Maxi Palí</th><th>Megasuper</th><th>Locales</th></tr>';
      states.forEach((s, i) => {
        body += `<tr><td>P${i}</td><td>${(s[0]*100).toFixed(2)}%</td><td>${(s[1]*100).toFixed(2)}%</td><td>${(s[2]*100).toFixed(2)}%</td></tr>`;
      });
      body += `<tr><td>∞</td><td>${(MARKOV_PDF.steady[0]*100).toFixed(2)}%</td><td>${(MARKOV_PDF.steady[1]*100).toFixed(2)}%</td><td>${(MARKOV_PDF.steady[2]*100).toFixed(2)}%</td></tr></table>`;
    }

    if (data.decision) {
      body += `<h2>${data.decision.title}</h2><p>${data.decision.text}</p>`;
      (data.decision.metrics || []).forEach(m => {
        body += `<p><strong>${m.label}:</strong> ${m.value}</p>`;
      });
    }

    const win = window.open('', '_blank');
    if (!win) {
      alert('Permite ventanas emergentes para imprimir.');
      return;
    }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${data.title}</title>
      <style>
        body{font-family:Arial,sans-serif;padding:24px 32px;color:#111;line-height:1.55;max-width:800px;margin:0 auto}
        h1{font-size:20pt;color:#0a1628;margin-bottom:4px}
        .sub{color:#008878;font-weight:600}
        .meta{color:#666;font-size:10pt;margin-bottom:20px;padding-bottom:12px;border-bottom:2px solid #008878}
        h2{font-size:12pt;color:#008878;margin-top:18px}
        table{border-collapse:collapse;font-size:10pt;margin:10px 0}
        th{background:#008878;color:#fff}
        td,th{border:1px solid #ccc;padding:6px 10px}
        ul{padding-left:20px} li{margin:4px 0}
        @media print{body{padding:0}}
      </style></head><body>${body}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  }

  return { generate, openPrintView };
})();
