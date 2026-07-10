/* ============================================================
   9CLUB — Article/blog data (shared)
   ============================================================ */
const ARTICLES = [
  {
    id: "drop-1-story",
    title: "Drop 1 Sudah Rilis: Cerita di Balik 9club Boyz",
    category: "Story",
    date: "12 Jan 2026",
    author: "Tim 9club",
    cover: "assets/img/products/jorts-blue-1.jpg",
    excerpt: "Karakter 9club Boyz bukan sekadar maskot. Ini asal-usulnya dan kenapa dia jadi wajah drop pertama.",
    body: [
      "Drop 1 adalah langkah pertama 9club masuk ke skena streetwear lokal. Semua dimulai dari satu ide sederhana: bikin baju yang enak dipakai tiap hari tapi tetap punya karakter.",
      "Maskot 9club Boyz lahir dari sketsa iseng — sosok bandel yang santai tapi percaya diri. Dia muncul di jorts denim blue dan tee boyz black, jadi penanda paling kuat dari koleksi ini.",
      "Semua produk drop 1 dibuat dalam jumlah terbatas. Begitu habis, ya habis. Itu yang bikin tiap piece terasa spesial."
    ]
  },
  {
    id: "styling-jorts",
    title: "Cara Styling Jorts Biar Nggak Norak",
    category: "Style Guide",
    date: "18 Jan 2026",
    author: "Tim 9club",
    cover: "assets/img/products/jorts-black-2.jpg",
    excerpt: "Jorts baggy lagi naik daun. Tiga formula gampang biar tampilanmu clean dan tetap effortless.",
    body: [
      "Jorts baggy itu statement piece. Kuncinya adalah balance — atasan jangan terlalu longgar biar siluetnya tetap rapi.",
      "Formula aman: tee fitted + jorts baggy + sneakers chunky. Tambahkan snapback buat aksen. Semua ada di drop 1.",
      "Kalau mau lebih berani, layer dengan kemeja terbuka. Warna netral bikin grafis jorts lebih menonjol."
    ]
  },
  {
    id: "cotton-coolbreeze",
    title: "Kenapa Cotton Coolbreeze 235gsm Itu Worth It",
    category: "Material",
    date: "22 Jan 2026",
    author: "Tim 9club",
    cover: "assets/img/products/ringer-4.jpg",
    excerpt: "Bukan sekadar tebal. Ini alasan kami memilih cotton Australian Coolbreeze untuk semua tee 9club.",
    body: [
      "Coolbreeze 235gsm adalah cotton berat yang tetap adem di iklim tropis. Jatuhnya bagus, nggak nerawang, dan awet dicuci berkali-kali.",
      "Bahan tebal bikin sablon dan bordir lebih tegas. Itu penting buat grafis besar seperti di tee boyz black.",
      "Investasi di bahan artinya baju bertahan lama. Feel your paw — rasain sendiri bedanya."
    ]
  },
  {
    id: "rawdenim-care",
    title: "Merawat Raw Denim: Panduan Singkat",
    category: "Care",
    date: "28 Jan 2026",
    author: "Tim 9club",
    cover: "assets/img/products/baggy-black-4.jpg",
    excerpt: "Raw denim 14oz makin bagus seiring dipakai. Ini cara merawatnya biar fade-nya keluar maksimal.",
    body: [
      "Raw denim belum dicuci dari pabrik, jadi warnanya pekat dan kaku di awal. Pakai dulu minimal beberapa minggu sebelum dicuci pertama.",
      "Cuci sesekali saja, balik bagian dalam, air dingin, jangan mesin pengering. Ini menjaga fade alami muncul di lipatan.",
      "Baggy jeans black on black kami pakai denim 14oz — berat, awet, dan bakal jadi makin personal seiring waktu."
    ]
  }
];
const findArticle = id => ARTICLES.find(a => a.id === id);
