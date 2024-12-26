import styles from "./CustomToast.module.scss";
function CustomToast({ Header, Message }) {
	return (
		<>
			<h1 className={styles.header}>{Header}</h1>
			<div className={styles.message}>{Message}</div>
		</>
	);
}

export default CustomToast;
