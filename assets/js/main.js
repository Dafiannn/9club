/* ============================================================
   9CLUB — Shared UI: header, footer, cart, product cards
   ============================================================ */
const ICON = {
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h13l-1.3 10.5a2 2 0 0 1-2 1.5H9.3a2 2 0 0 1-2-1.5L6 7Z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.1 1.6 3.6 3.7 3.8V9c-1.4 0-2.7-.4-3.7-1.1v6.4c0 3.3-2.4 5.7-5.6 5.7-3 0-5.4-2.3-5.4-5.3 0-3.2 2.7-5.6 6.2-5.1v2.6c-.4-.1-.9-.2-1.3-.2-1.5 0-2.6 1.1-2.6 2.6 0 1.5 1.1 2.6 2.6 2.6 1.5 0 2.7-1.2 2.7-2.9V3h3.3Z"/></svg>'
};

/* ---------- CART (localStorage) ---------- */
const Cart = {
  key:'9club_cart',
  get(){ try{return JSON.parse(localStorage.getItem(this.key))||[]}catch(e){return[]} },
  save(c){ localStorage.setItem(this.key,JSON.stringify(c)); updateCartBadge(); },
  count(){ return this.get().reduce((n,i)=>n+i.qty,0); },
  total(){ return this.get().reduce((n,i)=>n+i.qty*i.price,0); },
  add(id,size,qty=1){
    const p=findProduct(id); if(!p)return;
    const c=this.get();
    const line=c.find(i=>i.id===id&&i.size===size);
    if(line) line.qty+=qty;
    else c.push({id,name:p.name,price:p.price,img:p.img,size,qty});
    this.save(c);
  },
  setQty(id,size,qty){ let c=this.get(); const l=c.find(i=>i.id===id&&i.size===size); if(l){l.qty=qty; if(l.qty<1)c=c.filter(i=>i!==l);} this.save(c); },
  remove(id,size){ this.save(this.get().filter(i=>!(i.id===id&&i.size===size))); },
  clear(){ this.save([]); }
};
function updateCartBadge(){ document.querySelectorAll('.cart-count').forEach(el=>{ const n=Cart.count(); el.textContent=n; el.style.display=n?'grid':'none'; }); }

/* ---------- HEADER ---------- */
function mountHeader(active=''){
  const el=document.getElementById('site-header'); if(!el)return;
  const authed = (typeof Auth!=='undefined') ? Auth.current() : null;
  const accountHref = authed ? 'riwayat.html' : 'login.html';
  const drawerAccount = authed
    ? `<a href="riwayat.html">History Transaksi</a><a href="keranjang.html">Keranjang</a>
       <a href="index.html" onclick="Auth.logout()">Logout (${authed.name.split(' ')[0]})</a>`
    : `<a href="login.html">Masuk</a><a href="register.html">Daftar</a><a href="keranjang.html">Keranjang</a>`;
  el.innerHTML=`
  <header class="site-header">
    <div class="wrap nav">
      <button class="hamburger" aria-label="Menu" onclick="toggleDrawer(true)">${ICON.menu}</button>
      <div class="nav-left">
        <div class="has-mega"><a class="nav-link" href="katalog.html">Collection</a>
          <div class="mega"><div class="wrap mega-grid">
            <div class="mega-col"><h4>New Arrival</h4><ul>
              <li><a href="katalog.html">Drop 1 Collection</a></li>
              <li><a href="katalog.html">Best Seller</a></li>
              <li><a href="katalog.html">Restock</a></li></ul></div>
            <div class="mega-col"><h4>Tops</h4><ul>
              <li><a href="katalog.html?cat=T-Shirt">T-Shirt</a></li>
              <li><a href="katalog.html?cat=T-Shirt">Ringer Tee</a></li>
              <li><a href="katalog.html?cat=Headwear">Headwear</a></li></ul></div>
            <div class="mega-col"><h4>Bottoms</h4><ul>
              <li><a href="katalog.html?cat=Bottoms">Jorts</a></li>
              <li><a href="katalog.html?cat=Bottoms">Jeans</a></li>
              <li><a href="katalog.html?cat=Bottoms">Pants</a></li></ul></div>
            <div class="mega-cards">
              <a class="mega-card" href="katalog.html"><img src="assets/img/products/jorts-blue-1.jpg" alt=""><span>9club Boyz</span></a>
              <a class="mega-card" href="katalog.html"><img src="assets/img/products/ringer-3.jpg" alt=""><span>Drop 1</span></a>
            </div>
          </div></div>
        </div>
        <a class="nav-link" href="artikel.html">Artikel</a>
        <a class="nav-link" href="about.html">About Us</a>
      </div>
      <a class="nav-center brand-logo" href="index.html"><img src="assets/img/logo-9club-white.png" alt="9club"></a>
      <div class="nav-right">
        <button class="icon-btn" aria-label="Cari" onclick="openSearch()">${ICON.search}</button>
        <div class="account-menu">
          <button class="icon-btn" aria-label="Account" onclick="toggleAccount(event)">${ICON.user}</button>
          <div class="account-drop" id="account-drop">
            ${authed ? `
              <div class="acc-name">Halo, ${authed.name.split(' ')[0]} 👋</div>
              <a href="riwayat.html">History Transaksi</a>
              <a href="keranjang.html">Keranjang</a>
              <button class="logout" onclick="doLogout()">Logout</button>
            ` : `
              <a href="login.html">Masuk</a>
              <a href="register.html">Daftar</a>
            `}
          </div>
        </div>
        <a class="icon-btn" href="keranjang.html" aria-label="Cart">${ICON.cart}<span class="cart-count">0</span></a>
      </div>
    </div>
  </header>
  <div class="mobile-drawer" id="drawer">
    <button class="close" aria-label="Tutup" onclick="toggleDrawer(false)">${ICON.close}</button>
    <div class="m-group"><h4>Menu</h4>
      <a href="index.html">Home</a><a href="katalog.html">Collection</a>
      <a href="artikel.html">Artikel</a><a href="about.html">About Us</a></div>
    <div class="m-group"><h4>Shop</h4>
      <a href="katalog.html?cat=T-Shirt">T-Shirt</a><a href="katalog.html?cat=Headwear">Headwear</a>
      <a href="katalog.html?cat=Bottoms">Bottoms</a></div>
    <div class="m-group"><h4>Account</h4>
      ${drawerAccount}</div>
  </div>`;
  updateCartBadge();
}
function toggleDrawer(open){ const d=document.getElementById('drawer'); if(d)d.classList.toggle('open',open); document.body.style.overflow=open?'hidden':''; }
function toggleAccount(e){ e.stopPropagation(); document.getElementById('account-drop')?.classList.toggle('open'); }
function doLogout(){ if(typeof Auth!=='undefined')Auth.logout(); location.href='index.html'; }
document.addEventListener('click',e=>{ const d=document.getElementById('account-drop'); if(d&&!e.target.closest('.account-menu'))d.classList.remove('open'); });

/* ---------- FOOTER ---------- */
function mountFooter(){
  const el=document.getElementById('site-footer'); if(!el)return;
  el.innerHTML=`
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div>
          <ul class="footer-links">
            <li><a href="about.html">FAQ</a></li>
            <li><a href="about.html">How to Order</a></li>
            <li><a href="about.html">Return Policy</a></li>
            <li><a href="riwayat.html">Order Tracking</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-h">Explore</div>
          <ul class="footer-links">
            <li><a href="katalog.html">Collection</a></li>
            <li><a href="artikel.html">Artikel</a></li>
            <li><a href="keranjang.html">Keranjang</a></li>
          </ul>
        </div>
        <div class="footer-big">Feel Your<br><em>Paw</em></div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 — 9CLUB. All rights reserved.</span>
        <div class="socials">
          <a href="https://instagram.com/nineclub____" aria-label="Instagram">${ICON.ig}</a>
          <a href="#" aria-label="TikTok">${ICON.tiktok}</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ---------- PRODUCT CARD ---------- */
function productCard(p){
  const badge = p.sold
    ? '<span class="badge sold">Sold Out</span>'
    : '<span class="badge avail">Available</span>';
  return `<a class="card" href="produk.html?id=${p.id}">
    <div class="card-media">${badge}
      <img class="main" src="${p.img}" alt="${p.name}" loading="lazy">
      <img class="alt" src="${p.hover}" alt="" loading="lazy">
    </div>
    <div class="card-info">
      <div class="card-cat">${p.category}</div>
      <h3>${p.name}</h3>
      <div class="price">${rupiah(p.price)}</div>
    </div>
  </a>`;
}
function renderGrid(targetId,list){
  const el=document.getElementById(targetId); if(!el)return;
  el.innerHTML=list.map(productCard).join('');
}

/* ---------- CATALOG gallery card (panah kiri/kanan) ---------- */
function galleryCard(p){
  const badge = p.sold ? '<span class="badge sold">Sold Out</span>' : '<span class="badge avail">Available</span>';
  const imgs = (p.images && p.images.length) ? p.images : [p.img];
  const dots = imgs.map((_,i)=>`<span class="${i===0?'on':''}"></span>`).join('');
  return `<div class="card gcard" data-id="${p.id}" data-i="0">
    <div class="card-media">${badge}
      <img class="gimg" src="${imgs[0]}" alt="${p.name}" loading="lazy">
      <a class="go" href="produk.html?id=${p.id}" aria-label="${p.name}"></a>
      <button class="gnav prev" type="button" aria-label="Foto sebelumnya">‹</button>
      <button class="gnav next" type="button" aria-label="Foto berikutnya">›</button>
      <div class="gdots">${dots}</div>
    </div>
    <a class="card-info" href="produk.html?id=${p.id}">
      <div class="card-cat">${p.category}</div>
      <h3>${p.name}</h3>
      <div class="price">${rupiah(p.price)}</div>
    </a>
  </div>`;
}
function renderGalleryGrid(targetId,list){
  const el=document.getElementById(targetId); if(!el)return;
  el.innerHTML=list.map(galleryCard).join('');
  el.querySelectorAll('.gcard').forEach(card=>{
    const p=findProduct(card.dataset.id); if(!p)return;
    const imgs=(p.images && p.images.length)?p.images:[p.img];
    const img=card.querySelector('.gimg'), dots=card.querySelectorAll('.gdots span');
    const move=d=>{ let i=(+card.dataset.i + d + imgs.length)%imgs.length;
      card.dataset.i=i; img.src=imgs[i];
      dots.forEach((dt,k)=>dt.classList.toggle('on',k===i)); };
    card.querySelector('.prev').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();move(-1);});
    card.querySelector('.next').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();move(1);});
  });
}

/* ---------- SEARCH overlay ---------- */
function openSearch(){
  let ov=document.getElementById('search-overlay');
  if(!ov){
    ov=document.createElement('div'); ov.id='search-overlay'; ov.className='search-overlay';
    ov.innerHTML=`<div class="search-panel">
      <div class="search-bar">${ICON.search}
        <input id="search-input" type="text" placeholder="Cari produk 9club...">
        <button class="search-close" aria-label="Tutup" onclick="closeSearch()">${ICON.close}</button>
      </div>
      <div class="search-results" id="search-results"></div>
    </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click',e=>{ if(e.target===ov) closeSearch(); });
    ov.querySelector('#search-input').addEventListener('input',e=>runSearch(e.target.value));
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeSearch(); });
  }
  ov.classList.add('open'); document.body.style.overflow='hidden';
  const inp=ov.querySelector('#search-input'); inp.value=''; runSearch('');
  setTimeout(()=>inp.focus(),40);
}
function closeSearch(){ const ov=document.getElementById('search-overlay'); if(ov){ ov.classList.remove('open'); document.body.style.overflow=''; } }
function runSearch(q){
  const res=document.getElementById('search-results'); if(!res) return;
  if(typeof getProducts==='undefined'){ res.innerHTML='<p class="search-hint">Pencarian tidak tersedia di halaman ini.</p>'; return; }
  q=(q||'').trim().toLowerCase();
  if(!q){ res.innerHTML='<p class="search-hint">Ketik nama produk atau kategori…</p>'; return; }
  const list=getProducts().filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));
  if(!list.length){ res.innerHTML=`<p class="search-hint">Tidak ada hasil untuk “${q}”.</p>`; return; }
  res.innerHTML=`<div class="search-grid">`+list.map(p=>`
    <a class="search-item" href="produk.html?id=${p.id}">
      <img src="${p.img}" alt="">
      <div><div class="si-name">${p.name}</div><div class="si-price">${rupiah(p.price)} · ${p.category}</div></div>
      <span class="si-badge ${p.sold?'sold':'ok'}">${p.sold?'Sold Out':'Tersedia'}</span>
    </a>`).join('')+`</div>`;
}

/* ---------- HERO SLIDER (optional dots) ---------- */
function initHeroDots(){
  const dots=document.querySelectorAll('.hero-dots button'); if(!dots.length)return;
  let i=0; setInterval(()=>{ i=(i+1)%dots.length; dots.forEach((d,k)=>d.classList.toggle('active',k===i)); },3500);
}

/* ---------- Landing: header transparan di atas, solid saat scroll/gerakan ---------- */
function initHomeHeader(){
  if(!document.body.classList.contains('home-hero')) return;
  const header=document.querySelector('.site-header'); if(!header) return;
  const TOP=60; let idleTimer;
  const setTransparent=()=>{ if(window.scrollY<=TOP) header.classList.add('transparent'); };
  function onScroll(){ if(window.scrollY>TOP) header.classList.remove('transparent'); else header.classList.add('transparent'); }
  function onMove(){ if(window.scrollY>TOP) return; header.classList.remove('transparent'); clearTimeout(idleTimer); idleTimer=setTimeout(setTransparent,2000); }
  header.classList.add('transparent');          // mulai transparan (di atas video)
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('mousemove',onMove,{passive:true});
  window.addEventListener('touchstart',onMove,{passive:true});
  onScroll();
}

document.addEventListener('DOMContentLoaded',()=>{ initHeroDots(); });
