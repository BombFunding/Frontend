import { Button } from "../ui/button";

const CustomButton = ({ className, children }) => {
	return (
		<Button
			className={`text-right ease-in duration-200 bg-bomborange hover:text-bomborange rounded-full focus-visible:ring-0 ${className}`}
		>
			{children}
		</Button>
	);
};

export default CustomButton;
