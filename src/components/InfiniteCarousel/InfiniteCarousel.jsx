import styles from "./InfiniteCarousel.module.scss";
import { useNavigate } from "react-router-dom";

const InfiniteCarousel = ({ items, children }) => {
	const Navigate = useNavigate();
	return (
		<div className={styles.container}>
			<div className={styles.slider}>
				<div className={styles.slide_track}>
					{items.concat(items).map((item, index) => (
						<div
							className={styles.slide}
							key={index}
							onClick={() =>
								Navigate(`/profile/${item.username}`)
							}
						>
							<img
								src={`http://localhost:8000/${item.profile_picture}`}
								className={styles.image}
								alt=""
							/>
							<p className={styles.text}>{item.username}</p>
						</div>
					))}
					{/* {children.concat(children).map((item, index) => {
						<div className={styles.slide} key={index}>
							<img src={item} className={styles.image} alt="" />
							<p className={styles.text}>nigga{index}</p>
						</div>;
					})} */}
				</div>
			</div>
		</div>
	);
};

export default InfiniteCarousel;
