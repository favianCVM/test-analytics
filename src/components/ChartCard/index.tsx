import React from "react";
import "./index.css";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from "victory";
import { COLORS } from "../../constants/colors";

interface IChartCard {
	title: string;
	children?: JSX.Element;
}

const ChartCard = React.memo(({ title, children }: IChartCard) => {
	return (
		<div className="rounded-md bg-primary-2 w-[90%] xl:max-w-[30%] min-h-[400px] pb-[30px] pt-[40px] my-4 overflow-x-auto flex flex-col items-center shadow-xl">
			<h2 className="text-lg font-semibold bg-neutral-50 p-2 rounded-md shadow-sm">
				{title}
			</h2>
			{children}
		</div>
	);
});

export { ChartCard };
