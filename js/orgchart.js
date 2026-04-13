/* ============================================
   ORGCHART — Interactive Canvas Component
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('orgCanvas')) return;

  // ===== DATA (aligned with portfolio descriptions) =====
  const companies = [
    {id:'holding',name:'Énosi Holding',level:0,pct:'',sector:'Holding',
     desc:'Holding che vanta diverse partecipazioni, sia di maggioranza che di minoranza, in molteplici settori industriali. Modello di business dinamico orientato alla creazione di valore, identifica e sviluppa opportunità di investimento strategiche per una crescita sostenibile e competitiva.'},
    {id:'enopharma',name:'Énopharma',level:1,pct:'100%',sector:'Pharma',parent:'holding',
     desc:'Centro di ricerca e sviluppo nel settore farmaceutico. Produce prodotti di nutraceutica e cosmetica su due linee: prodotti cosmetici e cicatrizzanti per la cura della pelle, e prodotti nutraceutici per il supporto delle funzioni vitali. Collabora con laboratori qualificati e Università.'},
    {id:'celera',name:'Celera Digital',level:1,pct:'100%',sector:'ICT',parent:'holding',
     desc:'Start-up innovativa certificata, specializzata in comunicazione integrata e consulenza digitale per le imprese. Il suo vantaggio competitivo risiede in una piattaforma digitale brevettata per l\'interconnessione delle informazioni, che abilita strategie di cross communication avanzate.'},
    {id:'edilmoaf',name:'Edil Moaf',level:1,pct:'10%',sector:'Engineering',parent:'holding',
     desc:'Edil Moaf unisce l\'esperienza di un team di professionisti qualificati alla qualità dei materiali e alle tecniche costruttive più avanzate del settore. Specializzata in progettazione, realizzazione e manutenzione di strutture e infrastrutture — opere civili, industriali, ricettive, sanitarie, ferroviarie, portuali, aeroportuali e stradali.'},
    {id:'consultreal',name:'Consult Real',level:1,pct:'10%',sector:'Consulenza',parent:'holding',
     desc:'Società di consulenza immobiliare e strategica al servizio del gruppo.'},
    {id:'siag',name:'SIAG Coffee',level:1,pct:'100%',sector:'Food',parent:'holding',
     desc:'Yes Coffee S.r.l. opera nel settore del caffè con un\'offerta che coniuga qualità, varietà e tradizione. Il portafoglio include cialde, capsule compatibili, caffè in grani e macinato, commercializzati sotto il marchio SIAG — nome consolidato e rispettato nel panorama del caffè tradizionale napoletano.'},
    {id:'ingenosi',name:'Ingenosi',level:1,pct:'90%',sector:'Engineering',parent:'holding',
     desc:'Ingenosi è la società di ingegneria del gruppo, specializzata nel supporto alle imprese in ogni fase del loro percorso innovativo: dalla progettazione tecnica all\'accesso ai benefici fiscali previsti per la Ricerca e Sviluppo, dall\'Innovazione alle tecnologie abilitanti della Transizione 4.0. Gestisce asseverazioni tecniche e pratiche brevettuali con competenza e precisione.'},
    {id:'aelodea',name:'Aelodea',level:1,pct:'51%',sector:'MedTech',parent:'holding',
     desc:'Aelodea (già Sinaloina) è un\'azienda italo-messicana specializzata nella produzione e distribuzione di materie prime a base di Aloe Vera di alta qualità. Seleziona con rigore le tecniche di coltivazione per garantire standard elevati sui prodotti finali — polveri, gel, polpa ed estratti — destinati ai settori cosmetico, degli integratori alimentari e farmaceutico.'},
    {id:'enosispa',name:'Énosi S.p.A.',level:1,pct:'100%',sector:'Consulenza',parent:'holding',
     desc:'Fondata nel 2013, Énosi S.p.A. è la società operativa che incarna il DNA della Holding. Eroga servizi di consulenza multidisciplinare — legale, tributaria, finanziaria, digitale, comunicazione e PR — applicati a settori eterogenei: dal sanitario all\'immobiliare, dall\'energetico all\'ICT, dalla manifattura al turismo. Nel tempo ha costruito un network di professionisti qualificati e una rete di Partner locali affiliati capaci di accompagnare clienti e partecipate verso soluzioni di avanguardia.'},
    {id:'areacrm',name:'Area CRM',level:1,pct:'100%',sector:'ICT',parent:'holding',
     desc:'Area CRM integra tecnologie innovative e competenze professionali in un modello originale di processo per realizzare progetti di content marketing e piani complessi di customer relationship management. Al centro di ogni intervento c\'è il pensiero strategico: prima la visione, poi gli strumenti.'},
    {id:'re',name:'Énosi RE',level:1,pct:'100%',sector:'Real Estate',parent:'holding',
     desc:'Énosi Real Estate opera nel settore immobiliare con una visione strategica che va oltre la compravendita. Si occupa di acquisto, vendita, locazione e permuta di immobili di qualsiasi tipo e destinazione, con particolare attenzione alla ristrutturazione e riqualificazione del patrimonio acquisito. Ogni operazione immobiliare è progettata per creare valore aggiunto funzionale alla strategia complessiva del gruppo.'},
    {id:'quasardam',name:'Quasardam',level:1,pct:'10%',sector:'MedTech',parent:'holding',
     desc:'Quasardam opera all\'avanguardia delle tecnologie mediche, con una missione precisa: sviluppare soluzioni innovative per la cura delle patologie oculari. La sua architettura tecnologica è progettata per offrire dispositivi di precisione clinica, scalabili e adattabili a diversi contesti medici e terapeutici.'},
    {id:'e3',name:'Eutecna E3',level:1,pct:'Partner',sector:'Engineering',parent:'holding',
     desc:'Partner ufficiale di Énosi Holding. Leader nella finanza agevolata e strumenti di supporto all\'innovazione. Supporta le aziende in progetti di ricerca, transizione innovativa 4.0/5.0 e internazionalizzazione, ampliando i servizi strategici del Gruppo.'},
    {id:'consulting',name:'Consulting',level:1,pct:'100%',sector:'Consulenza',parent:'holding',
     desc:'Con sede nel cuore di Londra, Énosi Consulting è il braccio internazionale del gruppo, dedicato alla consulenza strategica per le piccole e medie imprese che guardano oltre i confini nazionali. Controllata al 100% dalla Holding, persegue attivamente la strategia di sviluppo e internazionalizzazione del gruppo, operando come punto di riferimento per le partecipate che si affacciano sui mercati anglosassoni e globali.'},
    {id:'enosilab',name:'Énosi Lab',level:1,pct:'100%',sector:'Ricerca',parent:'holding',
     desc:'Énosi Lab è il laboratorio dove le idee prendono forma prima di diventare operazioni. Uno spazio di studio, ricerca e creatività dove nascono soluzioni innovative, si testano nuovi modelli di business e si identificano le opportunità del futuro. Non un centro di ricerca accademica, ma un motore operativo al servizio del network.'},
    {id:'finix',name:'Finix',level:2,pct:'100%',sector:'ICT',parent:'siag',
     desc:'Nata nel 2019 come successore diretto di Fujitsu Technology Solutions — attiva in Italia dal 1999 — Finix Technology Solutions è oggi un punto di riferimento nel settore ICT italiano. Specializzata in migrazione cloud, intelligenza artificiale, IoT, infrastrutture IT e SAP, detiene la rappresentanza esclusiva in Italia per le soluzioni progettuali Fujitsu.'},
    {id:'biogenera',name:'Biogenera',level:2,pct:'1.81%',sector:'MedTech',parent:'enosispa',
     desc:'PMI innovativa bolognese fondata nel 2008. Biotech farmaceutica con piattaforma brevettata MyGenera per farmaci personalizzati a DNA. Farmaco avanzato BGA002 per tumori infantili (neuroblastoma), con designazione di farmaco orfano da EMA e FDA.'},
    {id:'blusky',name:'Blu Sky',level:2,pct:'2.84%',sector:'Consulenza',parent:'enosispa',
     desc:'Hub di startup innovative e club di investimento con sede a Milano e circa 100 founder. Comparti attivi: economia circolare e fintech/e-commerce food gourmet. Raccolta fondi via equity crowdfunding.'},
    {id:'hbtc',name:'HBTC',level:2,pct:'',sector:'ICT',parent:'enosispa',
     desc:'Società controllata da Énosi S.p.A.'},
    {id:'monserrato',name:'Monserrato',level:2,pct:'98%',sector:'Real Estate',parent:'re',
     desc:'Immobiliare Monserrato detiene un asset strategico di grande potenziale: un edificio di 4.000 metri quadrati su una proprietà complessiva di oltre 6.000 metri quadrati, attualmente in fase avanzata di sviluppo. Il progetto prevede la realizzazione di una struttura residenziale per anziani all\'avanguardia.'},
    {id:'codex',name:'Codex',level:2,pct:'25%',sector:'Cybersecurity',parent:'consulting',
     desc:'Codex è la risposta del gruppo Énosi alla crescente domanda di sicurezza informatica avanzata. Opera nel campo della cybersecurity con soluzioni progettate per proteggere le infrastrutture digitali di imprese e organizzazioni da minacce sempre più sofisticate.'},
    {id:'blackshield',name:'Blackshield',level:2,pct:'49%',sector:'Cybersecurity',parent:'consulting',
     desc:'Blackshield Holding LTD, con sede a Londra, opera nel campo dell\'Intelligence Open Source (OSINT) con soluzioni basate su intelligenza artificiale di ultima generazione. La piattaforma è progettata per raccogliere informazioni in tempo reale, monitorare narrazioni online e gestire operazioni di influenza su scala globale.'},
    {id:'digix',name:'Digix',level:2,pct:'100%',sector:'ICT',parent:'consulting',
     desc:'Digix significa Digital Experience: non solo una promessa, ma un impegno operativo che si traduce ogni giorno nel lavoro di oltre 70 professionisti certificati. La società guida le imprese nel percorso di trasformazione digitale, dalla consulenza strategica all\'implementazione concreta di soluzioni che rendono i processi più agili e il business più competitivo.'},
    {id:'cyberangels',name:'Cyberangels',level:3,pct:'5.58%',sector:'Cybersecurity',parent:'blusky',
     desc:'Cyberangels è una piattaforma di Cyber Insurance progettata specificamente per aiutare micro e piccole imprese a gestire e mitigare i rischi informatici. Riconosciuta come Best InsurTech agli Italian InsurTech Awards 2021, rappresenta una risposta concreta alla vulnerabilità cyber delle imprese di minori dimensioni.'},
  ];

  const sectorColor = {
    Holding:'#C9A96E', ICT:'#4A90D9', Consulenza:'#B85A63', 'Real Estate':'#2D8A4E',
    Engineering:'#B4823C', MedTech:'#8250AA', Food:'#C87832', Cybersecurity:'#3CA0B4', Pharma:'#64AA78', Ricerca:'#6B88B0'
  };

  const level1 = companies.filter(c => c.level === 1);
  const level2 = companies.filter(c => c.level === 2);
  const level3 = companies.filter(c => c.level === 3);
  level1.forEach((c, i) => { c.baseAngle = (i / level1.length) * Math.PI * 2 - Math.PI / 2; });

  // ===== CANVAS =====
  const canvas = document.getElementById('orgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, dpr;

  function resize() {
    const container = document.querySelector('.orgchart-fullscreen');
    if (!container) return;
    dpr = window.devicePixelRatio || 1;
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // ===== CAMERA =====
  let camX = 0, camY = 0, camZoom = 0.55;
  let targetCamX = 0, targetCamY = 0, targetCamZoom = 0.55;
  let isDragging = false, dragStartX, dragStartY, dragCamX, dragCamY;

  function toScreen(wx, wy) {
    return { x: (wx - camX) * camZoom + W / 2, y: (wy - camY) * camZoom + H / 2 };
  }
  function toWorld(sx, sy) {
    return { x: (sx - W / 2) / camZoom + camX, y: (sy - H / 2) / camZoom + camY };
  }

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    targetCamZoom = Math.max(0.15, Math.min(3, targetCamZoom * factor));
  }, { passive: false });

  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const world = toWorld(e.offsetX, e.offsetY);
    if (findNodeAt(world.x, world.y)) return;
    isDragging = true;
    dragStartX = e.clientX; dragStartY = e.clientY;
    dragCamX = targetCamX; dragCamY = targetCamY;
    canvas.style.cursor = 'grabbing';
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = (e.clientX - dragStartX) / camZoom;
      const dy = (e.clientY - dragStartY) / camZoom;
      targetCamX = dragCamX - dx;
      targetCamY = dragCamY - dy;
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
  });

  canvas.addEventListener('mouseleave', () => { isDragging = false; });

  // Touch support
  let touchStartX, touchStartY, touchCamX, touchCamY, lastTouchDist;
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      const world = toWorld(t.clientX - canvas.getBoundingClientRect().left, t.clientY - canvas.getBoundingClientRect().top);
      if (findNodeAt(world.x, world.y)) return;
      isDragging = true;
      touchStartX = t.clientX; touchStartY = t.clientY;
      touchCamX = targetCamX; touchCamY = targetCamY;
    } else if (e.touches.length === 2) {
      isDragging = false;
      lastTouchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging) {
      const t = e.touches[0];
      const dx = (t.clientX - touchStartX) / camZoom;
      const dy = (t.clientY - touchStartY) / camZoom;
      targetCamX = touchCamX - dx;
      targetCamY = touchCamY - dy;
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      if (lastTouchDist) {
        const factor = dist / lastTouchDist;
        targetCamZoom = Math.max(0.15, Math.min(3, targetCamZoom * factor));
      }
      lastTouchDist = dist;
    }
  }, { passive: false });

  canvas.addEventListener('touchend', () => { isDragging = false; lastTouchDist = null; });

  // Zoom buttons
  document.getElementById('orgZoomIn').addEventListener('click', () => { targetCamZoom = Math.min(3, targetCamZoom * 1.4); });
  document.getElementById('orgZoomOut').addEventListener('click', () => { targetCamZoom = Math.max(0.15, targetCamZoom * 0.7); });
  document.getElementById('orgZoomReset').addEventListener('click', () => { targetCamX = 0; targetCamY = 0; targetCamZoom = 0.55; });

  // ===== LAYOUT =====
  const ORBIT_R1 = 380, CENTER_R = 100, L1_R = 38, L2_R = 26, L3_R = 18;
  const MOON_ORBIT = 90, MOON3_ORBIT = 50;
  let rotationAngle = 0;
  const ROTATION_SPEED = 0.00015;
  let isZoomed = false, zoomedPlanetId = null;
  let fadeTransition = 1, fadeTarget = 1;
  let selectedNodeId = null, time = 0, hoveredNode = null;

  function getNodePos(c) {
    if (c.level === 0) return { x: 0, y: 0 };
    if (c.level === 1) {
      const a = c.baseAngle + rotationAngle;
      return { x: Math.cos(a) * ORBIT_R1, y: Math.sin(a) * ORBIT_R1 };
    }
    if (c.level === 2) {
      const p = companies.find(x => x.id === c.parent);
      const pp = getNodePos(p);
      const sibs = level2.filter(s => s.parent === c.parent);
      const idx = sibs.indexOf(c);
      const a = (idx / sibs.length) * Math.PI * 2 + rotationAngle * 1.5;
      return { x: pp.x + Math.cos(a) * MOON_ORBIT, y: pp.y + Math.sin(a) * MOON_ORBIT };
    }
    if (c.level === 3) {
      const p = companies.find(x => x.id === c.parent);
      const pp = getNodePos(p);
      const sibs = level3.filter(s => s.parent === c.parent);
      const idx = sibs.indexOf(c);
      const a = (idx / sibs.length) * Math.PI * 2 + rotationAngle * 2;
      return { x: pp.x + Math.cos(a) * MOON3_ORBIT, y: pp.y + Math.sin(a) * MOON3_ORBIT };
    }
    return { x: 0, y: 0 };
  }

  function getRadius(c) {
    return c.level === 0 ? CENTER_R : c.level === 1 ? L1_R : c.level === 2 ? L2_R : L3_R;
  }

  function isInBranch(nid, pid) {
    if (nid === pid || nid === 'holding') return true;
    const n = companies.find(c => c.id === nid);
    if (!n) return false;
    if (n.parent === pid) return true;
    const p = companies.find(c => c.id === n.parent);
    if (p && p.parent === pid) return true;
    if (p) { const gp = companies.find(c => c.id === p.parent); if (gp && gp.parent === pid) return true; }
    return false;
  }

  function findNodeAt(wx, wy) {
    for (let i = companies.length - 1; i >= 0; i--) {
      const c = companies[i], pos = getNodePos(c), r = getRadius(c);
      const dx = wx - pos.x, dy = wy - pos.y;
      if (dx * dx + dy * dy < (r + 8) * (r + 8)) return c;
    }
    return null;
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `${r},${g},${b}`;
  }

  // ===== DRAW =====
  function draw() {
    time++;
    ctx.clearRect(0, 0, W, H);
    camX += (targetCamX - camX) * 0.08;
    camY += (targetCamY - camY) * 0.08;
    camZoom += (targetCamZoom - camZoom) * 0.08;
    fadeTransition += (fadeTarget - fadeTransition) * 0.05;
    if (!isZoomed) rotationAngle += ROTATION_SPEED;

    // Orbit ring
    const os = toScreen(0, 0);
    const orS = ORBIT_R1 * camZoom;
    ctx.beginPath(); ctx.arc(os.x, os.y, orS, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(107,28,35,${0.06 * fadeTransition})`;
    ctx.lineWidth = 1; ctx.setLineDash([3, 10]); ctx.stroke(); ctx.setLineDash([]);

    const getOp = (c) => (!isZoomed || !zoomedPlanetId) ? 1 : isInBranch(c.id, zoomedPlanetId) ? 1 : fadeTransition;

    // Connections
    companies.filter(c => c.parent).forEach(c => {
      const from = getNodePos(companies.find(p => p.id === c.parent));
      const to = getNodePos(c);
      const s1 = toScreen(from.x, from.y), s2 = toScreen(to.x, to.y);
      const op = getOp(c) * 0.3;
      if (op < 0.01) return;
      const isHL = hoveredNode && isInBranch(c.id, hoveredNode);
      ctx.beginPath(); ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y);
      ctx.strokeStyle = isHL ? `rgba(201,169,110,${op * 3})` : `rgba(107,28,35,${op})`;
      ctx.lineWidth = (isHL ? 2 : 1) * camZoom; ctx.stroke();
    });

    // Nodes
    const drawOrder = [...companies].sort((a, b) => b.level - a.level);
    drawOrder.forEach(c => {
      const wpos = getNodePos(c), pos = toScreen(wpos.x, wpos.y);
      const r = getRadius(c) * camZoom, opacity = getOp(c);
      if (opacity < 0.01 || r < 2) return;
      const isH = hoveredNode === c.id, isS = selectedNodeId === c.id;

      // Glow
      if (c.level === 0 || isH || isS) {
        const glowR = r + (c.level === 0 ? 25 : 14) * camZoom;
        const grd = ctx.createRadialGradient(pos.x, pos.y, r * 0.5, pos.x, pos.y, glowR);
        const gc = c.level === 0 ? '201,169,110' : '107,28,35';
        grd.addColorStop(0, `rgba(${gc},${0.25 * opacity})`);
        grd.addColorStop(1, `rgba(${gc},0)`);
        ctx.beginPath(); ctx.arc(pos.x, pos.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      }

      // Center pulse
      if (c.level === 0) {
        const pr = r + (12 + Math.sin(time * 0.02) * 8) * camZoom;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,169,110,${(0.15 + Math.sin(time * 0.02) * 0.1) * opacity})`;
        ctx.lineWidth = 1; ctx.stroke();
      }

      // Fill
      ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      if (c.level === 0) {
        const grd = ctx.createRadialGradient(pos.x - r * 0.3, pos.y - r * 0.3, 0, pos.x, pos.y, r);
        grd.addColorStop(0, `rgba(218,190,130,${opacity})`);
        grd.addColorStop(1, `rgba(170,140,80,${opacity})`);
        ctx.fillStyle = grd;
      } else if (c.level === 1) {
        ctx.fillStyle = `rgba(45,20,25,${opacity * 0.95})`;
      } else if (c.level === 2) {
        ctx.fillStyle = `rgba(55,25,30,${opacity * 0.9})`;
      } else {
        ctx.fillStyle = `rgba(65,30,35,${opacity * 0.85})`;
      }
      ctx.fill();

      // Border
      ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      const colors = { 0: '#C9A96E', 1: '#6B1C23', 2: '#8B2D35', 3: '#A94452' };
      const borderColor = isH || isS ? '#C9A96E' : (colors[c.level] || '#6B1C23');
      ctx.strokeStyle = `rgba(${hexToRgb(borderColor)},${(isH || isS ? 1 : 0.6) * opacity})`;
      ctx.lineWidth = (isH || isS ? 2.5 : 1.5) * Math.min(camZoom, 1.5);
      ctx.stroke();

      // Labels
      if (r > 8) {
        const fontSize = Math.max(7, (c.level === 0 ? 22 : c.level === 1 ? 10.5 : 8.5) * Math.min(camZoom, 1.8));
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `${c.level === 0 ? 600 : 500} ${fontSize}px Inter`;
        ctx.fillStyle = `rgba(245,240,235,${opacity * 0.95})`;
        const name = c.name;
        if (name.length > 11 && r > 15) {
          const words = name.split(' ');
          if (words.length >= 2) {
            ctx.fillText(words[0], pos.x, pos.y - fontSize * 0.35);
            ctx.fillText(words.slice(1).join(' '), pos.x, pos.y + fontSize * 0.55);
          } else { ctx.fillText(name, pos.x, pos.y); }
        } else {
          ctx.fillText(name, pos.x, pos.y - (c.pct && r > 20 ? 3 : 0));
        }
        if (c.pct && c.level > 0 && r > 14) {
          const pctSize = Math.max(6, 8 * Math.min(camZoom, 1.5));
          ctx.font = `700 ${pctSize}px Inter`;
          ctx.fillStyle = `rgba(201,169,110,${opacity * 0.7})`;
          ctx.fillText(c.pct, pos.x, pos.y + r + 14 * Math.min(camZoom, 1.2));
        }
      }
    });
    requestAnimationFrame(draw);
  }

  // ===== INTERACTION =====
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) return;
    const world = toWorld(e.offsetX, e.offsetY);
    const found = findNodeAt(world.x, world.y);
    hoveredNode = found ? found.id : null;
    canvas.style.cursor = found ? 'pointer' : 'grab';
  });

  canvas.addEventListener('click', (e) => {
    if (isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const world = toWorld(e.clientX - rect.left, e.clientY - rect.top);
    const clicked = findNodeAt(world.x, world.y);
    if (clicked) handleNodeClick(clicked);
    else if (!isZoomed) closePanel();
  });

  // Touch tap
  canvas.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      const t = e.changedTouches[0];
      const rect = canvas.getBoundingClientRect();
      const world = toWorld(t.clientX - rect.left, t.clientY - rect.top);
      const clicked = findNodeAt(world.x, world.y);
      if (clicked) handleNodeClick(clicked);
    }
  });

  function handleNodeClick(c) {
    selectedNodeId = c.id;
    if (c.level === 1 && !isZoomed) zoomIntoPlanet(c);
    else if (c.level === 0 && isZoomed) zoomOut();
    else showPanel(c);
    if (isZoomed || c.level !== 1) showPanel(c);
  }

  function zoomIntoPlanet(c) {
    isZoomed = true; zoomedPlanetId = c.id; fadeTarget = 0.04;
    const pos = getNodePos(c), zoomTo = 1.2;
    targetCamX = pos.x + 460 / (2 * zoomTo);
    targetCamY = pos.y; targetCamZoom = zoomTo;
    document.getElementById('orgBackBtn').classList.add('show');
    document.getElementById('orgEcoLabel').classList.add('show');
    document.getElementById('orgEcoTitle').textContent = 'Ecosistema ' + c.name;
    document.getElementById('orgEcoSub').textContent = c.sector + (c.pct ? ' · ' + c.pct : '');
    showPanel(c);
  }

  function zoomOut() {
    isZoomed = false; zoomedPlanetId = null; fadeTarget = 1;
    selectedNodeId = null; targetCamX = 0; targetCamY = 0; targetCamZoom = 0.55;
    document.getElementById('orgBackBtn').classList.remove('show');
    document.getElementById('orgEcoLabel').classList.remove('show');
    closePanel();
  }

  const logoOverrides = {
    're': 'enosire',
    'e3': 'eutecna',
    'enosilab': 'enosilab',
  };

  function showPanel(c) {
    const panel = document.getElementById('orgPanel');
    const content = document.getElementById('orgPanelContent');
    const sc = sectorColor[c.sector] || '#fff';
    const parent = companies.find(p => p.id === c.parent);
    const children = companies.filter(ch => ch.parent === c.id);
    const logoFile = logoOverrides[c.id] || c.id;
    let html = `<div class="panel-badge" style="background:rgba(${hexToRgb(sc)},.12);color:${sc}">${c.sector}</div>`;
    html += `<div style="width:80px;height:80px;margin-bottom:16px;"><img src="assets/partners/${logoFile}.png" alt="${c.name}" style="max-width:100%;max-height:100%;object-fit:contain;" onerror="this.style.display='none'"></div>`;
    html += `<div class="panel-name">${c.name}</div>`;
    if (c.pct) html += `<div class="panel-pct">${c.pct}</div>`;
    if (c.year) html += `<div style="font-size:.7rem;color:rgba(245,240,235,0.4);margin-bottom:12px;">Partecipazione dal ${c.year}</div>`;
    html += `<div class="panel-desc">${c.desc}</div>`;
    if (parent) html += `<div class="panel-parent">Controllata da <strong>${parent.name}</strong>${c.pct ? ' al ' + c.pct : ''}</div>`;
    if (children.length > 0) {
      html += `<div class="panel-subs"><div class="panel-subs-title">Controllate</div>`;
      children.forEach(ch => { html += `<div class="panel-sub" data-id="${ch.id}"><span>${ch.name}</span><span>${ch.pct}</span></div>`; });
      html += '</div>';
    }
    content.innerHTML = html;
    panel.classList.add('open');
    content.querySelectorAll('.panel-sub').forEach(el => {
      el.addEventListener('click', () => {
        const node = companies.find(c => c.id === el.dataset.id);
        if (node) { selectedNodeId = node.id; showPanel(node); }
      });
    });
  }

  function closePanel() { document.getElementById('orgPanel').classList.remove('open'); }

  document.getElementById('orgBackBtn').addEventListener('click', zoomOut);
  document.getElementById('orgEcoBack').addEventListener('click', zoomOut);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (isZoomed) zoomOut(); else closePanel(); }
  });

  draw();
});
