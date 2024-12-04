import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LandingIntroduce.module.scss';
import img0 from "../../assets/landing0.jpg";
import img1 from "../../assets/landing1.jpg";
import img2 from "../../assets/landing2.jpg";
import img3 from "../../assets/landing3.jpg";
import img4 from "../../assets/landing4.jpg";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.to(`.${styles.intro} .${styles['bg-img']}`, {
      y: '80%',
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.intro}`,
        start: 'top 1px',
        end: 'bottom 100px',
        scrub: true,
      },
    });

    gsap.to(`.${styles.intro} .${styles['bg-img']}`, {
      filter: 'brightness(0.25) blur(16px)',
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.intro}`,
        start: 'center top',
        scrub: true,
      },
    });

    gsap.to(`.${styles.intro} .${styles.title}`, {
      y: '45vh',
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.intro}`,
        start: '25% top',
        scrub: true,
      },
    });

    const progressTL = gsap.to(`.${styles['progress-thumb']}`, {
      scaleX: 1,
      ease: 'none',
      paused: true,
    });

    const slides = gsap.utils.toArray(`.${styles.slide}`);
    const slidesTL = gsap.timeline();

    slides.forEach((slide, i) => {
      const isFirst = i === 0;
      const tl = gsap.timeline();

      if (!isFirst) {
        tl.from(slide, { xPercent: 100 });
        tl.from(slide.querySelector('h2'), {
          duration: 0.25,
          opacity: 0,
          x: 100,
        }, 0.2);
      }

      tl.fromTo(slide.querySelector(`.${styles['bg-img']}`), {
        xPercent: isFirst ? 0 : 8,
      }, {
        xPercent: -8,
      }, 0);

      slidesTL.add(tl, isFirst ? undefined : '-=0.1');
    });

    ScrollTrigger.create({
      animation: slidesTL,
      trigger: `.${styles['slide-container']}`,
      start: 'top top',
      end: `+=${slides.length * 100}%`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        progressTL.progress(self.progress);
      },
    });

    gsap.from('footer h2', {
      opacity: 0,
      y: 100,
      duration: 0.6,
      scrollTrigger: {
        trigger: 'footer',
        toggleActions: 'play none none reset',
        start: 'center bottom',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <header>
        <a href="https://greensock.com/scrolltrigger">
          {/* <img */}
        </a>
      </header>

      <div className={styles.intro}>
  <div className={styles.visual}>
    <img
      src={img1}
            className={`${styles['bg-img']} ${styles['bg-overlay']}`}
      alt="Intro Background"
    />
  </div>
  <div className={styles.content}>
    <h1 className={`${styles.title} font-vazirmatn text-[3vw] text-right`}>
جایی که ایده ها زنده میشوند...
    </h1>
    <p className="font-vazirmatn text-[1.2vw] mt-4 text-right">
      همین امروز بیزینس خودتو شروع کن و به جمع صدها استارتاپ موفق در بمب فاندینگ بپیوند.
    </p>
    <p className="font-vazirmatn text-[1.2vw] mt-4 text-right">
            بمب فاندینگ، پلتفرمی برای ارتباط با سرمایه گذاران ، کارآفرینان و حمایت کنندگان.
      چه ایده بزرگی داشته باشی چه کوچک، اینجا جایی برای توست...      
          </p>
    <div className="mt-8 flex gap-4 flex-wrap">
      <button className="btn font-vazirmatn text-black bg-bomborange hover:text-white text-[0.9vw] w-[10vw] h-[2vw]">
        ایجاد موقعیت جدید
      </button>
      <button className="btn font-vazirmatn text-black bg-bomborange hover:text-white text-[0.9vw] w-[8vw] h-[3vw]">
        کشف پروژه‌ها
      </button>
    </div>
  </div>
</div>


      <div className={styles['slide-container']}>
        <section id="slide-1" className={`${styles.slide} ${styles['slide-odd']}`}>
          <img
            src={img2}
            className={styles['bg-img']}
            alt="Slide 1 Background"
          />
          <h2 className={styles['slide-title']}>slide 1</h2>
        </section>

        <section id="slide-2" className={`${styles.slide} ${styles['slide-even']}`}>
          <img
            src={img2}
            className={styles['bg-img']}
            alt="Slide 2 Background"
          />
          <h2 className={styles['slide-title']}>slide 2</h2>
        </section>

        <section id="slide-3" className={`${styles.slide} ${styles['slide-odd']}`}>
          <img
            src={img3}
            className={styles['bg-img']}
            alt="Slide 3 Background"
          />
          <h2 className={styles['slide-title']}>slide 3</h2>
        </section>

        <section id="slide-4" className={`${styles.slide} ${styles['slide-even']}`}>
          <img
            src={img4}
            className={styles['bg-img']}
            alt="Slide 4 Background"
          />
          <h2 className={styles['slide-title']}>slide 4</h2>
        </section>

        <div className={styles['slide-progress']}>
          <span className={styles['progress-thumb']} />
        </div>
      </div>

    </>
  );
};

export default App;
