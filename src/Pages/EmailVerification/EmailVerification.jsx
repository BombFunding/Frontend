import styles from './EmailVerification.module.scss'
import logo from "../../assets/logo.png";
function EmailVerification() {
	return <div className={styles.page}>
        <div className={styles.container}>
            <img src={logo} className='w-1/4 mix-blend-multiply'/>
            <h1 className='font-extrabold text-2xl'>ایمیل خود را بررسی کنید</h1>
            <p>ما ایمیلی برای شما ارسال کردیم. بر روی لینک درون ایمیل کلیک کنید تا حساب کاربری شما تایید شود.</p>
            <button>بازگشت به لاگین</button>
            <button>تغییر ایمیل</button>
        </div>
    </div>;
}

export default EmailVerification;
