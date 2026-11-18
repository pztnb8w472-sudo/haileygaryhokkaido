/* =========================================================
   北海道旅行網站｜功能程式 app.js
   一般修改不需要動這個檔案，內容請改 data.js
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- 小工具 ---------------- */
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tbc = (s) => esc(s).replace(/待確認/g, '<span class="tbc">待確認</span>');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { toast('瀏覽器無法儲存資料（可能是無痕模式）'); return false; } }
  };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const fmt = (n, d) => Number(n || 0).toLocaleString('zh-TW', { maximumFractionDigits: d == null ? 0 : d });
  const pad2 = (n) => String(n).padStart(2, '0');
  const DOW_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function ask(title, text, ok, danger) {
    return new Promise((resolve) => {
      const bg = $('#modalBg');
      $('#modal').innerHTML = `<h3>${esc(title)}</h3><p>${esc(text)}</p><div class="btn-row"><button class="btn" data-a="0">取消</button><button class="btn ${danger ? 'danger' : 'dark'}" data-a="1">${esc(ok || '確定')}</button></div>`;
      bg.classList.add('open');
      const done = (v) => { bg.classList.remove('open'); bg.onclick = null; resolve(v); };
      bg.onclick = (e) => { const a = e.target.getAttribute('data-a'); if (a !== null) done(a === '1'); else if (e.target === bg) done(false); };
    });
  }

  /* ---------------- Google Maps ---------------- */
  const gSearch = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  const gEmbed = (q) => 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&hl=zh-TW&z=15&output=embed';
  function gRoute(list) {
    const u = list.filter((q, i) => q && q !== list[i - 1]);
    if (u.length < 2) return gSearch(u[0] || 'Hokkaido');
    let url = 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(u[0]) + '&destination=' + encodeURIComponent(u[u.length - 1]);
    const mid = u.slice(1, -1).slice(0, 8);
    if (mid.length) url += '&waypoints=' + mid.map(encodeURIComponent).join('%7C');
    return url;
  }

  /* ---------------- 圖示 ---------------- */
  const IC = {
    flight: '<path d="M10.5 20 13 13l6 2.5c1 .4 2-.3 2-1.3 0-.6-.3-1.1-.8-1.4L13 9V4.5a1.5 1.5 0 0 0-3 0V9L2.8 12.8c-.5.3-.8.8-.8 1.4 0 1 1 1.7 2 1.3L10 13l-.5 7"/>',
    train: '<rect x="6" y="3" width="12" height="14" rx="3"/><path d="M6 11h12M9 21l1.5-4M15 21l-1.5-4M9 14h.01M15 14h.01"/>',
    bus: '<rect x="4" y="4" width="16" height="13" rx="2.5"/><path d="M4 11h16M8 20v-3M16 20v-3M8 14h.01M16 14h.01"/>',
    walk: '<circle cx="13" cy="4" r="1.6"/><path d="m9 21 2.5-6 2.5 2v4M8 12l3-4 3 2 3 1M11 8l-1 5"/>',
    spot: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10" r="2.3"/>',
    food: '<path d="M5 3v8a3 3 0 0 0 3 3v7M8 3v6M11 3v8a3 3 0 0 1-3 3M17 21V3c-2 1-3.5 4-3.5 8h3.5"/>',
    hotel: '<path d="M3 20V7M3 14h18v6M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.8"/>',
    event: '<path d="M12 3l1.8 4.2L18 8l-3.2 3 .9 4.5L12 13.4 8.3 15.5l.9-4.5L6 8l4.2-.8z"/><path d="M12 17v4"/>',
    shop: '<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    plan: '<path d="M4 12h3l2-6 4 12 2-6h5"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    nav: '<path d="M3 11 21 3l-8 18-2-8z"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    partly: '<path d="M8 3v1.5M3.5 8H2M4.6 4.6l1 1M12.4 4.6l-1 1"/><path d="M5.3 10.6A3.5 3.5 0 1 1 11.6 7"/><path d="M8 20h9a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6 1.6A3.2 3.2 0 0 0 8 20z"/>',
    cloud: '<path d="M7 19h10a4.5 4.5 0 0 0 .6-9A6 6 0 0 0 6 11.3 3.8 3.8 0 0 0 7 19z"/>',
    fog: '<path d="M4 10h16M3 14h18M6 18h12M8 6h8"/>',
    rain: '<path d="M7 15h10a4.5 4.5 0 0 0 .6-9A6 6 0 0 0 6 7.3 3.8 3.8 0 0 0 7 15z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
    snow: '<path d="M7 14h10a4.5 4.5 0 0 0 .6-9A6 6 0 0 0 6 6.3 3.8 3.8 0 0 0 7 14z"/><path d="M8 17v.01M12 18v.01M16 17v.01M10 20.5v.01M14 20.5v.01"/>',
    storm: '<path d="M7 14h10a4.5 4.5 0 0 0 .6-9A6 6 0 0 0 6 6.3 3.8 3.8 0 0 0 7 14z"/><path d="m12 15-2 4h4l-2 4"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>'
  };
  const icon = (k) => `<svg viewBox="0 0 24 24">${IC[k] || IC.spot}</svg>`;

  /* ---------------- 照片載入（Wikimedia） ---------------- */
  const imgCache = store.get('hk_img_v2', {});
  const imgPending = {};
  function resolveImg(key) {
    const p = PHOTOS[key];
    if (!p) return Promise.resolve(null);
    if (p.src) return Promise.resolve(p);
    if (!p.wiki) return Promise.resolve(null);
    if (imgCache[p.wiki] !== undefined) return Promise.resolve(imgCache[p.wiki]);
    if (imgPending[p.wiki]) return imgPending[p.wiki];
    imgPending[p.wiki] = fetch('https://ja.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(p.wiki))
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        let out = null;
        if (d && (d.originalimage || d.thumbnail)) {
          const o = d.originalimage, t = d.thumbnail;
          let src = o && o.width <= 1600 ? o.source : (t ? t.source.replace(/\/\d+px-/, '/1280px-') : o.source);
          const file = decodeURIComponent((o ? o.source : t.source).split('/').pop());
          out = { src: src, credit: 'Wikimedia Commons', page: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(file) };
        }
        imgCache[p.wiki] = out; store.set('hk_img_v2', imgCache); return out;
      })
      .catch(() => null);
    return imgPending[p.wiki];
  }
  function phHTML(key, label, cls) {
    return `<div class="${cls || 'ph'}" data-label="${esc(label)}"><img data-img="${esc(key)}" alt="${esc(label)}" class="loading" loading="lazy"><span class="cr" hidden></span></div>`;
  }
  function hydrate(root) {
    $$('img[data-img]', root).forEach((img) => {
      const box = img.parentElement;
      const key = img.getAttribute('data-img');
      img.removeAttribute('data-img');
      img.onload = () => img.classList.remove('loading');
      img.onerror = () => box.classList.add('noimg');
      resolveImg(key).then((info) => {
        if (!info) { box.classList.add('noimg'); return; }
        img.src = info.src;
        const cr = box.querySelector('.cr');
        if (cr && info.credit) { cr.hidden = false; cr.innerHTML = info.page ? `<a href="${esc(info.page)}" target="_blank" rel="noopener">📷 ${esc(info.credit)}</a>` : esc(info.credit); }
      });
    });
  }

  /* ---------------- 日出日落（天文公式計算） ---------------- */
  function sunTimes(dateStr, lat, lon) {
    const d = new Date(dateStr + 'T00:00:00Z');
    const N = Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5);
    const rad = Math.PI / 180, lngH = lon / 15;
    const n360 = (x) => ((x % 360) + 360) % 360;
    function calc(rise) {
      const t = N + ((rise ? 6 : 18) - lngH) / 24;
      const M = 0.9856 * t - 3.289;
      const L = n360(M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634);
      let RA = n360(Math.atan(0.91764 * Math.tan(L * rad)) / rad);
      RA = (RA + (Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90)) / 15;
      const sinD = 0.39782 * Math.sin(L * rad), cosD = Math.cos(Math.asin(sinD));
      const cosH = (Math.cos(90.833 * rad) - sinD * Math.sin(lat * rad)) / (cosD * Math.cos(lat * rad));
      const H = (rise ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad) / 15;
      const T = H + RA - 0.06571 * t - 6.622;
      const local = (((T - lngH + 9) % 24) + 24) % 24;
      const h = Math.floor(local), m = Math.round((local - h) * 60);
      return pad2(m === 60 ? h + 1 : h) + ':' + pad2(m === 60 ? 0 : m);
    }
    return { rise: calc(true), set: calc(false) };
  }
  const DAY_PLACE = { 1: 0, 2: 2, 3: 1, 4: 3, 5: 4, 6: 4, 7: 4, 8: 4 };

  /* ---------------- 天氣（Open-Meteo） ---------------- */
  const WX = {
    text(c) {
      if (c === 0) return '晴'; if (c === 1) return '大致晴朗'; if (c === 2) return '晴時多雲'; if (c === 3) return '陰';
      if (c === 45 || c === 48) return '霧'; if (c >= 51 && c <= 57) return '毛毛雨'; if (c >= 61 && c <= 67) return '雨';
      if (c === 71) return '小雪'; if (c === 73) return '中雪'; if (c === 75) return '大雪'; if (c === 77) return '雪粒';
      if (c >= 80 && c <= 82) return '陣雨'; if (c === 85) return '陣雪'; if (c === 86) return '強陣雪'; if (c >= 95) return '雷雨';
      return '—';
    },
    icon(c) {
      if (c === 0 || c === 1) return 'sun'; if (c === 2) return 'partly'; if (c === 3) return 'cloud'; if (c === 45 || c === 48) return 'fog';
      if ((c >= 71 && c <= 77) || c === 85 || c === 86) return 'snow'; if (c >= 95) return 'storm'; if (c >= 51) return 'rain'; return 'cloud';
    },
    cache: store.get('hk_wx_v1', {}),
    load(place, force) {
      const k = place.en, c = this.cache[k];
      if (!force && c && Date.now() - c.at < 30 * 60 * 1000) return Promise.resolve(c);
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + place.lat + '&longitude=' + place.lon +
        '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,snow_depth' +
        '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,snowfall_sum,wind_speed_10m_max,sunrise,sunset' +
        '&timezone=Asia%2FTokyo&forecast_days=16&wind_speed_unit=ms';
      return fetch(url).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then((d) => { const v = { at: Date.now(), d: d }; this.cache[k] = v; store.set('hk_wx_v1', this.cache); return v; });
    },
    forDate(placeIdx, date) {
      const c = this.cache[WEATHER_PLACES[placeIdx].en];
      if (!c) return null;
      const i = c.d.daily.time.indexOf(date);
      if (i < 0) return null;
      const dl = c.d.daily;
      return { code: dl.weather_code[i], max: dl.temperature_2m_max[i], min: dl.temperature_2m_min[i], pp: dl.precipitation_probability_max[i], snow: dl.snowfall_sum[i] };
    }
  };

  /* ---------------- 路由 ---------------- */
  const VIEWS = ['home', 'day', 'food', 'budget', 'photos', 'checklist', 'weather', 'notes', 'guide'];
  let current = '';
  function tripDayToday() {
    const now = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
    const i = DAYS.findIndex((d) => d.date === now);
    return i >= 0 ? i + 1 : 1;
  }
  function route() {
    let h = (location.hash || '#home').slice(1);
    let view = h, dayN = 0;
    const m = h.match(/^day-(\d)$/);
    if (m) { view = 'day'; dayN = Math.min(Math.max(+m[1], 1), DAYS.length); }
    else if (h === 'day') { view = 'day'; dayN = tripDayToday(); }
    if (!VIEWS.includes(view)) view = 'home';
    const key = view + dayN;
    $$('.view').forEach((v) => v.classList.toggle('active', v.id === 'v-' + view));
    $$('[data-v]').forEach((a) => a.classList.toggle('on', a.getAttribute('data-v') === view));
    closeSheet();
    if (key !== current) {
      current = key;
      const R = { home: renderHome, day: () => renderDay(dayN), food: renderFood, budget: renderBudget, photos: renderPhotos, checklist: renderChecklist, weather: renderWeather, notes: renderNotes, guide: () => {} };
      R[view]();
      window.scrollTo(0, 0);
      const t = { home: '', day: 'DAY ' + dayN, food: '美食', budget: '預算', photos: '照片牆', checklist: '清單', weather: '天氣', notes: '行前確認', guide: '使用說明' }[view];
      document.title = (t ? t + '｜' : '') + 'HOKKAIDO TRAVEL 2026';
    }
  }

  /* ---------------- 首頁 ---------------- */
  function countdownHTML() {
    const now = new Date(Date.now() + 8 * 3600e3);
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const s = Date.parse(TRIP.start + 'T00:00:00Z'), e = Date.parse(TRIP.end + 'T00:00:00Z');
    if (today < s) return `<span class="countdown">距離出發還有 <b>${Math.round((s - today) / 864e5)}</b> 天</span>`;
    if (today <= e) return `<span class="countdown">旅行中・今天是 <b>DAY ${Math.round((today - s) / 864e5) + 1}</b></span>`;
    return '<span class="countdown">旅程已結束，謝謝這趟旅行</span>';
  }
  function renderHome() {
    const el = $('#v-home');
    const fl = TRIP.flights.map((f) => `<div class="jrow"><div class="when">${esc(f.date)}</div><div><h4>${esc(f.label)} ${f.tag ? `<span class="tag check">${esc(f.tag)}</span>` : ''}</h4><p>${esc(f.text)}</p>${f.link ? `<p style="margin-top:6px"><a href="${esc(f.link[1])}" target="_blank" rel="noopener">${esc(f.link[0])} ↗</a></p>` : ''}</div></div>`).join('');
    const ho = TRIP.hotels.map((h) => `<div class="jrow"><div class="when">${esc(h.nights)}</div><div><h4>${esc(h.name)}</h4><p>${esc(h.addr)}</p><p style="margin-top:6px"><a href="${gSearch(h.q)}" target="_blank" rel="noopener">Google Maps ↗</a>${h.link ? ` ・ <a href="${esc(h.link[1])}" target="_blank" rel="noopener">${esc(h.link[0])} ↗</a>` : ''}</p></div></div>`).join('');
    const days = DAYS.map((d) => {
      const dt = new Date(d.date + 'T00:00:00');
      return `<a class="daycard" href="#day-${d.n}">${phHTML(d.cover, d.city)}<div class="bd"><div class="dt">DAY ${pad2(d.n)} · ${d.date.slice(5).replace('-', '.')} ${DOW_EN[dt.getDay()]}</div><h3>${esc(d.city)}</h3><p>${esc(d.title)}</p></div></a>`;
    }).join('');
    const urgent = ISSUES.filter((i) => i.level === '急' || i.level === '矛盾');
    const hero = PHOTOS.hero;
    el.innerHTML = `
      <div class="hero">
        <img class="bg" src="${esc(hero.src)}" alt="函館海上聖誕樹" onerror="this.style.display='none'">
        <span class="credit"><a href="${esc(hero.page)}" target="_blank" rel="noopener">📷 ${esc(hero.credit)}</a></span>
        <div class="inner wrap">
          <div class="kicker">2026 WINTER JOURNAL</div>
          <h1>${esc(TRIP.title.split(' ')[0])}<small>${esc(TRIP.title.split(' ')[1] || '')}</small></h1>
          <div class="date">${esc(TRIP.dateText)}</div>
          ${countdownHTML()}
        </div>
      </div>
      <div class="wrap">
        <section class="section intro">
          <div><span class="eyebrow">8 days · 7 nights</span><h2 style="font-size:24px;margin-bottom:14px">八天七夜，從札幌到函館</h2><p class="lead">${esc(TRIP.intro)}</p></div>
          <div class="facts">${TRIP.facts.map((f) => `<div class="fact"><div class="k">${esc(f.k)}</div><div class="v">${esc(f.v)}</div></div>`).join('')}</div>
        </section>
        ${urgent.length ? `<div class="notice" style="margin-bottom:8px"><span>⚑</span><div><b>${esc(urgent[0].title)}</b><br><span class="small">另有 ${ISSUES.length - 1} 項待確認事項，</span><a href="#notes">查看行前確認 →</a></div></div>` : ''}
        <section class="section">
          <div class="section-head"><div><span class="eyebrow">Itinerary</span><h2>八日行程</h2></div><a class="btn" href="#day-${tripDayToday()}">開始看行程 →</a></div>
          <div class="daynav">${days}</div>
        </section>
        <hr class="rule">
        <section class="section two-col">
          <div><span class="eyebrow">Flights</span><h2 style="font-size:22px;margin-bottom:14px">航班與交通</h2><div class="journal">${fl}</div></div>
          <div><span class="eyebrow">Stay</span><h2 style="font-size:22px;margin-bottom:14px">住宿</h2><div class="journal">${ho}</div>
            <h3 style="font-size:17px;margin:26px 0 10px">已訂位與車票</h3>
            <ul style="margin:0;padding-left:18px;color:var(--brown);font-size:14px">${TRIP.bookings.map((b) => `<li style="margin:5px 0">${esc(b)}</li>`).join('')}</ul>
          </div>
        </section>
        <hr class="rule">
        <section class="section">
          <div class="section-head"><div><span class="eyebrow">Winter safety</span><h2>冬季移動提醒</h2></div><a class="btn" href="#weather">看天氣 →</a></div>
          <div class="facts">${WINTER_TIPS.slice(0, 4).map((t) => `<div class="fact"><div class="k">${esc(t.t)}</div><div class="v" style="font-family:var(--sans);font-size:13.5px;color:var(--brown)">${esc(t.d)}</div></div>`).join('')}</div>
        </section>
      </div>`;
    hydrate(el);
  }

  /* ---------------- 每日頁 ---------------- */
  const TAGCLS = { '已訂': 'booked', '待確認': 'check', '備案': 'plan', '彈性': 'flex' };
  function renderDay(n) {
    const d = DAYS[n - 1];
    const el = $('#v-day');
    const dt = new Date(d.date + 'T00:00:00');
    const pi = DAY_PLACE[n] != null ? DAY_PLACE[n] : 0;
    const pl = WEATHER_PLACES[pi];
    const sun = sunTimes(d.date, pl.lat, pl.lon);
    const hotel = TRIP.hotels[d.stay];
    const wx = WX.forDate(pi, d.date);
    const stops = [];
    d.items.forEach((it) => { if (it.q && !stops.find((s) => s.q === it.q)) stops.push({ q: it.q, t: it.title.split(/[｜→（(]/)[0].trim() }); });

    const items = d.items.map((it, i) => {
      const f = it.food ? FOODS[it.food] : null;
      const meta = [];
      if (it.stay) meta.push(`<li><b>停留</b><span>${esc(it.stay)}</span></li>`);
      if (it.move) meta.push(`<li><b>交通</b><span>${esc(it.move)}</span></li>`);
      if (it.addr) meta.push(`<li><b>地址</b><span>${esc(it.addr)}</span></li>`);
      else if (it.q) meta.push(`<li><b>地址</b><span class="muted">以 Google Maps 為準</span></li>`);
      const links = (it.links || []).map((l) => `<a class="btn sm teal" href="${esc(l[1])}" target="_blank" rel="noopener">${icon(/maps\/dir/.test(l[1]) ? 'nav' : /maps/.test(l[1]) ? 'spot' : 'ext')}${esc(l[0])}</a>`);
      if (it.q && !(it.links || []).some((l) => /maps\/search/.test(l[1]))) links.push(`<a class="btn sm" href="${gSearch(it.q)}" target="_blank" rel="noopener">${icon('spot')}Google Maps</a>`);
      if (it.q) links.push(`<button class="btn sm" type="button" data-map="${esc(it.q)}" data-i="${i}">${icon('map')}地圖</button>`);
      return `<li class="tl k-${esc(it.kind || 'spot')}">
        <span class="dot">${icon(it.kind)}</span>
        <div class="time">${esc(it.time)}</div>
        <div class="box">
          ${it.img ? phHTML(it.img, it.title) : ''}
          <div class="in">
            <h3>${esc(it.title)} ${it.tag ? `<span class="tag ${TAGCLS[it.tag] || ''}">${esc(it.tag)}</span>` : ''}</h3>
            ${it.desc ? `<p class="desc">${esc(it.desc)}</p>` : ''}
            ${meta.length ? `<ul class="meta">${meta.join('')}</ul>` : ''}
            ${f ? `<div class="foodmini"><b>${esc(f.name)}</b><span>營業：${tbc(f.hours)}｜公休：${tbc(f.closed)}</span><span>價位：${tbc(f.price)}｜推薦：${esc(f.dish)}</span><a href="#food" data-goto-food="${esc(it.food)}">看餐廳專區 →</a></div>` : ''}
            <div class="btn-row">${links.join('')}</div>
            <div class="mapslot"></div>
          </div>
        </div>
      </li>`;
    }).join('');

    const tabs = DAYS.map((x) => `<a class="chip ${x.n === n ? 'on' : ''}" href="#day-${x.n}">DAY ${x.n}<small>${x.date.slice(5).replace('-', '/')}</small></a>`).join('');
    const prev = DAYS[n - 2], next = DAYS[n];
    const big = window.innerWidth >= 1000;

    el.innerHTML = `
      <div class="day-hero">${phHTML(d.cover, d.city, 'ph').replace('class="ph"', 'class="ph" style="position:absolute;inset:0"')}
        <div class="txt wrap"><div class="dno">DAY ${pad2(n)}</div><div class="dmeta">${d.date.replace(/-/g, '.')} ${DOW_EN[dt.getDay()]}・${esc(d.city)}</div><h1>${esc(d.title)}</h1></div>
      </div>
      <div class="daytabs"><div class="wrap"><div class="chips">${tabs}</div></div></div>
      <div class="wrap">
        <div class="daybar">
          <div class="mini"><div class="k">日出・日落</div><div class="v">${sun.rise} ・ ${sun.set}<br><small>${esc(pl.name)}，天文計算</small></div></div>
          <div class="mini"><div class="k">當晚住宿</div><div class="v">${n === 8 ? '返台' : esc(hotel.name)}</div></div>
          <div class="mini"><div class="k">天氣預報</div><div class="v" id="dayWx">${wx ? `${WX.text(wx.code)} ${Math.round(wx.min)}° / ${Math.round(wx.max)}°<br><small>降水 ${wx.pp == null ? '—' : wx.pp + '%'}・降雪 ${wx.snow} cm</small>` : `<a href="#weather" style="font-size:13px">出發前 16 天內顯示 →</a>`}</div></div>
          <div class="mini"><div class="k">行程點</div><div class="v">${d.items.length} 個<br><small>${esc(d.city)}</small></div></div>
        </div>
        <div class="daygrid">
          <ol class="timeline">${items}</ol>
          <aside class="side">
            <details class="card mapbox" ${big ? 'open' : ''}>
              <summary><span>${icon('map').replace('<svg', '<svg style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.6;vertical-align:-3px;margin-right:6px"')}當日地圖</span><span class="arr">▾</span></summary>
              <div class="body">
                <div class="stopchips">${stops.map((s, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-stop="${esc(s.q)}">${esc(s.t.length > 12 ? s.t.slice(0, 12) + '…' : s.t)}</button>`).join('')}</div>
                <iframe title="當日地圖" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-src="${esc(gEmbed(stops[0] ? stops[0].q : d.city))}"></iframe>
                <div class="btn-row" style="margin-top:12px"><a class="btn sm dark" href="${gRoute(stops.map((s) => s.q))}" target="_blank" rel="noopener">${icon('nav')}全日路線（Google Maps）</a></div>
                <p class="small muted" style="margin:8px 0 0">點上方景點切換地圖。全日路線會依序帶入景點，開啟後可在 Google Maps 改成大眾運輸或步行。</p>
              </div>
            </details>
            ${n < 8 ? `<div class="card pad"><h3>${icon('hotel').replace('<svg', '<svg style="width:18px;height:18px;stroke:var(--brown);fill:none;stroke-width:1.5"')}當晚住宿</h3><p style="margin:0;font-family:var(--serif)">${esc(hotel.name)}</p><p class="small muted" style="margin:4px 0 10px">${esc(hotel.addr)}</p><a class="btn sm" href="${gSearch(hotel.q)}" target="_blank" rel="noopener">${icon('spot')}Google Maps</a></div>` : ''}
            <div class="card pad"><h3>當日備註</h3><ul>${d.notes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
            <div class="card pad" style="background:var(--blue-soft);border-color:#D2DEE3"><h3>冬季提醒</h3><ul>${WINTER_TIPS.slice(0, 3).map((t) => `<li><b style="font-weight:500">${esc(t.t)}</b>：${esc(t.d)}</li>`).join('')}</ul><p class="small" style="margin:10px 0 0">今天日落約 <b>${sun.set}</b>，戶外行程盡量排在日落前。</p></div>
          </aside>
        </div>
        <div class="daypager">
          ${prev ? `<a href="#day-${prev.n}"><small>← DAY ${pad2(prev.n)}</small>${esc(prev.city)}</a>` : '<span style="flex:1"></span>'}
          ${next ? `<a class="next" href="#day-${next.n}"><small>DAY ${pad2(next.n)} →</small>${esc(next.city)}</a>` : `<a class="next" href="#home"><small>BACK →</small>回首頁</a>`}
        </div>
      </div>`;
    hydrate(el);
    // 地圖：展開時才載入
    const box = $('.mapbox', el), ifr = $('iframe', box);
    const loadMap = () => { if (!ifr.src && box.open) ifr.src = ifr.getAttribute('data-src'); };
    box.addEventListener('toggle', loadMap); loadMap();
    $$('[data-stop]', el).forEach((b) => b.addEventListener('click', () => {
      $$('[data-stop]', el).forEach((x) => x.classList.toggle('on', x === b));
      ifr.src = gEmbed(b.getAttribute('data-stop'));
    }));
    $$('[data-map]', el).forEach((b) => b.addEventListener('click', () => {
      const slot = b.closest('.in').querySelector('.mapslot');
      if (slot.innerHTML) { slot.innerHTML = ''; b.classList.remove('dark'); return; }
      slot.innerHTML = `<div class="mapwrap"><iframe title="地圖" loading="lazy" src="${esc(gEmbed(b.getAttribute('data-map')))}"></iframe></div>`;
      b.classList.add('dark');
    }));
    bindFoodGoto(el);
    const on = $('.daytabs .chip.on', el); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
    // 背景更新該城市天氣
    if (!wx) WX.load(pl).then(() => { const w = WX.forDate(pi, d.date), t = $('#dayWx'); if (w && t && current === 'day' + n) t.innerHTML = `${WX.text(w.code)} ${Math.round(w.min)}° / ${Math.round(w.max)}°<br><small>降水 ${w.pp == null ? '—' : w.pp + '%'}・降雪 ${w.snow} cm</small>`; }).catch(() => {});
  }
  let foodFocus = null;
  function bindFoodGoto(el) { $$('[data-goto-food]', el).forEach((a) => a.addEventListener('click', () => { foodFocus = a.getAttribute('data-goto-food'); })); }

  /* ---------------- 美食 ---------------- */
  const foodState = { area: '全部', status: '全部' };
  function mark(type) {
    const m = [['回轉', '鮨'], ['壽司', '鮨'], ['湯咖哩', '咖'], ['咖啡', '珈'], ['拉麵', '麺'], ['鹽拉麵', '麺'], ['烤羊', '羊'], ['成吉思汗', '羊'], ['洋食', '洋'], ['甜點', '菓'], ['可麗餅', '菓'], ['海膽', '丼'], ['海鮮', '丼'], ['漢堡', '堡'], ['便當', '弁'], ['便利', '夜'], ['自助', '宴'], ['半雞', '鶏'], ['壽喜燒', '鍋'], ['乳製', '乳']];
    const f = m.find((x) => type.indexOf(x[0]) >= 0); return f ? f[1] : '食';
  }
  function renderFood() {
    const el = $('#v-food');
    const areas = ['全部', '札幌', '小樽', '洞爺湖', '函館'];
    const sts = ['全部', '已訂', '行程內', '補充推薦', '備案'];
    const list = Object.keys(FOODS).map((k) => Object.assign({ key: k }, FOODS[k]))
      .filter((f) => (foodState.area === '全部' || f.area === foodState.area) && (foodState.status === '全部' || f.status === foodState.status))
      .sort((a, b) => a.day - b.day);
    const stc = { '已訂': 'booked', '行程內': 'flex', '補充推薦': 'rec', '備案': 'plan' };
    el.innerHTML = `<div class="wrap">
      <div class="page-title"><span class="eyebrow">Gourmet</span><h1>餐廳專區</h1><p>PDF 行程內的餐廳，加上順路、評價穩定的補充推薦。營業時間與公休以 Google Maps 為準（2026/11/17 查詢，Google 顯示的是當週時間，遇假日可能變動）；紅字「待確認」代表查不到可靠資料。</p></div>
      <div class="filters">
        <div class="chips">${areas.map((a) => `<button class="chip ${foodState.area === a ? 'on' : ''}" data-area="${a}">${a}</button>`).join('')}</div>
        <div class="chips">${sts.map((a) => `<button class="chip ${foodState.status === a ? 'on' : ''}" data-st="${a}">${a}</button>`).join('')}</div>
      </div>
      <div class="foodgrid">${list.map((f) => `
        <article class="card food" id="food-${esc(f.key)}">
          <div class="mark">${f.photo ? `<img src="${esc(f.photo)}" alt="${esc(f.name)}" onerror="this.remove()">` : ''}<span class="big">${mark(f.type)}</span><span class="tag ${stc[f.status] || ''}">${esc(f.status)}</span><a class="dayl" href="#day-${f.day}">DAY ${pad2(f.day)}</a></div>
          <div class="bd">
            <div><div class="type">${esc(f.area)}・${esc(f.type)}</div><h3>${esc(f.name)}</h3></div>
            ${f.why ? `<div class="why">${esc(f.why)}</div>` : ''}
            <dl>
              <dt>營業時間</dt><dd>${tbc(f.hours)}</dd>
              <dt>公休日</dt><dd>${tbc(f.closed)}</dd>
              <dt>價格</dt><dd>${tbc(f.price)}</dd>
              <dt>推薦</dt><dd>${esc(f.dish)}</dd>
              <dt>交通</dt><dd>${esc(f.dist)}</dd>
              ${f.addr ? `<dt>地址</dt><dd>${esc(f.addr)}</dd>` : ''}
            </dl>
            <div class="btn-row"><a class="btn sm teal" href="${gSearch(f.q)}" target="_blank" rel="noopener">${icon('spot')}Google Maps・照片評論</a><a class="btn sm" href="#day-${f.day}">DAY ${f.day} 行程</a></div>
          </div>
        </article>`).join('') || '<div class="empty">這個條件下沒有餐廳</div>'}</div>
      <p class="small muted" style="margin-top:22px">餐廳照片：為避免使用未授權圖片，這裡以插畫代替，點「Google Maps・照片評論」可看實際照片。也可以在 data.js 為餐廳加上 photo 欄位放自己的照片。</p>
    </div>`;
    $$('[data-area]', el).forEach((b) => b.addEventListener('click', () => { foodState.area = b.getAttribute('data-area'); renderFood(); }));
    $$('[data-st]', el).forEach((b) => b.addEventListener('click', () => { foodState.status = b.getAttribute('data-st'); renderFood(); }));
    if (foodFocus) {
      const t = $('#food-' + foodFocus, el);
      if (!t) { foodState.area = '全部'; foodState.status = '全部'; return renderFood(); }
      setTimeout(() => { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); t.style.outline = '2px solid var(--latte)'; setTimeout(() => (t.style.outline = ''), 2200); }, 80);
      foodFocus = null;
    }
  }

  /* ---------------- 預算 ---------------- */
  function budgetState() {
    let s = store.get('hk_budget_v1', null);
    if (!s) {
      s = { rate: 0.21, rateNote: true, names: TRIP.travellers.slice(0, 2), cats: {}, items: [] };
      BUDGET_CATS.forEach((c) => (s.cats[c.id] = c.budget));
      BUDGET_SEED.forEach((x) => s.items.push(Object.assign({ id: uid() }, x)));
      store.set('hk_budget_v1', s);
    }
    BUDGET_CATS.forEach((c) => { if (s.cats[c.id] == null) s.cats[c.id] = c.budget; });
    return s;
  }
  const bui = { filter: 'all', editing: null, cur: 'JPY' };
  function toTWD(it, s) { return it.cur === 'TWD' ? +it.amount : +it.amount * (+s.rate || 0); }
  function renderBudget() {
    const s = budgetState();
    const el = $('#v-budget');
    const A = s.names[0] || '我', B = s.names[1] || '男友';
    const catName = (id) => (BUDGET_CATS.find((c) => c.id === id) || { name: id }).name;
    let total = 0, jpyTotal = 0, twdTotal = 0, paid = { A: 0, B: 0 }, owe = { A: 0, B: 0 }, unassigned = 0;
    const byCat = {};
    s.items.forEach((it) => {
      const v = toTWD(it, s); total += v;
      if (it.cur === 'JPY') jpyTotal += +it.amount; else twdTotal += +it.amount;
      byCat[it.cat] = (byCat[it.cat] || 0) + v;
      const who = it.payer === A ? 'A' : it.payer === B ? 'B' : null;
      if (!who) { unassigned += v; return; }
      paid[who] += v;
      if (it.split === 'self') owe[who] += v; else { owe.A += v / 2; owe.B += v / 2; }
    });
    const budgetTotal = BUDGET_CATS.reduce((a, c) => a + (+s.cats[c.id] || 0), 0);
    const diff = budgetTotal - total;
    const balA = paid.A - owe.A;
    let settle = '目前兩人互不相欠。';
    if (Math.abs(balA) >= 1) settle = balA > 0 ? `${esc(B)} 應給 ${esc(A)} <b>NT$ ${fmt(balA)}</b>` : `${esc(A)} 應給 ${esc(B)} <b>NT$ ${fmt(-balA)}</b>`;
    const ed = bui.editing ? s.items.find((x) => x.id === bui.editing) : null;
    const cur = ed ? ed.cur : bui.cur;
    const items = s.items.filter((it) => bui.filter === 'all' || it.cat === bui.filter).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    const defDate = (() => { const t = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); return t >= TRIP.start && t <= TRIP.end ? t : TRIP.start; })();

    el.innerHTML = `<div class="wrap">
      <div class="page-title"><span class="eyebrow">Budget</span><h1>旅行預算</h1><p>日幣、台幣都能記，依匯率自動換算台幣；兩人分帳自動結算。</p></div>
      <div class="bsum" style="margin-top:18px">
        <div class="card bigstat">
          <div class="k">總花費（台幣）</div><div class="v">NT$ ${fmt(total)}</div>
          <div class="s">日幣支出 ¥${fmt(jpyTotal)} ＋ 台幣支出 NT$${fmt(twdTotal)}</div>
          <div class="statrow" style="margin-top:16px">
            <div class="mini"><div class="k">總預算</div><div class="v">NT$ ${fmt(budgetTotal)}</div></div>
            <div class="mini"><div class="k">${budgetTotal ? (diff >= 0 ? '剩餘' : '超支') : '預算差額'}</div><div class="v ${budgetTotal ? (diff >= 0 ? 'pos' : 'neg') : ''}">${budgetTotal ? 'NT$ ' + fmt(Math.abs(diff)) : '<span class="small muted">先在下方設定分類預算</span>'}</div></div>
          </div>
        </div>
        <div class="card pad">
          <h3 style="font-size:16px;margin-bottom:12px">設定</h3>
          <div class="settings">
            <label class="f">1 日幣 = ? 台幣<input class="inp" id="bRate" type="number" step="0.0001" min="0" inputmode="decimal" value="${esc(s.rate)}"></label>
            <label class="f">1 台幣 ≈ 日幣<input class="inp" disabled value="${s.rate > 0 ? fmt(1 / s.rate, 2) : '—'}"></label>
            <label class="f">旅伴 1<input class="inp" id="bN1" value="${esc(A)}" maxlength="10"></label>
            <label class="f">旅伴 2<input class="inp" id="bN2" value="${esc(B)}" maxlength="10"></label>
          </div>
          ${s.rateNote ? '<p class="small" style="margin:10px 0 0;color:var(--rust)">匯率 0.21 是預設值，請到台灣銀行查日圓「現金賣出」後修改。</p>' : ''}
          <p class="small muted" style="margin:8px 0 0"><a href="https://rate.bot.com.tw/xrt?Lang=zh-TW" target="_blank" rel="noopener">台灣銀行牌告匯率 ↗</a></p>
        </div>
      </div>

      <section class="section" style="padding-top:28px">
        <div class="two-col">
          <div class="card pad">
            <h3 style="font-size:17px;margin-bottom:6px">分類預算與花費</h3>
            <p class="small muted" style="margin:0 0 8px">直接在右側輸入各類預算（台幣）。</p>
            <div class="catlist">${BUDGET_CATS.map((c) => {
              const sp = byCat[c.id] || 0, bd = +s.cats[c.id] || 0, pct = bd ? Math.min(100, (sp / bd) * 100) : sp ? 100 : 0;
              return `<div class="cat"><span class="nm">${esc(c.name)}</span><span class="bud">預算 <input class="inp" type="number" min="0" inputmode="numeric" data-bud="${c.id}" value="${bd || ''}" placeholder="0"></span><div class="bar"><i class="${bd && sp > bd ? 'over' : ''}" style="width:${pct}%"></i></div><span class="amt" style="grid-column:1/-1;text-align:left">已花 NT$ ${fmt(sp)}${bd ? `・${sp > bd ? '超支' : '剩'} NT$ ${fmt(Math.abs(bd - sp))}` : ''}</span></div>`;
            }).join('')}</div>
          </div>
          <div class="card pad">
            <h3 style="font-size:17px;margin-bottom:12px">兩人分帳</h3>
            <div class="statrow">
              <div class="mini"><div class="k">${esc(A)} 已付</div><div class="v">NT$ ${fmt(paid.A)}</div></div>
              <div class="mini"><div class="k">${esc(B)} 已付</div><div class="v">NT$ ${fmt(paid.B)}</div></div>
              <div class="mini"><div class="k">${esc(A)} 應分攤</div><div class="v">NT$ ${fmt(owe.A)}</div></div>
              <div class="mini"><div class="k">${esc(B)} 應分攤</div><div class="v">NT$ ${fmt(owe.B)}</div></div>
            </div>
            <p class="settle" style="margin:16px 0 0">${settle}</p>
            ${unassigned ? `<p class="small" style="color:var(--rust);margin:6px 0 0">有 NT$ ${fmt(unassigned)} 的支出還沒指定付款人，未計入分帳。</p>` : ''}
            <hr class="rule" style="margin:18px 0">
            <h3 style="font-size:15px;margin-bottom:8px">備份與同步</h3>
            <p class="small muted" style="margin:0 0 10px">資料存在這個瀏覽器。要和旅伴同步，匯出後用 LINE 傳檔案，對方匯入即可（會覆蓋對方的預算與清單）。</p>
            <div class="btn-row"><button class="btn sm" id="bExport">${icon('down')}匯出備份</button><label class="btn sm" style="cursor:pointer">${icon('up')}匯入備份<input type="file" accept="application/json,.json" id="bImport" hidden></label><button class="btn sm danger" id="bReset">清空預算</button></div>
          </div>
        </div>
      </section>

      <section class="card pad" id="bForm">
        <h3 style="font-size:17px;margin-bottom:14px">${ed ? '修改支出' : '新增支出'}</h3>
        <form class="formgrid" id="expForm" autocomplete="off">
          <label class="f">日期<input class="inp" type="date" name="date" required value="${esc(ed ? ed.date : defDate)}"></label>
          <label class="f">分類<select class="inp" name="cat">${BUDGET_CATS.map((c) => `<option value="${c.id}" ${ed && ed.cat === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>
          <label class="f full">項目<input class="inp" name="item" required maxlength="60" placeholder="例如：函館山纜車 2 人" value="${esc(ed ? ed.item : '')}"></label>
          <label class="f">金額<input class="inp" name="amount" type="number" min="0" step="any" inputmode="decimal" required value="${esc(ed ? ed.amount : '')}"></label>
          <div class="f">幣別<div class="seg" id="curSeg"><button type="button" data-cur="JPY" class="${cur === 'JPY' ? 'on' : ''}">日幣 ¥</button><button type="button" data-cur="TWD" class="${cur === 'TWD' ? 'on' : ''}">台幣 NT$</button></div></div>
          <label class="f">付款人<select class="inp" name="payer">${[A, B, '未指定'].map((p) => `<option ${ed && ed.payer === p ? 'selected' : ''}>${esc(p)}</option>`).join('')}</select></label>
          <label class="f">怎麼分<select class="inp" name="split"><option value="share" ${ed && ed.split !== 'self' ? 'selected' : ''}>兩人均分</option><option value="self" ${ed && ed.split === 'self' ? 'selected' : ''}>付款人自己的</option></select></label>
          <label class="f full">備註<input class="inp" name="note" maxlength="80" value="${esc(ed ? ed.note || '' : '')}"></label>
          <div class="full btn-row" style="justify-content:flex-end"><span class="small muted" id="convHint" style="margin-right:auto;align-self:center"></span>${ed ? '<button type="button" class="btn" id="bCancel">取消</button>' : ''}<button class="btn dark" type="submit">${ed ? '儲存修改' : '＋ 新增'}</button></div>
        </form>
      </section>

      <section class="section" style="padding-top:28px">
        <div class="section-head"><div><span class="eyebrow">Expenses</span><h2>支出明細</h2></div><span class="muted small">${s.items.length} 筆</span></div>
        <div class="chips" style="margin-bottom:10px"><button class="chip ${bui.filter === 'all' ? 'on' : ''}" data-f="all">全部</button>${BUDGET_CATS.map((c) => `<button class="chip ${bui.filter === c.id ? 'on' : ''}" data-f="${c.id}">${esc(c.name)}</button>`).join('')}</div>
        <div class="card pad" style="padding-top:4px;padding-bottom:4px">${items.map((it) => `
          <div class="exp"><div><div class="t">${esc(it.item)}</div><div class="m">${esc(it.date.slice(5).replace('-', '/'))}・${esc(catName(it.cat))}・${esc(it.payer)}付${it.split === 'self' ? '（個人）' : '（均分）'}${it.note ? '・' + esc(it.note) : ''}</div></div>
          <div class="a">${it.cur === 'JPY' ? '¥' + fmt(it.amount) : 'NT$' + fmt(it.amount)}<small>${it.cur === 'JPY' ? '≈ NT$' + fmt(toTWD(it, s)) : ''}</small></div>
          <div class="acts"><button class="btn sm ghost" data-ed="${it.id}">${icon('edit')}修改</button><button class="btn sm ghost danger" data-del="${it.id}">${icon('trash')}刪除</button></div></div>`).join('') || '<div class="empty" style="border:0">還沒有支出，從上面新增第一筆吧</div>'}</div>
      </section>
    </div>`;

    const save = () => store.set('hk_budget_v1', s);
    const form = $('#expForm', el);
    let curSel = cur;
    const hint = () => { const v = +form.amount.value || 0; $('#convHint', el).textContent = v ? (curSel === 'JPY' ? `≈ NT$ ${fmt(v * s.rate)}` : `≈ ¥${fmt(s.rate ? v / s.rate : 0)}`) : ''; };
    form.amount.addEventListener('input', hint); hint();
    $$('#curSeg button', el).forEach((b) => b.addEventListener('click', () => { curSel = b.getAttribute('data-cur'); bui.cur = curSel; $$('#curSeg button', el).forEach((x) => x.classList.toggle('on', x === b)); hint(); }));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const rec = { date: form.date.value, cat: form.cat.value, item: form.item.value.trim(), amount: +form.amount.value, cur: curSel, payer: form.payer.value, split: form.split.value, note: form.note.value.trim() };
      if (!rec.item || !(rec.amount >= 0)) return;
      if (ed) Object.assign(ed, rec); else s.items.push(Object.assign({ id: uid() }, rec));
      bui.editing = null; save(); toast(ed ? '已更新' : '已新增'); renderBudget();
    });
    const c = $('#bCancel', el); if (c) c.addEventListener('click', () => { bui.editing = null; renderBudget(); });
    $('#bRate', el).addEventListener('change', (e) => { const v = parseFloat(e.target.value); if (v > 0) { s.rate = v; s.rateNote = false; save(); renderBudget(); } });
    const rename = (i, v) => { v = v.trim(); if (!v) return; const old = s.names[i]; s.names[i] = v; s.items.forEach((it) => { if (it.payer === old) it.payer = v; }); save(); renderBudget(); };
    $('#bN1', el).addEventListener('change', (e) => rename(0, e.target.value));
    $('#bN2', el).addEventListener('change', (e) => rename(1, e.target.value));
    $$('[data-bud]', el).forEach((i) => i.addEventListener('change', () => { s.cats[i.getAttribute('data-bud')] = Math.max(0, +i.value || 0); save(); renderBudget(); }));
    $$('[data-f]', el).forEach((b) => b.addEventListener('click', () => { bui.filter = b.getAttribute('data-f'); renderBudget(); }));
    $$('[data-ed]', el).forEach((b) => b.addEventListener('click', () => { bui.editing = b.getAttribute('data-ed'); renderBudget(); setTimeout(() => $('#bForm').scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }));
    $$('[data-del]', el).forEach((b) => b.addEventListener('click', async () => {
      const it = s.items.find((x) => x.id === b.getAttribute('data-del'));
      if (await ask('刪除這筆支出？', it.item, '刪除', true)) { s.items = s.items.filter((x) => x !== it); save(); toast('已刪除'); renderBudget(); }
    }));
    $('#bExport', el).addEventListener('click', exportData);
    $('#bImport', el).addEventListener('change', importData);
    $('#bReset', el).addEventListener('click', async () => {
      if (await ask('清空所有支出？', '分類預算與匯率會保留，支出明細會全部刪除，無法復原。建議先匯出備份。', '清空', true)) { s.items = []; save(); renderBudget(); }
    });
  }
  function exportData() {
    const data = { app: 'hokkaido-trip-2026', version: 1, exportedAt: new Date().toISOString(), budget: budgetState(), checklist: checkState() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'hokkaido-trip-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('已下載備份檔');
  }
  function importData(e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = async () => {
      try {
        const d = JSON.parse(r.result);
        if (d.app !== 'hokkaido-trip-2026') throw new Error('x');
        if (!(await ask('匯入備份？', '會用備份檔覆蓋這個瀏覽器目前的預算與清單。', '匯入'))) return;
        if (d.budget) store.set('hk_budget_v1', d.budget);
        if (d.checklist) store.set('hk_check_v1', d.checklist);
        toast('匯入完成'); current = ''; route();
      } catch (err) { toast('這不是本網站的備份檔'); }
    };
    r.readAsText(f); e.target.value = '';
  }

  /* ---------------- 照片牆（IndexedDB，存在這台裝置） ---------------- */
  const PDB = {
    db: null,
    open() {
      if (this.db) return Promise.resolve(this.db);
      return new Promise((res, rej) => {
        if (!window.indexedDB) return rej(new Error('no idb'));
        const q = indexedDB.open('hk_photos', 1);
        q.onupgradeneeded = () => q.result.createObjectStore('photos', { keyPath: 'id' });
        q.onsuccess = () => { this.db = q.result; res(this.db); };
        q.onerror = () => rej(q.error);
      });
    },
    tx(mode, fn) { return this.open().then((db) => new Promise((res, rej) => { const t = db.transaction('photos', mode); const st = t.objectStore('photos'); const r = fn(st); t.oncomplete = () => res(r && r.result); t.onerror = () => rej(t.error); })); },
    all() { return this.tx('readonly', (s) => s.getAll()); },
    put(o) { return this.tx('readwrite', (s) => s.put(o)); },
    del(id) { return this.tx('readwrite', (s) => s.delete(id)); }
  };
  const ph = { day: 0, list: [], urls: [], idx: 0 };
  function resize(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const im = new Image();
      im.onload = () => {
        const max = 1800, sc = Math.min(1, max / Math.max(im.width, im.height));
        const c = document.createElement('canvas'); c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob((b) => (b ? res({ blob: b, w: c.width, h: c.height }) : rej(new Error('blob'))), 'image/jpeg', 0.86);
      };
      im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('decode')); };
      im.src = url;
    });
  }
  function renderPhotos() {
    const el = $('#v-photos');
    el.innerHTML = `<div class="wrap">
      <div class="page-title"><span class="eyebrow">Album</span><h1>旅行照片牆</h1><p>依 DAY 1～DAY 8 收藏照片，點照片可放大。照片只存在這台裝置的瀏覽器裡，不會上傳到網路。</p></div>
      <div class="drop" id="drop" style="margin:18px 0">
        <div><b style="font-family:var(--serif)">上傳照片</b><div class="small muted">可一次選多張，或把照片拖進這個框</div></div>
        <div class="btn-row"><select class="inp" id="upDay" style="width:auto">${DAYS.map((d) => `<option value="${d.n}" ${(ph.day || tripDayToday()) === d.n ? 'selected' : ''}>DAY ${d.n}｜${esc(d.city)}</option>`).join('')}</select>
        <label class="btn dark" style="cursor:pointer">${icon('up')}選擇照片<input type="file" accept="image/*" multiple id="upFile" hidden></label></div>
      </div>
      <div class="chips" id="phTabs" style="margin-bottom:16px"><button class="chip ${ph.day === 0 ? 'on' : ''}" data-d="0">全部</button>${DAYS.map((d) => `<button class="chip ${ph.day === d.n ? 'on' : ''}" data-d="${d.n}">DAY ${d.n}</button>`).join('')}</div>
      <div id="phGrid"><p class="muted">載入中…</p></div>
      <p class="small muted" id="phUsage" style="margin-top:16px"></p>
    </div>`;
    $$('#phTabs .chip', el).forEach((b) => b.addEventListener('click', () => { ph.day = +b.getAttribute('data-d'); $$('#phTabs .chip', el).forEach((x) => x.classList.toggle('on', x === b)); if (ph.day) $('#upDay', el).value = ph.day; drawGrid(); }));
    $('#upFile', el).addEventListener('change', (e) => { addFiles(e.target.files); e.target.value = ''; });
    const drop = $('#drop', el);
    ['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', (e) => addFiles(e.dataTransfer.files));
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    drawGrid();
  }
  async function addFiles(files) {
    const day = +$('#upDay').value;
    const arr = Array.from(files || []).filter((f) => /^image\//.test(f.type) || /\.(heic|heif)$/i.test(f.name));
    if (!arr.length) return;
    toast('正在加入 ' + arr.length + ' 張照片…');
    let ok = 0;
    for (const f of arr) {
      try { const r = await resize(f); await PDB.put({ id: uid(), day: day, blob: r.blob, w: r.w, h: r.h, caption: '', ts: Date.now() }); ok++; }
      catch (e) { /* 無法讀取的格式略過 */ }
    }
    toast(ok === arr.length ? `已加入 ${ok} 張到 DAY ${day}` : `加入 ${ok} 張，${arr.length - ok} 張格式無法讀取`);
    ph.day = day; renderPhotos();
  }
  async function drawGrid() {
    const g = $('#phGrid'); if (!g) return;
    ph.urls.forEach((u) => URL.revokeObjectURL(u)); ph.urls = [];
    let all = [];
    try { all = (await PDB.all()) || []; } catch (e) { g.innerHTML = '<div class="empty">這個瀏覽器不支援本機照片儲存（可能是無痕模式）。</div>'; return; }
    all.sort((a, b) => a.day - b.day || a.ts - b.ts);
    ph.list = all.filter((p) => !ph.day || p.day === ph.day);
    if (!ph.list.length) { g.innerHTML = `<div class="empty"><div class="ic">ALBUM</div><p>${ph.day ? 'DAY ' + ph.day + ' ' : ''}還沒有照片，從上方選擇照片開始收藏吧。</p></div>`; }
    else {
      g.innerHTML = '<div class="masonry">' + ph.list.map((p, i) => { const u = URL.createObjectURL(p.blob); ph.urls.push(u); p._u = u; return `<figure data-i="${i}"><img src="${u}" alt="${esc(p.caption || 'DAY ' + p.day)}" loading="lazy" width="${p.w}" height="${p.h}"><span class="dlabel">DAY ${p.day}</span>${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}</figure>`; }).join('') + '</div>';
      $$('figure', g).forEach((f) => f.addEventListener('click', () => openLB(+f.getAttribute('data-i'))));
    }
    const u = $('#phUsage');
    if (u) {
      const counts = DAYS.map((d) => all.filter((p) => p.day === d.n).length);
      let txt = `共 ${all.length} 張（` + counts.map((c, i) => `D${i + 1}:${c}`).join('・') + '）';
      if (navigator.storage && navigator.storage.estimate) { try { const e = await navigator.storage.estimate(); txt += `｜已使用 ${(e.usage / 1048576).toFixed(1)} MB`; } catch (er) {} }
      u.textContent = txt;
    }
  }
  function openLB(i) {
    ph.idx = i; const lb = $('#lightbox'); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; showLB();
  }
  function showLB() {
    const p = ph.list[ph.idx]; if (!p) return closeLB();
    $('#lbImg').src = p._u; $('#lbCap').value = p.caption || '';
    $('#lbDay').innerHTML = DAYS.map((d) => `<option value="${d.n}" ${d.n === p.day ? 'selected' : ''}>DAY ${d.n}</option>`).join('');
  }
  function closeLB() { const lb = $('#lightbox'); lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function bindLB() {
    const lb = $('#lightbox');
    lb.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-lb]'); if (!b) { if (e.target.classList.contains('stage')) closeLB(); return; }
      const a = b.getAttribute('data-lb');
      if (a === 'close') closeLB();
      if (a === 'prev') { ph.idx = (ph.idx - 1 + ph.list.length) % ph.list.length; showLB(); }
      if (a === 'next') { ph.idx = (ph.idx + 1) % ph.list.length; showLB(); }
      if (a === 'del') { const p = ph.list[ph.idx]; if (await ask('刪除這張照片？', '刪除後無法復原。', '刪除', true)) { await PDB.del(p.id); closeLB(); drawGrid(); toast('已刪除'); } }
    });
    $('#lbCap').addEventListener('change', async (e) => { const p = ph.list[ph.idx]; p.caption = e.target.value.trim(); const o = Object.assign({}, p); delete o._u; await PDB.put(o); drawGrid().then(showLB); toast('已儲存說明'); });
    $('#lbDay').addEventListener('change', async (e) => { const p = ph.list[ph.idx]; p.day = +e.target.value; const o = Object.assign({}, p); delete o._u; await PDB.put(o); closeLB(); drawGrid(); toast('已移到 DAY ' + p.day); });
    document.addEventListener('keydown', (e) => { if (!lb.classList.contains('open') || e.target.tagName === 'INPUT') return; if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowLeft') lb.querySelector('[data-lb=prev]').click(); if (e.key === 'ArrowRight') lb.querySelector('[data-lb=next]').click(); });
    let sx = null; lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) lb.querySelector(dx > 0 ? '[data-lb=prev]' : '[data-lb=next]').click(); sx = null; });
  }

  /* ---------------- 清單 ---------------- */
  function checkState() {
    let s = store.get('hk_check_v1', null);
    if (!s) { s = { groups: CHECKLIST.map((g) => ({ id: uid(), name: g.group, open: true, items: g.items.map((t) => ({ id: uid(), t: t, done: false })) })) }; store.set('hk_check_v1', s); }
    return s;
  }
  function renderChecklist() {
    const s = checkState(); const el = $('#v-checklist');
    const tot = s.groups.reduce((a, g) => a + g.items.length, 0), done = s.groups.reduce((a, g) => a + g.items.filter((i) => i.done).length, 0);
    const pct = tot ? Math.round((done / tot) * 100) : 0;
    el.innerHTML = `<div class="wrap" style="max-width:820px">
      <div class="page-title"><span class="eyebrow">Checklist</span><h1>旅行清單</h1><p>勾選後會自動保存在這個瀏覽器。</p></div>
      <div class="card pad progress" style="margin-top:16px"><b>${pct}%</b><div class="bar"><i style="width:${pct}%;background:var(--teal)"></i></div><span class="small muted">${done} / ${tot}</span></div>
      ${s.groups.map((g) => { const d = g.items.filter((i) => i.done).length; return `
        <details class="card group" ${g.open ? 'open' : ''} data-g="${g.id}">
          <summary><h3>${esc(g.name)}</h3><span class="cnt">${d} / ${g.items.length} ▾</span></summary>
          <ul>${g.items.map((it) => `<li class="ck"><input type="checkbox" id="c-${it.id}" data-ck="${it.id}" ${it.done ? 'checked' : ''}><label for="c-${it.id}">${esc(it.t)}</label><button class="del" data-rm="${it.id}" aria-label="刪除">×</button></li>`).join('')}</ul>
          <form class="addrow" data-add="${g.id}"><input class="inp" placeholder="新增項目…" maxlength="60"><button class="btn sm dark" type="submit">新增</button></form>
        </details>`; }).join('')}
      <form class="card pad" id="newGroup" style="margin-top:16px;display:flex;gap:8px"><input class="inp" placeholder="新增一個分類，例如：伴手禮清單" maxlength="30"><button class="btn dark" type="submit">新增分類</button></form>
      <div class="btn-row" style="margin-top:16px;justify-content:space-between"><button class="btn sm" id="ckUncheck">全部取消勾選</button><button class="btn sm danger" id="ckReset">恢復預設清單</button></div>
    </div>`;
    const save = () => store.set('hk_check_v1', s);
    const find = (id) => { for (const g of s.groups) { const i = g.items.find((x) => x.id === id); if (i) return [g, i]; } return []; };
    $$('[data-ck]', el).forEach((c) => c.addEventListener('change', () => { find(c.getAttribute('data-ck'))[1].done = c.checked; save(); renderChecklist(); }));
    $$('[data-rm]', el).forEach((b) => b.addEventListener('click', () => { const [g, i] = find(b.getAttribute('data-rm')); g.items = g.items.filter((x) => x !== i); save(); renderChecklist(); }));
    $$('details[data-g]', el).forEach((d) => d.addEventListener('toggle', () => { const g = s.groups.find((x) => x.id === d.getAttribute('data-g')); g.open = d.open; save(); }));
    $$('form[data-add]', el).forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); const v = f.querySelector('input').value.trim(); if (!v) return; s.groups.find((x) => x.id === f.getAttribute('data-add')).items.push({ id: uid(), t: v, done: false }); save(); renderChecklist(); }));
    $('#newGroup', el).addEventListener('submit', (e) => { e.preventDefault(); const v = e.target.querySelector('input').value.trim(); if (!v) return; s.groups.push({ id: uid(), name: v, open: true, items: [] }); save(); renderChecklist(); });
    $('#ckUncheck', el).addEventListener('click', () => { s.groups.forEach((g) => g.items.forEach((i) => (i.done = false))); save(); renderChecklist(); });
    $('#ckReset', el).addEventListener('click', async () => { if (await ask('恢復預設清單？', '自己新增的項目與勾選狀態都會清除。', '恢復', true)) { localStorage.removeItem('hk_check_v1'); renderChecklist(); } });
  }

  /* ---------------- 天氣頁 ---------------- */
  function renderWeather() {
    const el = $('#v-weather');
    el.innerHTML = `<div class="wrap">
      <div class="page-title"><span class="eyebrow">Weather</span><h1>天氣資訊</h1><p>即時資料來自 Open-Meteo，提供最多 16 天預報；藍色格子是旅行日期。旅行日期進入預報範圍後會自動出現。</p></div>
      <div class="btn-row" style="margin:16px 0 18px"><button class="btn sm" id="wxRefresh">↻ 重新整理</button><span class="small muted" id="wxAt" style="align-self:center"></span></div>
      <div class="wxgrid" id="wxGrid">${WEATHER_PLACES.map((p, i) => `<div class="card wx" data-p="${i}"><div class="head"><div><h3>${esc(p.name)}</h3><div class="en">${esc(p.en)}・${esc(p.days)}</div></div><div class="now muted small">載入中…</div></div></div>`).join('')}</div>
      <div class="two-col" style="margin-top:28px">
        <div class="card pad"><h3 style="font-size:17px;margin-bottom:8px">天氣警報與交通</h3>
          <p class="small muted" style="margin:0 0 12px">大雪、暴風雪警報以日本氣象廳為準（本網站無法即時串接警報資料）。出門前請查看：</p>
          <div class="btn-row">${LINKS_SAFETY.slice(0, 4).map((l) => `<a class="btn sm teal" href="${esc(l[1])}" target="_blank" rel="noopener">${icon('ext')}${esc(l[0])}</a>`).join('')}</div>
          <p class="small muted" style="margin:14px 0 0">關於降雪：Open-Meteo 沒有單獨的「降雪機率」，這裡顯示「降水機率」與「預估降雪量」。氣溫在 0°C 上下時，降水多半是雪。</p>
        </div>
        <div class="card pad" style="background:var(--blue-soft);border-color:#D2DEE3"><h3 style="font-size:17px;margin-bottom:8px">冬季移動提醒</h3><ul style="margin:0;padding-left:18px;font-size:14px;color:var(--brown)">${WINTER_TIPS.map((t) => `<li style="margin:6px 0"><b style="font-weight:500">${esc(t.t)}</b>：${esc(t.d)}</li>`).join('')}</ul></div>
      </div>
      <p class="small muted" style="margin-top:18px">天氣資料：<a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo.com</a>（CC BY 4.0）。</p>
    </div>`;
    const draw = (force) => {
      WEATHER_PLACES.forEach((p, i) => {
        const card = $(`.wx[data-p="${i}"]`, el);
        WX.load(p, force).then((v) => {
          const d = v.d, c = d.current, dl = d.daily;
          card.innerHTML = `<div class="head"><div><h3>${esc(p.name)}</h3><div class="en">${esc(p.en)}・${esc(p.days)}</div></div>
            <div class="now">${icon(WX.icon(c.weather_code))}<b>${Math.round(c.temperature_2m)}°</b></div></div>
            <div class="nowmeta"><span>${WX.text(c.weather_code)}</span><span>體感 ${Math.round(c.apparent_temperature)}°</span><span>風速 ${c.wind_speed_10m} m/s</span><span>積雪 ${c.snow_depth != null ? Math.round(c.snow_depth * 100) + ' cm' : '—'}</span><span>日落 ${dl.sunset[0].slice(11)}</span></div>
            <div class="strip">${dl.time.map((t, j) => { const trip = t >= TRIP.start && t <= TRIP.end; const dd = new Date(t + 'T00:00:00'); return `<div class="dcell ${trip ? 'trip' : ''}"><div class="d">${t.slice(5).replace('-', '/')}</div><div class="small">${'日一二三四五六'[dd.getDay()]}${trip ? '・旅' : ''}</div>${icon(WX.icon(dl.weather_code[j]))}<div class="t">${Math.round(dl.temperature_2m_min[j])}° / ${Math.round(dl.temperature_2m_max[j])}°</div><div>降水 ${dl.precipitation_probability_max[j] == null ? '—' : dl.precipitation_probability_max[j] + '%'}</div><div>雪 ${dl.snowfall_sum[j]} cm</div><div>風 ${dl.wind_speed_10m_max[j]} m/s</div></div>`; }).join('')}</div>`;
          $('#wxAt', el).textContent = '更新於 ' + new Date(v.at).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
        }).catch(() => {
          card.innerHTML = `<div class="head"><div><h3>${esc(p.name)}</h3><div class="en">${esc(p.en)}</div></div></div><div class="pad" style="padding-top:0"><p class="small muted" style="margin:0 0 10px">目前無法取得天氣資料（可能沒有網路）。請改用：</p><div class="btn-row"><a class="btn sm" href="https://www.jma.go.jp/bosai/forecast/" target="_blank" rel="noopener">日本氣象廳</a><a class="btn sm" href="https://tenki.jp/forecast/1/" target="_blank" rel="noopener">tenki.jp</a></div></div>`;
        });
      });
    };
    draw(false);
    $('#wxRefresh', el).addEventListener('click', () => draw(true));
  }

  /* ---------------- 行前確認 ---------------- */
  function renderNotes() {
    const el = $('#v-notes');
    const cls = { '急': 'urgent', '矛盾': 'conflict', '安全': 'safe' };
    el.innerHTML = `<div class="wrap" style="max-width:860px">
      <div class="page-title"><span class="eyebrow">Before departure</span><h1>行前確認</h1><p>製作網站時發現的 PDF 矛盾、時間衝突與待補資料。網站沒有擅自更改這些內容，確認後可在 data.js 修改。</p></div>
      <div class="issues" style="margin-top:18px">${ISSUES.map((i) => `<div class="card issue"><span class="lv ${cls[i.level] || ''}">${esc(i.level)}</span><div><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div></div>`).join('')}</div>
      <section class="section"><div class="section-head"><div><span class="eyebrow">Bookings</span><h2>已訂與待訂</h2></div><a class="btn" href="#checklist">去清單勾選 →</a></div>
        <div class="card pad"><ul style="margin:0;padding-left:18px;color:var(--brown)">${TRIP.bookings.map((b) => `<li style="margin:6px 0">${esc(b)}</li>`).join('')}</ul></div>
      </section>
    </div>`;
  }

  /* ---------------- 共用：選單、捲動 ---------------- */
  function closeSheet() { $('#sheet').classList.remove('open'); $('#sheetBg').classList.remove('open'); }
  $('#moreBtn').addEventListener('click', () => { $('#sheet').classList.add('open'); $('#sheetBg').classList.add('open'); });
  $('#sheetBg').addEventListener('click', closeSheet);
  window.addEventListener('scroll', () => $('#topbar').classList.toggle('scrolled', window.scrollY > 8), { passive: true });
  window.addEventListener('hashchange', route);
  bindLB();
  route();
})();
