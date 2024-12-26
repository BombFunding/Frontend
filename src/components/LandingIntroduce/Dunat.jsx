import React from "react";
import styles from './Dunat.module.scss';  // Import SCSS file

const data = [
  { name: 'standard', cost: 9, grad: '#0fcf7b, #0c9f30' },
  { name: 'standard', cost: 19, grad: '#f7256e, #cc0c48' },
  { name: 'premium', cost: 29, grad: '#f7ea1f, #f87d2c' }
];

const CardComponent = () => {
  const n = data.length;

  return (
    <div className={`${styles['reset-styles']} ${styles['custom-grid-container']}`} style={{ '--n': n }}>
      {data.map((c, i) => (
        <article
          key={i}
          className={styles['custom-card']}
          style={{ '--i': i, '--cost': c.cost, '--grad': c.grad }}
        >
          <header className={styles['custom-header']}>
            <h3 className={styles['custom-h3']} data-name={c.name}></h3>
          </header>
          <section className={styles['custom-section']}>
            <p>hi helloooo</p>
            <p>hi helloooo</p>
            <p>hi helloooo</p>
          </section>
        </article>
      ))}
    </div>
  );
};

export default CardComponent;
