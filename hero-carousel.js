// hero-carousel.js
// Komponen Vue untuk hero section beranda.
// Setiap slide bisa berupa "image" ATAU "video" — tinggal ganti data di app.js,
// tidak perlu ubah HTML/komponen ini sama sekali.

const HeroCarousel = {
  name: "HeroCarousel",
  props: {
    slides: {
      type: Array,
      required: true,
      // contoh format tiap slide:
      // { type: "image", src: "assets/hero-1.jpg" }
      // { type: "video", src: "assets/hero-1.mp4", poster: "assets/hero-1-poster.jpg" }
    },
    autoplayMs: {
      type: Number,
      default: 6000,
    },
  },
  data() {
    return {
      current: 0,
      timer: null,
    };
  },
  mounted() {
    this.startAutoplay();
  },
  beforeUnmount() {
    this.stopAutoplay();
  },
  methods: {
    goTo(index) {
      this.current = index;
      this.restartAutoplay();
    },
    next() {
      this.current = (this.current + 1) % this.slides.length;
    },
    startAutoplay() {
      if (this.slides.length <= 1) return;
      this.timer = setInterval(this.next, this.autoplayMs);
    },
    stopAutoplay() {
      clearInterval(this.timer);
    },
    restartAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    },
  },
  template: `
    <section class="hero">
      <div class="hero__back">
        <button class="icon-btn icon-btn--light" aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="1.5"/></svg>
        </button>
      </div>

      <div class="hero__stage">
        <template v-for="(slide, i) in slides" :key="i">
          <img
            v-if="slide.type === 'image'"
            v-show="i === current"
            :src="slide.src"
            class="hero__media"
            :alt="slide.alt || ''"
          />
          <video
            v-else-if="slide.type === 'video'"
            v-show="i === current"
            class="hero__media"
            :poster="slide.poster"
            autoplay
            muted
            loop
            playsinline
          >
            <source :src="slide.src" type="video/mp4" />
          </video>
        </template>
        <div class="hero__gradient"></div>
      </div>

      <div class="hero__nav">
        <button
          v-for="(slide, i) in slides"
          :key="'dot-' + i"
          class="hero__dot"
          :class="{ 'hero__dot--active': i === current }"
          @click="goTo(i)"
          :aria-label="'Slide ' + (i + 1)"
        ></button>
      </div>
    </section>
  `,
};
