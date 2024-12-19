import styles from "./Like.module.scss";
function Like({ className, active }) {
	return (
		<label className={`${styles.ui_like} ${className}`}>
			<input type="checkbox" />
			<div className={`${styles.like}`}>
				<svg viewBox="0 0 24 24" fill="" className={``}>
					<g className={styles.g} id="SVGRepo_bgCarrier"></g>
					<g id="SVGRepo_tracerCarrier"></g>
					<g id="SVGRepo_iconCarrier">
						<path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
					</g>
				</svg>
			</div>
		</label>
	);
}

export default Like;
