/* ============================================================
   9CLUB — Admin panel logic (CRUD via localStorage)
   Halaman admin ada di /admin, jadi aset pakai ../
   ============================================================ */
const AICON = {
  dash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 3h9l5 5v13H6z"/><path d="M14 3v6h6M9 13h7M9 17h7"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 5.2A3 3 0 0 1 16 11M21 20c0-2.6-1.4-4.2-3.5-4.8"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h13l-1.3 10.5a2 2 0 0 1-2 1.5H9.3a2 2 0 0 1-2-1.5L6 7Z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg>',
  money:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20h4L18 10l-4-4L4 16v4Z"/><path d="M13.5 6.5l4 4"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"/></svg>',
  store:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9V6l1.5-2h13L20 6v3a2.5 2.5 0 0 1-4 2 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4-2Z"/><path d="M5 11v9h14v-9"/></svg>',
  out:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M15 4h4v16h-4M11 8l4 4-4 4M15 12H3"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};

/* seed users */
const SEED_USERS = [
  {id:'U-001', name:'Andy Pratama', email:'andy@mail.com', role:'Customer', joined:'02 Jan 2026', status:'active'},
  {id:'U-002', name:'Rani Kusuma', email:'rani@mail.com', role:'Customer', joined:'08 Jan 2026', status:'active'},
  {id:'U-003', name:'Dimas Aditya', email:'dimas@mail.com', role:'Customer', joined:'15 Jan 2026', status:'active'},
  {id:'U-004', name:'Admin 9club', email:'admin@9club.id', role:'Admin', joined:'01 Jan 2026', status:'active'},
  {id:'U-005', name:'Sasa Melinda', email:'sasa@mail.com', role:'Customer', joined:'20 Jan 2026', status:'banned'}
];

/* store helpers */
const Store = {
  get(key, seed){ const v=localStorage.getItem(key); if(v)return JSON.parse(v); if(seed){localStorage.setItem(key,JSON.stringify(seed));return seed;} return []; },
  set(key, data){ localStorage.setItem(key, JSON.stringify(data)); }
};
function adminProducts(){
  const seed = PRODUCTS.map(p=>{
    const images = (p.gallery||[]).map(g=>'../assets/img/products/'+g+'.jpg');
    return {id:p.id,name:p.name,price:p.price,category:p.category,sold:p.sold,
            images, img:images[0], stock:p.sold?0:24,
            desc:p.desc||'', color:p.color||'', material:p.material||'', drop:p.drop||''};
  });
  const data = Store.get('9club_admin_products', seed);
  data.forEach(d=>{
    if(!d.images||!d.images.length) d.images=d.img?[d.img]:[]; if(!d.img) d.img=d.images[0];
    if(d.desc==null) d.desc=''; if(d.color==null) d.color=''; if(d.material==null) d.material=''; if(d.drop==null) d.drop='';
  });
  return data;
}

/* resize + baca file gambar -> dataURL (biar hemat localStorage) */
function filesToDataURLs(files, cb, max=900, q=0.82){
  const arr=[...files], out=[]; let done=0;
  if(!arr.length){ cb(out); return; }
  arr.forEach((file,idx)=>{
    const reader=new FileReader();
    reader.onload=ev=>{
      const img=new Image();
      img.onload=()=>{
        let w=img.width, h=img.height;
        if(w>max||h>max){ const s=max/Math.max(w,h); w=Math.round(w*s); h=Math.round(h*s); }
        const c=document.createElement('canvas'); c.width=w; c.height=h;
        c.getContext('2d').drawImage(img,0,0,w,h);
        out[idx]=c.toDataURL('image/jpeg',q);
        if(++done===arr.length) cb(out.filter(Boolean));
      };
      img.onerror=()=>{ if(++done===arr.length) cb(out.filter(Boolean)); };
      img.src=ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}
function adminArticles(){ return Store.get('9club_admin_articles', (typeof ARTICLES!=='undefined'?ARTICLES:[]).map(a=>({id:a.id,title:a.title,category:a.category,date:a.date,cover:a.cover.replace('assets/','../assets/')}))); }
function adminUsers(){ return Store.get('9club_admin_users', SEED_USERS); }
function adminOrders(){
  // baca store bersama (products.js) lalu sesuaikan path gambar utk folder /admin
  return getOrders().map(o=>({...o, items:o.items.map(i=>({...i, img:String(i.img).replace(/^assets\//,'../assets/')}))}));
}

/* sidebar + topbar */
function mountAdmin(active, title, sub){
  if(typeof Auth!=='undefined' && !Auth.requireAdmin('../')) return; // gate: harus login admin
  const el=document.getElementById('side'); if(el){
    el.innerHTML=`
    <div class="side-logo"><img src="../assets/img/logo-9club-white.png" alt="9club"><span>Admin</span></div>
    <nav class="side-nav">
      <a href="dashboard.html" class="${active==='dash'?'active':''}">${AICON.dash} Dashboard</a>
      <a href="produk.html" class="${active==='produk'?'active':''}">${AICON.box} Kelola Produk</a>
      <a href="artikel.html" class="${active==='artikel'?'active':''}">${AICON.doc} Kelola Artikel</a>
      <a href="pengguna.html" class="${active==='pengguna'?'active':''}">${AICON.users} Kelola Pengguna</a>
      <a href="transaksi.html" class="${active==='transaksi'?'active':''}">${AICON.cart} Kelola Transaksi</a>
    </nav>
    <div class="side-foot">
      <a href="../index.html">${AICON.store} Lihat Toko</a>
      <a href="../login.html" onclick="if(typeof Auth!=='undefined')Auth.logout()">${AICON.out} Keluar</a>
    </div>`;
  }
  const tb=document.getElementById('topbar'); if(tb){
    tb.innerHTML=`
      <div style="display:flex;align-items:center;gap:14px">
        <button class="mobile-top icon-act" onclick="document.getElementById('side').classList.toggle('open')" style="border:none">${AICON.menu}</button>
        <div><h1>${title}</h1><div class="sub">${sub||''}</div></div>
      </div>
      <div class="admin-user"><span style="font-size:13px;text-align:right">Admin 9club<br><span style="color:var(--olive)">admin@9club.id</span></span><div class="avatar">9</div></div>`;
  }
}

/* modal helper */
function openModal(title, bodyHTML, onSave){
  let bg=document.getElementById('modal-bg');
  if(!bg){ bg=document.createElement('div'); bg.id='modal-bg'; bg.className='modal-bg'; document.body.appendChild(bg); }
  bg.innerHTML=`<div class="modal">
    <div class="modal-head"><h3>${title}</h3><button onclick="closeModal()">${AICON.x}</button></div>
    <div class="modal-body">${bodyHTML}</div>
    <div class="modal-foot"><button class="btn btn-ghost btn-sm" onclick="closeModal()">Batal</button>
    <button class="btn btn-dark btn-sm" id="modal-save">Simpan</button></div></div>`;
  bg.classList.add('open');
  bg.onclick=e=>{if(e.target===bg)closeModal();};
  document.getElementById('modal-save').onclick=()=>onSave(bg);
}
function closeModal(){ const bg=document.getElementById('modal-bg'); if(bg)bg.classList.remove('open'); }
