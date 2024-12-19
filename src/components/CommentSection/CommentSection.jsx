import CustomComment from "./CustomComment/CustomComment";
import commentIcon from "../../assets/commentIcon.png";
import defaultpfp from "../../assets/defaultpfp.png";
import Comment from "../Comment/Comment";
function CommentSection() {
	return (
		<section className="border-solid p-[1.5vw] place-items-center">
			<h1 className="flex gap-[1vw] p-[2vw]">
				<img
					src={commentIcon}
					className="h-[2.75vw] place-self-center"
				/>
				<div className="h-[3vw] place-content-center">کامنت‌ها</div>
			</h1>
			<Comment />
			<CustomComment Comment="سلام لطفا تحلیل رو حذف کنید" Username="Ali_yasini" pfp={defaultpfp} />
			<CustomComment Comment="سلام لطفا هرچه زودتر تحلیل رو حذف کنید ممنون" Username="Amir_maghare" pfp={defaultpfp} />
			<CustomComment Comment="سلام لطفا هرچه زودتر تحلیل رو حذف کن" Username="nedaye_daroon" pfp={defaultpfp} />
			<CustomComment Comment="واقعا چرا تحلیل رو حذف نمیکنی؟" Username="nedaye_daroon" pfp={defaultpfp} />
			<CustomComment Comment="حذف کن ترم بعد عشق کنیم" Username="nedaye_daroon" pfp={defaultpfp} />
			<CustomComment Comment="نرمو بگو" Username="nedaye_daroon" pfp={defaultpfp} />
			<CustomComment Comment="نرمو چیکار کنیم" Username="nedaye_daroon" pfp={defaultpfp} />
		</section>
	);
}

export default CommentSection;
