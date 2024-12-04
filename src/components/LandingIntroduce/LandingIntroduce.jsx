import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LandingIntroduce.module.scss';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Parallax effect on the header img
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

    // Gradually darken and blur the header img
    gsap.to(`.${styles.intro} .${styles['bg-img']}`, {
      filter: 'brightness(0.25) blur(16px)',
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.intro}`,
        start: 'center top',
        scrub: true,
      },
    });

    // The header title
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
          <img
            className={styles['greensock-icon']}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-trigger-logo-light.svg"
            alt="ScrollTrigger Logo"
            width="200"
            height="64"
          />
        </a>
      </header>

      <div className={styles.intro}>
        <div className={styles.visual}>
          <img
            src="https://images.unsplash.com/photo-1478766191016-3cb2df3122ef"
            className={styles['bg-img']}
            alt="Intro Background"
          />
        </div>
        <h1 className={styles.title}>Let's go for a ride</h1>
      </div>

      <div className={styles['slide-container']}>
        <section id="slide-1" className={`${styles.slide} ${styles['slide-odd']}`}>
          <img
            src="https://images.unsplash.com/photo-1530143584546-02191bc84eb5"
            className={styles['bg-img']}
            alt="Slide 1 Background"
          />
          <h2 className={styles['slide-title']}>slide 1</h2>
        </section>

        <section id="slide-2" className={`${styles.slide} ${styles['slide-even']}`}>
          <img
            src="https://images.unsplash.com/photo-1503669678209-c68d00b3765d"
            className={styles['bg-img']}
            alt="Slide 2 Background"
          />
          <h2 className={styles['slide-title']}>slide 2</h2>
        </section>

        <section id="slide-3" className={`${styles.slide} ${styles['slide-odd']}`}>
          <img
            src="https://images.unsplash.com/photo-1496147539180-13929f8aa03a"
            className={styles['bg-img']}
            alt="Slide 3 Background"
          />
          <h2 className={styles['slide-title']}>slide 3</h2>
        </section>

        <section id="slide-4" className={`${styles.slide} ${styles['slide-even']}`}>
          <img
            src="https://images.unsplash.com/photo-1497515098781-e965764ab601"
            className={styles['bg-img']}
            alt="Slide 4 Background"
          />
          <h2 className={styles['slide-title']}>slide 4</h2>
        </section>

        <div className={styles['slide-progress']}>
          <span className={styles['progress-thumb']} />
        </div>
      </div>

      <footer>
        <h2>THE END</h2>
      </footer>
    </>
  );
};

export default App;
