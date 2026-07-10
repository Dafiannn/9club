# Ayudya — Landing Page (Beranda)

Stack: **HTML + CSS + Vue 3 (via CDN, tanpa build tool)**.

## Struktur
```
ayudya-frontend/
├── index.html              ← markup halaman + mount point Vue
├── css/style.css           ← semua styling (token warna & layout dari Figma)
├── js/
│   ├── hero-carousel.js    ← komponen Vue reusable untuk hero
│   └── app.js              ← data hero + inisialisasi Vue app
└── assets/                 ← taruh foto/video hero di sini
```

## Cara ganti foto/video hero
Buka `js/app.js`, edit array `heroSlides`. Tidak perlu sentuh HTML/CSS sama sekali.

```js
heroSlides: [
  { type: "image", src: "assets/hero-1.jpg", alt: "..." },
  { type: "video", src: "assets/hero-2.mp4", poster: "assets/hero-2-poster.jpg" },
]
```

- `type: "image"` → otomatis render `<img>`
- `type: "video"` → otomatis render `<video autoplay muted loop>` dengan poster/thumbnail sebagai fallback

Dots navigasi di kanan-bawah otomatis menyesuaikan jumlah slide, dan carousel auto-play tiap 6 detik (bisa diubah lewat prop `autoplay-ms`).

## Belum ada di file ini
- Asset asli (foto/video) — folder `assets/` masih kosong, tinggal isi file kamu.
- Section "New Arrival" dan seterusnya di landing page — menyusul di iterasi berikutnya.
- Menu mobile (hamburger) — placeholder CSS sudah ada, logic-nya belum.
