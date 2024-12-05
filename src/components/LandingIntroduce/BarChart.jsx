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
    <figure>
      <div className={styles["y-axis"]}>
        <h3>Y-Axis Title</h3>
      </div>

      <div className={styles.graphic}>
        {/* Row 1 */}
        <div className={styles.row}>
          <h6>Bar One</h6>
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
          <h6>Bar Two</h6>
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

        {/* Row 3 */}
        <div className={styles.row}>
          <h6>Bar Three</h6>
          <div className={styles.chart}>
            <span className={styles.block} title="8%">
              <span className={styles.value}>8%</span>
            </span>
            <span className={styles.block} title="11%">
              <span className={styles.value}>11%</span>
            </span>
            <span className={styles.block} title="34%">
              <span className={styles.value}>34%</span>
            </span>
            <span className={styles.block} title="2%">
              <span className={styles.value}>2%</span>
            </span>
            <span className={styles.block} title="32%">
              <span className={styles.value}>32%</span>
            </span>
            <span className={styles.block} title="13%">
              <span className={styles.value}>13%</span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles["x-axis"]}>
        <h3>X-Axis Title</h3>
        <ul className={styles.legend}>
          <li>Category A</li>
          <li>Category B</li>
          <li>Category C</li>
          <li>Category D</li>
          <li>Category E</li>
          <li>Category F</li>
        </ul>
      </div>
    </figure>
  );
};

export default BarChart;
