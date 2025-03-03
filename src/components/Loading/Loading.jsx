import styles from "./Loading.module.scss";

export const Loading = ({ className, size = 10 }) => {
	return (
		<>
			<div
				className={`${className} place-self-center place-content-center place-items-center`}
			>
				<svg
					style={{ width: `${size}em`, height: `${size}em` }}
					// className={styles.pl}
					viewBox="0 0 176 160"
					width="176px"
					height="160px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient
							id="pl-grad"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop offset="0%" stopColor="hsl(33,90%,55%)" />
							<stop offset="30%" stopColor="hsl(33,90%,55%)" />
							<stop offset="100%" stopColor="hsl(3,90%,55%)" />
						</linearGradient>
					</defs>
					<g fill="none" strokeWidth="16" strokeLinecap="round">
						<circle
							className={styles.pl__ring}
							r="56"
							cx="88"
							cy="96"
							stroke="hsla(0,10%,10%,0.1)"
						/>
						<path
							className={styles.pl__worm1}
							d="M144,96A56,56,0,0,1,32,96"
							stroke="url(#pl-grad)"
							strokeDasharray="43.98 307.87"
						/>
						<path
							className={styles.pl__worm2}
							d="M32,136V96s-.275-25.725,14-40"
							stroke="hsl(33,90%,55%)"
							strokeDasharray="0 40 0 44"
							strokeDashoffset="0.001"
							visibility="hidden"
						/>
						<path
							className={styles.pl__worm3}
							d="M144,136V96s.275-25.725-14-40"
							stroke="hsl(33,90%,55%)"
							strokeDasharray="0 40 0 44"
							strokeDashoffset="0.001"
							visibility="hidden"
						/>
					</g>
				</svg>
			</div>
		</>
	);
};
