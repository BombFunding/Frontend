import styles from "./CustomCard.module.scss";
function CustomCard() {
	return (
		<div className={styles.card}>
			<div className={styles.image_container}>
				<img
					src="/path-to-image.png"
					alt="Voltron RPG"
					className="card-image"
				/>
			</div>
			<div className={styles.card_content}>
				<h2 className={styles.card_title}>Voltron: The Roleplaying Game</h2>
				<p className={styles.card_subtitle}>Catalyst Games</p>
				<div className={styles.card_footer}>
					<p className={styles.time_left}>19 days left</p>
					<p className={styles.funding_status}>257% funded</p>
				</div>
			</div>
		</div>
	);
}

export default CustomCard;
