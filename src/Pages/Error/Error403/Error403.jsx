import styles from "./Error403.module.scss";
const Error403 = () => {
    return (
        <>
            <div className="w-[100vw] h-[88vh] mt-[12vh] bg-bomborange">
                <div className={styles.top}>
                    <h1 className={styles.error404}>403</h1>
                    <h3 className={styles.notfound}>شما اجازه دسترسی به این صفحه را ندارید</h3>
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
                    <p className={styles.text}>
                        به نظر میاد این صفحه متعلق به یه روح دیگه‌ست
                    </p>
                </div>
            </div>
        </>
    );
};

export default Error403;
