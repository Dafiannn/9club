// app.js
// Root Vue app untuk halaman Beranda (Landing Page).

const { createApp } = Vue;

createApp({
  components: {
    HeroCarousel,
  },
  data() {
    return {
      // GANTI FOTO/VIDEO HERO DI SINI SAJA — komponen otomatis menyesuaikan.
      heroSlides: [
        {
          type: "image",
          src: "assets/hero-1.jpg",
          alt: "Koleksi terbaru Ayudya",
        },
        {
          type: "video",
          src: "assets/hero-2.mp4",
          poster: "assets/hero-2-poster.jpg",
        },
        {
          type: "image",
          src: "assets/hero-3.jpg",
          alt: "Lookbook musim ini",
        },
        {
          type: "image",
          src: "assets/hero-4.jpg",
          alt: "Promo spesial",
        },
      ],
    };
  },
}).mount("#app");
