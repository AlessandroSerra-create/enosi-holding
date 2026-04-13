/* ============================================
   ÉNOSI HOLDING — Main JavaScript v2
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar Scroll --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* --- Hamburger Menu --- */
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Language Switcher (real translations) --- */
  function setLanguage(lang) {
    if (typeof translations === 'undefined') return;
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('.lang-switch .lang').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('enosi-lang', lang);
  }

  // Init language
  const savedLang = localStorage.getItem('enosi-lang') || 'it';
  if (savedLang !== 'it') setLanguage(savedLang);

  document.querySelectorAll('.lang-switch .lang').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  /* --- Hero Slideshow --- */
  (function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4000);
  })();

  /* --- Team Cards Stagger Setup --- */
  document.querySelectorAll('.team-card').forEach((card, i) => {
    card.classList.add('fade-up');
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  /* --- Fade Up / Stagger / Slide Observer --- */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stagger-parent')) {
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 120);
          });
        } else {
          entry.target.classList.add('visible');
        }
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-up, .slide-left, .slide-right, .stagger-parent').forEach(el => {
    fadeObserver.observe(el);
  });

  /* --- Word Split Animation --- */
  document.querySelectorAll('.word-split').forEach(el => {
    const text = el.textContent.trim();
    const words = text.split(' ');
    el.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      span.style.transitionDelay = `${i * 0.08}s`;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });

    const wordObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          wordObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    wordObserver.observe(el);
  });

  /* --- Globe Scroll Animation (Canvas) --- */
  const scrollAnim = document.querySelector('.scroll-animation');
  if (scrollAnim) {
    const canvas = scrollAnim.querySelector('.scroll-animation__canvas');
    const ctx = canvas.getContext('2d');
    const frameCount = 91;
    const images = [];
    let loaded = 0;
    const loader = document.querySelector('.frame-loader');
    const loaderBar = document.querySelector('.frame-loader__bar');
    const loaderText = document.querySelector('.frame-loader__text');
    const scrollCards = scrollAnim.querySelectorAll('.scroll-card');
    const scrollCardsContainer = scrollAnim.querySelector('.scroll-cards-container');

    function pad(n) { return String(n).padStart(4, '0'); }

    function onFrameLoaded() {
      loaded++;
      const pct = Math.round((loaded / frameCount) * 100);
      if (loaderBar) loaderBar.style.width = pct + '%';
      if (loaderText) loaderText.textContent = pct + '%';
      if (loaded === frameCount) {
        if (loader) loader.classList.add('hidden');
        resizeCanvas();
        drawFrame(0);
        initScrollDriven();
        window.addEventListener('resize', () => { resizeCanvas(); drawFrame(currentFrameIndex); });
      }
    }

    let currentFrameIndex = 0;
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.onload = onFrameLoaded;
      img.onerror = () => { onFrameLoaded(); };
      img.src = `frames-webp/frame_${pad(i)}.webp`;
      images.push(img);
    }

    function drawFrame(index) {
      currentFrameIndex = index;
      const img = images[Math.min(index, images.length - 1)];
      if (!img || !img.complete) return;
      // Use CSS pixel dimensions (ctx transform handles DPR scaling)
      const cssW = canvas.width / dpr;
      const cssH = canvas.height / dpr;
      // Scale to 60% of viewport height
      const scale = (cssH * 0.6) / img.naturalHeight;
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      // Position globe at 38% X, centered Y
      const offsetX = (cssW * 0.38) - (drawW / 2);
      const offsetY = (cssH - drawH) / 2;
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#FAFAF8';
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }

    function initScrollDriven() {
      window.addEventListener('scroll', () => {
        const rect = scrollAnim.getBoundingClientRect();
        const scrollHeight = scrollAnim.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
        const frameIndex = Math.round(progress * (frameCount - 1));
        drawFrame(frameIndex);

        // Show/hide cards container based on scroll section visibility
        if (scrollCardsContainer) {
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          scrollCardsContainer.style.display = inView ? '' : 'none';
        }

        // Annotation cards
        scrollCards.forEach(card => {
          const min = parseFloat(card.dataset.showFrom);
          const max = parseFloat(card.dataset.showTo);
          card.classList.toggle('visible', progress >= min && progress <= max);
        });
      }, { passive: true });
    }
  }

  /* --- Timeline Animation (Il Gruppo) --- */
  const timelineFill = document.querySelector('.timeline__line-fill');
  if (timelineFill) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineFill.classList.add('animated');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    tlObserver.observe(timelineFill.parentElement);
  }

  /* --- Portfolio Filter --- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        portfolioCards.forEach(card => {
          const sector = card.getAttribute('data-sector');
          if (filter === 'all' || sector === filter) {
            card.style.display = '';
            setTimeout(() => card.classList.add('visible'), 10);
          } else {
            card.style.display = 'none';
            card.classList.remove('visible');
          }
        });
      });
    });
  }

  /* --- Portfolio Modal --- */
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    const modalCard = modalOverlay.querySelector('.modal-card');
    const modalClose = modalOverlay.querySelector('.modal-close');
    const modalLogo = modalOverlay.querySelector('.modal-logo');
    const modalName = modalOverlay.querySelector('.modal-name');
    const modalTag = modalOverlay.querySelector('.modal-meta .portfolio-card__tag');
    const modalPercent = modalOverlay.querySelector('.modal-percent');
    const modalDesc = modalOverlay.querySelector('.modal-desc');
    const modalLink = modalOverlay.querySelector('.modal-link');

    // Company details for modals (also used by orgchart)
    window.companyDetails = {
      'Énosi S.p.A.': { desc: "Fondata nel 2013, Énosi S.p.A. è la società operativa che incarna il DNA della Holding. Eroga servizi di consulenza multidisciplinare — legale, tributaria, finanziaria, digitale, comunicazione e PR — applicati a settori eterogenei: dal sanitario all'immobiliare, dall'energetico all'ICT, dalla manifattura al turismo. Nel tempo ha costruito un network di professionisti qualificati e una rete di Partner locali affiliati capaci di accompagnare clienti e partecipate verso soluzioni di avanguardia." },
      'Énosi Real Estate': { desc: "Énosi Real Estate opera nel settore immobiliare con una visione strategica che va oltre la compravendita. Si occupa di acquisto, vendita, locazione e permuta di immobili di qualsiasi tipo e destinazione, con particolare attenzione alla ristrutturazione e riqualificazione del patrimonio acquisito. Ogni operazione immobiliare è progettata per creare valore aggiunto funzionale alla strategia complessiva del gruppo." },
      'Énosi Consulting': { desc: "Con sede nel cuore di Londra, Énosi Consulting è il braccio internazionale del gruppo, dedicato alla consulenza strategica per le piccole e medie imprese che guardano oltre i confini nazionali. Controllata al 100% dalla Holding, persegue attivamente la strategia di sviluppo e internazionalizzazione del gruppo, operando come punto di riferimento per le partecipate che si affacciano sui mercati anglosassoni e globali." },
      'Énosi Lab': { desc: "Énosi Lab è il laboratorio dove le idee prendono forma prima di diventare operazioni. Uno spazio di studio, ricerca e creatività dove nascono soluzioni innovative, si testano nuovi modelli di business e si identificano le opportunità del futuro. Non un centro di ricerca accademica, ma un motore operativo al servizio del network." },
      'Ingenosi': { desc: "Ingenosi è la società di ingegneria del gruppo, specializzata nel supporto alle imprese in ogni fase del loro percorso innovativo: dalla progettazione tecnica all'accesso ai benefici fiscali previsti per la Ricerca e Sviluppo, dall'Innovazione alle tecnologie abilitanti della Transizione 4.0. Gestisce asseverazioni tecniche e pratiche brevettuali con competenza e precisione." },
      'Finix Technology Solutions': { desc: "Nata nel 2019 come successore diretto di Fujitsu Technology Solutions — attiva in Italia dal 1999 — Finix Technology Solutions è oggi un punto di riferimento nel settore ICT italiano. Specializzata in migrazione cloud, intelligenza artificiale, IoT, infrastrutture IT e SAP, detiene la rappresentanza esclusiva in Italia per le soluzioni progettuali Fujitsu.", link: 'https://www.finix-ts.com' },
      'Digix': { desc: "Digix significa Digital Experience: non solo una promessa, ma un impegno operativo che si traduce ogni giorno nel lavoro di oltre 70 professionisti certificati. La società guida le imprese nel percorso di trasformazione digitale, dalla consulenza strategica all'implementazione concreta di soluzioni che rendono i processi più agili e il business più competitivo." },
      'Celera Digital': { desc: "Celera Digital è una start-up innovativa certificata, specializzata in comunicazione integrata e consulenza digitale per le imprese. Il suo vantaggio competitivo risiede in una piattaforma digitale brevettata per l'interconnessione delle informazioni, che abilita strategie di cross communication avanzate." },
      'Area CRM': { desc: "Area CRM integra tecnologie innovative e competenze professionali in un modello originale di processo per realizzare progetti di content marketing e piani complessi di customer relationship management. Al centro di ogni intervento c'è il pensiero strategico: prima la visione, poi gli strumenti." },
      'Edil Moaf': { desc: "Edil Moaf unisce l'esperienza di un team di professionisti qualificati alla qualità dei materiali e alle tecniche costruttive più avanzate del settore. Specializzata in progettazione, realizzazione e manutenzione di strutture e infrastrutture — opere civili, industriali, ricettive, sanitarie, ferroviarie, portuali, aeroportuali e stradali." },
      'Aelodea': { desc: "Aelodea (già Sinaloina) è un'azienda italo-messicana specializzata nella produzione e distribuzione di materie prime a base di Aloe Vera di alta qualità. Seleziona con rigore le tecniche di coltivazione per garantire standard elevati sui prodotti finali — polveri, gel, polpa ed estratti — destinati ai settori cosmetico, degli integratori alimentari e farmaceutico." },
      'Immobiliare Monserrato': { desc: "Immobiliare Monserrato detiene un asset strategico di grande potenziale: un edificio di 4.000 metri quadrati su una proprietà complessiva di oltre 6.000 metri quadrati, attualmente in fase avanzata di sviluppo. Il progetto prevede la realizzazione di una struttura residenziale per anziani all'avanguardia." },
      'Cyberangels': { desc: "Cyberangels è una piattaforma di Cyber Insurance progettata specificamente per aiutare micro e piccole imprese a gestire e mitigare i rischi informatici. Riconosciuta come Best InsurTech agli Italian InsurTech Awards 2021, rappresenta una risposta concreta alla vulnerabilità cyber delle imprese di minori dimensioni." },
      'Quasardam': { desc: "Quasardam opera all'avanguardia delle tecnologie mediche, con una missione precisa: sviluppare soluzioni innovative per la cura delle patologie oculari. La sua architettura tecnologica è progettata per offrire dispositivi di precisione clinica, scalabili e adattabili a diversi contesti medici e terapeutici." },
      'Yes Coffee / SIAG': { desc: "Yes Coffee S.r.l. opera nel settore del caffè con un'offerta che coniuga qualità, varietà e tradizione. Il portafoglio include cialde, capsule compatibili, caffè in grani e macinato, commercializzati sotto il marchio SIAG — nome consolidato e rispettato nel panorama del caffè tradizionale napoletano." },
      'Blackshield Holding': { desc: "Blackshield Holding LTD, con sede a Londra, opera nel campo dell'Intelligence Open Source (OSINT) con soluzioni basate su intelligenza artificiale di ultima generazione. La piattaforma è progettata per raccogliere informazioni in tempo reale, monitorare narrazioni online e gestire operazioni di influenza su scala globale." },
      'Codex': { desc: "Codex è la risposta del gruppo Énosi alla crescente domanda di sicurezza informatica avanzata. Opera nel campo della cybersecurity con soluzioni progettate per proteggere le infrastrutture digitali di imprese e organizzazioni da minacce sempre più sofisticate." }
    };

    portfolioCards.forEach(card => {
      card.addEventListener('click', () => {
        const name = card.querySelector('.portfolio-card__name').textContent;
        const tag = card.querySelector('.portfolio-card__tag').textContent;
        const pct = card.querySelector('.portfolio-card__percent').textContent;
        const details = window.companyDetails[name] || {};

        const logoMap = {'Énosi S.p.A.':'enosispa','Énosi Real Estate':'enosire','Énosi Consulting':'consulting','Énosi Lab':'enosilab','Ingenosi':'ingenosi','Finix Technology Solutions':'finix','Digix':'digix','Celera Digital':'celera','Area CRM':'areacrm','Edil Moaf':'edilmoaf','Aelodea':'aelodea','Immobiliare Monserrato':'monserrato','Cyberangels':'cyberangels','Quasardam':'quasardam','Yes Coffee / SIAG':'siag','Blackshield Holding':'blackshield','Codex':'codex'};
        const logoId = logoMap[name] || name.toLowerCase().replace(/\s+/g,'');
        modalLogo.innerHTML = '<img src="assets/partners/' + logoId + '.png" alt="' + name + '" style="max-width:120px;max-height:80px;object-fit:contain;" onerror="this.style.display=\'none\'">';
        modalName.textContent = name;
        if (modalTag) modalTag.textContent = tag;
        if (modalPercent) modalPercent.textContent = pct;
        modalDesc.textContent = details.desc || card.querySelector('.portfolio-card__desc').textContent;

        if (details.link && modalLink) {
          modalLink.href = details.link;
          modalLink.style.display = '';
          modalLink.textContent = details.link.replace('https://', '').replace('www.', '');
        } else if (modalLink) {
          modalLink.style.display = 'none';
        }

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });
  }

  /* --- Leaflet Map (Portfolio) --- */
  if (document.getElementById('enosiMap') && typeof L !== 'undefined') {
    const map = L.map('enosiMap', {
      center: [25, 30],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      scrollWheelZoom: false,
      zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      maxZoom: 19
    }).addTo(map);

    const cities = [
      { name: 'Roma', coords: [41.9028, 12.4964], address: 'Via Tirso 26, 00198', main: true },
      { name: 'Milano', coords: [45.4642, 9.1900], address: 'Via Brera 3, 20121', main: false },
      { name: 'Londra', coords: [51.5074, -0.1278], address: 'Carlisle Street 17, W1D 3BU', main: false },
      { name: 'Madrid', coords: [40.4168, -3.7038], address: 'Calle Almagro 22, 28010', main: false },
      { name: 'Lugano', coords: [46.0037, 8.9511], address: 'Corso Elvezia 25, 6900', main: false },
      { name: 'Dubai', coords: [25.2048, 55.2708], address: 'Dubai, UAE', main: false },
      { name: 'Miami', coords: [25.7617, -80.1918], address: 'Miami, FL, USA', main: false },
      { name: 'Kuala Lumpur', coords: [3.1390, 101.6869], address: 'Kuala Lumpur, Malaysia', main: false }
    ];

    const roma = cities[0].coords;
    cities.forEach(city => {
      const icon = L.divIcon({
        className: 'enosi-marker',
        html: '<div class="marker-dot ' + (city.main ? 'main' : '') + '"><div class="marker-ping"></div></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      L.marker(city.coords, { icon: icon })
        .addTo(map)
        .bindPopup(
          '<div style="padding:8px;text-align:center;">' +
          '<strong style="font-family:Playfair Display,serif;font-size:1.1rem;">' + city.name + '</strong><br>' +
          '<span style="color:#999;font-size:0.8rem;">' + city.address + '</span></div>'
        );
    });

    cities.slice(1).forEach(city => {
      L.polyline([roma, city.coords], {
        color: '#C9A96E', weight: 1.5, opacity: 0.25, dashArray: '6 10'
      }).addTo(map);
    });
  }

  /* --- Orgchart Hover + Click to Modal --- */
  const orgNodes = document.querySelectorAll('.orgchart__node');
  const orgTooltip = document.querySelector('.orgchart__tooltip');
  const orgModal = document.querySelector('.modal-overlay');
  if (orgNodes.length && orgTooltip) {
    orgNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        const pctStr = node.dataset.pct ? ' — ' + node.dataset.pct : '';
        orgTooltip.textContent = node.dataset.fullname + pctStr;
        orgTooltip.classList.add('visible');
        const rect = node.getBoundingClientRect();
        const parentRect = node.closest('.orgchart').getBoundingClientRect();
        orgTooltip.style.left = (rect.left - parentRect.left + rect.width / 2) + 'px';
        orgTooltip.style.top = (rect.top - parentRect.top - 45) + 'px';
      });
      node.addEventListener('mouseleave', () => {
        orgTooltip.classList.remove('visible');
      });
      // Click to open modal (reuse portfolio modal if present)
      if (orgModal) {
        node.addEventListener('click', () => {
          const name = node.dataset.fullname;
          const pct = node.dataset.pct || '';
          const modalName = orgModal.querySelector('.modal-name');
          const modalLogo = orgModal.querySelector('.modal-logo');
          const modalPercent = orgModal.querySelector('.modal-percent');
          const modalDesc = orgModal.querySelector('.modal-desc');
          const modalTag = orgModal.querySelector('.modal-meta .portfolio-card__tag');
          const modalLink = orgModal.querySelector('.modal-link');
          if (modalName) modalName.textContent = name;
          if (modalLogo) modalLogo.textContent = name;
          if (modalPercent) modalPercent.textContent = pct;
          if (modalTag) modalTag.textContent = '';
          if (modalDesc) {
            const details = window.companyDetails ? window.companyDetails[name] : null;
            modalDesc.textContent = details ? details.desc : name;
          }
          if (modalLink) modalLink.style.display = 'none';
          orgModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      }
    });
  }

  /* --- Values Scroll-Driven (Chi Siamo) --- */
  const valuesSection = document.querySelector('.values-section');
  if (valuesSection) {
    const navItems = valuesSection.querySelectorAll('.values-nav-item');
    const panels = valuesSection.querySelectorAll('.values-panel');
    let currentValue = 0;

    function setActiveValue(idx) {
      if (idx === currentValue) return;
      currentValue = idx;
      navItems.forEach((item, i) => item.classList.toggle('active', i === idx));
      panels.forEach((panel, i) => panel.classList.toggle('active', i === idx));
    }

    // Desktop: scroll-driven
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', () => {
        const rect = valuesSection.getBoundingClientRect();
        const scrollHeight = valuesSection.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
        const idx = Math.min(2, Math.floor(progress * 3));
        setActiveValue(idx);
      }, { passive: true });
    }

    // Click nav items
    navItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        if (window.innerWidth > 768) {
          const sectionTop = valuesSection.offsetTop;
          const scrollHeight = valuesSection.offsetHeight - window.innerHeight;
          const targetScroll = sectionTop + (i / 3) * scrollHeight;
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        } else {
          setActiveValue(i);
        }
      });
    });

    // Init first panel
    setActiveValue(0);
  }

  /* --- Contact Form mailto --- */
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const nome = fd.get('nome') || '';
      const azienda = fd.get('azienda') || '';
      const email = fd.get('email') || '';
      const telefono = fd.get('telefono') || '';
      const settore = fd.get('settore') || '';
      const messaggio = fd.get('messaggio') || '';

      const subject = encodeURIComponent(`Contatto dal sito — ${nome}${azienda ? ' (' + azienda + ')' : ''}`);
      const body = encodeURIComponent(
        `Nome: ${nome}\nAzienda: ${azienda}\nEmail: ${email}\nTelefono: ${telefono}\nSettore: ${settore}\n\nMessaggio:\n${messaggio}`
      );
      window.location.href = `mailto:info@enosi.it?subject=${subject}&body=${body}`;
    });
  }

});
