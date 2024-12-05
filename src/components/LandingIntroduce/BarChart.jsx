import React, { useEffect } from 'react';
import styles from './BarChart.module.scss';

const BarChart = () => {
  // Define start and reset animation functions
  const startAnimation = () => {
    const blocks = document.querySelectorAll(`.${styles.block}`);
    blocks.forEach((block, index) => {
      const delay = index * 0.1; // Add a delay between blocks
      block.style.transition = `width 1s ${delay}s ease-out`;
      block.style.width = block.getAttribute('title');
    });
  };

  const resetAnimation = () => {
    const blocks = document.querySelectorAll(`.${styles.block}`);
    blocks.forEach((block) => {
      block.style.transition = 'none';
      block.style.width = '0';
    });
  };

  useEffect(() => {
    // Initial setup for bar widths and tooltips
    const values = document.querySelectorAll(`.${styles.value}`);
    values.forEach((value) => {
      const text = value.textContent;
      value.parentElement.setAttribute('title', text); // Store the percentage as title
      value.parentElement.style.width = '0'; // Set initial width to 0
    });

    const blocks = document.querySelectorAll(`.${styles.block}`);
    blocks.forEach((block) => {
      block.setAttribute('title', block.getAttribute('title'));
    });

  }, []);

  // Attach animation functions to the global scope for the ScrollTrigger
  useEffect(() => {
    window.BarChart = {
      startAnimation,
      resetAnimation,
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['description']}>
        <p>
          نمودار مربوط به توزیع کتگوری های مختلف استارتاپ های سایت
        </p>
      </div>

      <div className={styles['chart-wrapper']}>
        <figure>
          <div className={styles["y-axis"]}>
          </div>

          <div className={styles.graphic}>
            {/* Row 1 */}
            <div className={styles.row}>
              <h6>بیشترین لایک</h6>
              <div className={styles.chart}>
                <span className={styles.block} title="57%">
                  <span className={styles.value}>57%</span>
                </span>
                <span className={styles.block} title="13%">
                  <span className={styles.value}>13%</span>
                </span>
                <span className={styles.block} title="8%">
                  <span className={styles.value}>8%</span>
                </span>
                <span className={styles.block} title="2%">
                  <span className={styles.value}>2%</span>
                </span>
                <span className={styles.block} title="17%">
                  <span className={styles.value}>17%</span>
                </span>
                <span className={styles.block} title="3%">
                  <span className={styles.value}>3%</span>
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className={styles.row}>
              <h6>بیشترین درآمد</h6>
              <div className={styles.chart}>
                <span className={styles.block} title="29%">
                  <span className={styles.value}>29%</span>
                </span>
                <span className={styles.block} title="21%">
                  <span className={styles.value}>21%</span>
                </span>
                <span className={styles.block} title="19%">
                  <span className={styles.value}>19%</span>
                </span>
                <span className={styles.block} title="6%">
                  <span className={styles.value}>6%</span>
                </span>
                <span className={styles.block} title="19%">
                  <span className={styles.value}>19%</span>
                </span>
                <span className={styles.block} title="6%">
                  <span className={styles.value}>6%</span>
                </span>
              </div>
            </div>

          </div>

<div className={styles["x-axis"]}>
        <h3>دسته بندی</h3>
        <ul className={styles.legend}>
          <li>تکنولوژی</li>
          <li>غذایی</li>
          <li>هنری</li>
          <li>گردشگری</li>
          <li>آموزش</li>
          <li>مالی</li>
        </ul>
      </div>

      {/* Description section */}
      <div className={styles.descriptionBox}>
            <h1 className="font-bold text-3xl text-orange-400 mb-4">
            بمب فاندینگ بستری برای تمام حوزه ها
          </h1>
        <p className="text-lg mb-1.7">
      
              استارتاپ های این سایت در 6 دسته زیر قرار میگیرند:
            </p>
        <p className="text-xl font-bold mb-1.7">
            تکنولوژی،صنایع غذایی، هنری،صنعت گردشگری، آموزش، حوزه مالی

            </p>
        <p className="text-lg mb-1.7">
              بمب فاندینگ استارتاپ هایی از 7 دسته بندی مختلف را شامل میشود که در بخش فیلتر میتوانید محبوب ترین و بیشترین جذب سرمایه در آن دسته را مشاهده کنید<div className=""></div>
            </p>
        
      </div>
        </figure>
        
      </div>
    </div>
  );
};

export default BarChart;
