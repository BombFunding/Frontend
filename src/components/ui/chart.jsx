import React from "react";
import PropTypes from "prop-types";
import { Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

// ChartConfig for customizable chart configurations
export const ChartConfig = {
  tooltipStyle: "rounded-md bg-gray-800 text-white p-2 text-sm shadow-lg",
  containerClass: "w-full h-full flex justify-center items-center",
};

// ChartContainer for a responsive wrapper
export function ChartContainer({ children, className = "" }) {
  return (
    <div className={`${ChartConfig.containerClass} ${className}`}>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}

ChartContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// ChartTooltip for rendering a tooltip with styles
export function ChartTooltip({ content }) {
  return (
    <div className={ChartConfig.tooltipStyle}>
      {content || "No data available"}
    </div>
  );
}

ChartTooltip.propTypes = {
  content: PropTypes.node,
};

// ChartTooltipContent for handling custom tooltip data display
export function ChartTooltipContent({ payload }) {
  if (!payload || payload.length === 0) return null;

  return (
    <div>
      {payload.map((entry, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="font-bold">{entry.name}</span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

ChartTooltipContent.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};