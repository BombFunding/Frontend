import styles from "./EmailVerification.module.scss";
import logo from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
function EmailVerification() {
	const Navigate = useNavigate();
	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<img src={logo} className={styles.logo} />
				<h1 className={styles.bold_text}>ایمیل خود را بررسی کنید</h1>
				<p className={styles.text}>
					ایمیلی برای شما ارسال شد بر روی لینک درون ایمیل کلیک کنید تا
					حساب کاربری شما تایید شود
				</p>
				<button
					className={styles.return_button}
					onClick={(e) => {
						window.scrollTo(0, 0);
						Navigate("/login");
					}}
				>
					بازگشت به لاگین
				</button>
				<button
					className={styles.edit_button}
					onClick={(e) => {
						window.scrollTo(0, 0);
						Navigate(-1);
					}}
				>
					تغییر ایمیل
				</button>
			</div>
		</div>
	);
}

export default EmailVerification;
