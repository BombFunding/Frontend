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
import img7 from "../../assets/landing7.png";
import img8 from "../../assets/landing8.png";
import img9 from "../../assets/landing9.jpg";
import BarChart from './BarChart';

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
        tl.from(
          slide.querySelector('h2'),
          {
            duration: 0.25,
            opacity: 0,
            x: 100,
          },
          0.2
        );
      }

      tl.fromTo(
        slide.querySelector(`.${styles['bg-img']}`),
        {
          xPercent: isFirst ? 0 : 8,
        },
        {
          xPercent: -8,
        },
        0
      );

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

ScrollTrigger.create({
  trigger: slides[3],
  start: 'center center',
  onEnter: () => {
    if (typeof window.BarChart !== 'undefined' && typeof window.BarChart.startAnimation === 'function') {
      setTimeout(() => {
        window.BarChart.startAnimation();
      }, 2000);
    } else {
      console.error('BarChart.startAnimation is not defined.');
    }
  },

  
});

  function counter(id, start, end, duration) {
    let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        obj.innerHTML = `${current}<span class="plus-sign">+</span>`;
        if (current === end) {
          clearInterval(timer);
        }
      }, step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counter("count1", 0, 400, 3000);
          counter("count2", 100, 50, 2500);
          counter("count3", 0, 40, 3000);

          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const slide1 = document.getElementById("slide-1");
  if (slide1) observer.observe(slide1);

  return () => observer.disconnect();
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
              کشف پروژه‌ها
            </button>
            <button className="btn font-vazirmatn text-black bg-bomborange hover:text-white text-[0.9vw] w-[8vw] h-[3vw]">
              ثبت نام
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
          <div className={styles['overlay']}>
            <h1 className={styles['title']}>تعداد کاربران و موقعیت های سایت</h1>
            <div className={`${styles['counters']} row justify-content-center text-center`}>
              <div className="col-md-4">
                <span id="count1" className={styles['counter']}></span>
                <p className={styles['counter-label']}>
                  تعداد پوزیشن <span className={styles['plus-sign']}>+</span>
                </p>
              </div>
              <div className="col-md-4">
                <span id="count2" className={styles['counter']}></span>
                <p className={styles['counter-label']}>
                  تعداد کاربران عادی <span className={styles['plus-sign']}>+</span>
                </p>
              </div>
              <div className="col-md-4">
                <span id="count3" className={styles['counter']}></span>
                <p className={styles['counter-label']}>
                  تعداد کاربران استارتاپ <span className={styles['plus-sign']}>+</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="slide-2" className={`${styles.slide} ${styles['slide-even']}`}>
          <img
            src={img4}
            className={styles['bg-img']}
            alt="Slide 2 Background"
          />
          <h2 className={styles['slide-title']}>pie chart</h2>
        </section>

        <section id="slide-3" className={`${styles.slide} ${styles['slide-even']}`}>
          <img
            src={img9}
            className={styles['bg-img']}
            alt="Slide 3 Background"
          />
          <BarChart />
        </section>

      </div>
    </>
  );
};

export default App;
