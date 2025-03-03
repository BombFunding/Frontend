import styles from "./Error404.module.scss";
const Error404 = () => {
  return (
    <>
      <div className={`w-screen h-[88vh] mt-12 sm:mt-24 bg-bomborange`}>
        <div className={styles.top}>
          <h1 className={styles.error404}>404</h1>
          <h3 className={styles.notfound}>صفحه پیدا نشد</h3>
        </div>
        <div className={styles.container}>
          <div className={styles.ghost_copy}>
            <div className={styles.one}></div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
            <div className={styles.four}></div>
          </div>
          <div className={styles.ghost}>
            <div className={styles.face}>
              <div className={styles.eye}></div>
              <div className={styles.eye_right}></div>
              <div className={styles.mouth}></div>
            </div>
          </div>
          <div className={styles.shadow}></div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.text}>به نظر میاد یه روح این صفحه رو دزدیده</p>
        </div>
      </div>
    </>
  );
};

export default Error404;
