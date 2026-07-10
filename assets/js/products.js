/* ============================================================
   9CLUB — Product catalog data (shared across all pages)
   Foto = aset asli di assets/img/products/
   ============================================================ */
const PRODUCTS = [
  {
    id: "ringer-tee",
    name: "Ringer Tee 9club",
    price: 179000,
    category: "T-Shirt",
    drop: "Drop 1 Collection",
    sold: true,
    color: "White / Red",
    material: "Cotton Australian Coolbreeze 235 gsm",
    desc: "Ringer tee klasik dengan rib kontras dan logo type 9club merah di dada. Bahan cotton Australian Coolbreeze 235 gsm — adem, jatuh rapi, khas drop pertama.",
    img: "assets/img/products/ringer-2.jpg",
    hover: "assets/img/products/ringer-3.jpg",
    gallery: ["ringer-2", "ringer-3", "ringer-4", "ringer-1", "ringer-5"]
  },
  {
    id: "tee-boyz-black",
    name: "Tshirt 9club Boyz Black",
    price: 199000,
    category: "T-Shirt",
    drop: "Drop 1 Collection",
    sold: true,
    color: "Black",
    material: "Heavyweight Australian Coolbreeze 16s 235 gsm",
    desc: "Heavyweight tee dengan grafis mascot 9club Boyz sablon glow. \"Fun slide is cooler than crush.\" Potongan oversized, bahan tebal 235 gsm.",
    img: "assets/img/products/tee-boyz-3.jpg",
    hover: "assets/img/products/tee-boyz-1.jpg",
    gallery: ["tee-boyz-3", "tee-boyz-1", "tee-boyz-2", "tee-boyz-4"]
  },
  {
    id: "tee-og-black",
    name: "Tshirt Logo 9club Black OG",
    price: 189000,
    category: "T-Shirt",
    drop: "Drop 1 Collection",
    sold: true,
    color: "Black",
    material: "Cotton Australian Coolbreeze 235 gsm",
    desc: "THE OG! Tee logo monogram 9club — clean, essential, everyday. Cotton Australian Coolbreeze 235 gsm dengan woven tag hijau khas 9club.",
    img: "assets/img/products/tee-og-3.jpg",
    hover: "assets/img/products/tee-og-5.jpg",
    gallery: ["tee-og-3", "tee-og-5", "tee-og-1", "tee-og-2"]
  },
  {
    id: "snapback-9c-brown",
    name: "Snapback Classic 9C Brown",
    price: 189000,
    category: "Headwear",
    drop: "Drop 1 Collection",
    sold: true,
    color: "Brown",
    material: "Structured 6-panel, embroidery front logo",
    desc: "Snapback 6-panel warna brown dengan bordir logo type 9club di depan dan mascot di samping. Struktur klasik, adjustable snap.",
    img: "assets/img/products/cap-brown-2.jpg",
    hover: "assets/img/products/cap-brown-1.jpg",
    gallery: ["cap-brown-2", "cap-brown-1", "cap-brown-3", "cap-brown-4"]
  },
  {
    id: "jorts-black",
    name: "Jorts Pants Logo Type Black",
    price: 289000,
    category: "Bottoms",
    drop: "Drop 1 Collection",
    sold: false,
    color: "Black",
    material: "Denim, contrast stitch, 9club green tab",
    desc: "Jorts denim hitam potongan baggy dengan contrast stitch putih dan green woven tab 9club. Available online & offline.",
    img: "assets/img/products/jorts-black-5.jpg",
    hover: "assets/img/products/jorts-black-2.jpg",
    gallery: ["jorts-black-5", "jorts-black-1", "jorts-black-3", "jorts-black-4", "jorts-black-2"]
  },
  {
    id: "jorts-blue",
    name: "Jorts Pants Boyz Denim Blue",
    price: 309000,
    category: "Bottoms",
    drop: "Drop 1 Collection",
    sold: false,
    color: "Denim Blue",
    material: "Raw denim, mascot embroidery",
    desc: "Jorts raw denim blue dengan bordir mascot 9club Boyz di kantong. Baggy fit, statement piece drop 1. Available online & offline.",
    img: "assets/img/products/jorts-blue-3.jpg",
    hover: "assets/img/products/jorts-blue-1.jpg",
    gallery: ["jorts-blue-3", "jorts-blue-4", "jorts-blue-1", "jorts-blue-2", "jorts-blue-6"]
  },
  {
    id: "baggy-black",
    name: "9club Baggy Jeans Black on Black",
    price: 389000,
    category: "Bottoms",
    drop: "Drop 1 Collection",
    sold: true,
    color: "Raw Black",
    material: "Raw denim black on black 14 oz",
    desc: "Baggy jeans raw denim 14 oz black on black dengan tonal embroidery. Berat, awet, makin bagus seiring dipakai. Drop 1 — sold out.",
    img: "assets/img/products/baggy-black-1.jpg",
    hover: "assets/img/products/baggy-black-4.jpg",
    gallery: ["baggy-black-1", "baggy-black-4", "baggy-black-3", "baggy-black-5", "baggy-black-2"]
  }
];

/* Helpers dipakai lintas halaman */
const rupiah = n => "Rp " + n.toLocaleString("id-ID");

/* ---- Integrasi dengan Admin ----
   Storefront membaca perubahan admin dari localStorage '9club_admin_products'
   (stok, status, harga, nama, kategori, foto). Kalau belum pernah diedit,
   pakai data dasar PRODUCTS. */
function _normImg(src){ return String(src).replace('../assets/','assets/'); }
function getProducts(){
  let admin=null;
  try{ admin = JSON.parse(localStorage.getItem('9club_admin_products') || 'null'); }catch(e){}
  const merged = PRODUCTS.map(base => {
    let images = (base.gallery||[]).map(g => 'assets/img/products/'+g+'.jpg');
    let stock = base.sold ? 0 : 24, name=base.name, price=base.price, category=base.category, sold=base.sold;
    let desc=base.desc, color=base.color, material=base.material, drop=base.drop;
    const ov = admin && admin.find(a => a.id === base.id);
    if(ov){
      name = ov.name; price = ov.price; category = ov.category;
      stock = (typeof ov.stock === 'number') ? ov.stock : stock;
      if(ov.images && ov.images.length) images = ov.images.map(_normImg);
      sold = stock <= 0;                       // status otomatis dari stok
      if(ov.desc != null) desc = ov.desc;
      if(ov.color != null) color = ov.color;
      if(ov.material != null) material = ov.material;
      if(ov.drop != null) drop = ov.drop;
    }
    return Object.assign({}, base, { name, price, category, stock, sold, desc, color, material, drop,
      images, img: images[0], hover: images[1] || images[0] });
  });
  const extras = (admin||[]).filter(a => !PRODUCTS.some(p => p.id === a.id)).map(a => {
    const images = (a.images||[]).map(_normImg);
    const fb = 'assets/img/products/tee-og-3.jpg';
    return { id:a.id, name:a.name, price:a.price, category:a.category,
      stock:a.stock||0, sold:(a.stock||0) <= 0,
      drop:a.drop||'Custom', color:a.color||'-', material:a.material||'-', desc:a.desc||'',
      images, img: images[0]||fb, hover: images[1]||images[0]||fb };
  });
  return merged.concat(extras);
}
function findProduct(id){ return getProducts().find(p => p.id === id); }

/* ---- Order store bersama (admin + halaman pengguna baca/tulis di sini) ---- */
const ORDERS_KEY = '9club_orders';
const _SEED_ORDERS = [
  {id:'9C-A18K2', date:'05 Jul 2026', pay:'Transfer Bank', status:'paid', total:598000,
   items:[{id:'jorts-black',name:'Jorts Pants Logo Type Black',img:'assets/img/products/jorts-black-5.jpg',size:'M',qty:2,price:289000}]},
  {id:'9C-B72J9', date:'06 Jul 2026', pay:'COD', status:'pending', total:199000,
   items:[{id:'tee-boyz-black',name:'Tshirt 9club Boyz Black',img:'assets/img/products/tee-boyz-3.jpg',size:'L',qty:1,price:199000}]},
  {id:'9C-C55M1', date:'07 Jul 2026', pay:'E-Wallet', status:'shipped', total:329000,
   items:[{id:'jorts-blue',name:'Jorts Pants Boyz Denim Blue',img:'assets/img/products/jorts-blue-3.jpg',size:'M',qty:1,price:309000}]}
];
function ensureSeedOrders(){
  if(localStorage.getItem('9club_orders_seeded')) return;
  const list = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const ids = new Set(list.map(o => o.id));
  _SEED_ORDERS.forEach(s => { if(!ids.has(s.id)) list.push(s); });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  localStorage.setItem('9club_orders_seeded', '1');
}
function getOrders(){ ensureSeedOrders(); return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
function setOrderStatus(id, status){
  const list = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const o = list.find(x => x.id === id);
  if(o){ o.status = status; localStorage.setItem(ORDERS_KEY, JSON.stringify(list)); return true; }
  return false;
}
