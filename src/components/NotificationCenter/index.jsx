import React, { useState, useEffect } from "react";
import "./NotificationCenter.css";
import errorIcon from "../../assets/errorIcon.png";

// Helper to generate random notification messages
const getNotificationMessages = () => [
	{
		icon: "error",
		title: "Oh No",
		subtitle: "Something really bad happened.",
		actions: ["Close"],
	},
	{ icon: "success", title: "Changes Saved", actions: ["OK"] },
	{
		icon: "warning",
		title: "Reminder",
		subtitle: "You will receive more notifications.",
		actions: ["Close"],
	},
	// Add more messages here as needed
];

export const Notification = ({
	id,
	icon,
	title,
	subtitles,
	actions,
	onDismiss,
}) => (
	<div className="notification">
		<div className="notification__box">
			<div className="notification__content">
				<div className="notification__icon">
					<img
						aria-label={icon}
						src={errorIcon}
					/>
				</div>
				<div className="notification__text">
					<div className="notification__text-title">{title}</div>
					{subtitles &&
						subtitles.map((subtitle) => (
							<div
								className="notification__text-subtitle"
								key={subtitle}
							>
								{subtitle}
							</div>
						))}
				</div>
			</div>
			<div className="notification__btns">
				{actions?.map((action) => (
					<button
						key={id}
						type="button"
						className="notification__btn"
						onClick={() => onDismiss(id)}
					>
						<span className="notification__btn-text">{action}</span>
					</button>
				))}
			</div>
		</div>
	</div>
);
