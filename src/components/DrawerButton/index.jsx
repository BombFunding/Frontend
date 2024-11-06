import styles from "./DrawerButton.module.scss";

function DrawerButton({ onClick, classNames, children }) {
	return (
		<button
			type="submit"
			className={`${styles.login} mt-6 ${classNames}`}
			onClick={(e) => onClick(e)}
		>
			<span className={styles.circle} aria-hidden>
				<span className={`${styles.icon} ${styles.arrow}`}></span>
			</span>
			<span className={`${styles.button_text} font-vazirmatn`}>
				{children}
			</span>
		</button>
	);
}

export default DrawerButton;