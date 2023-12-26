import React from "react";
import Iframe from "react-iframe";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import { ChartCard } from "../components/ChartCard";
import {
	Background,
	VictoryAxis,
	VictoryBar,
	VictoryBrushContainer,
	VictoryChart,
	VictoryGroup,
	VictoryLabel,
	VictoryPie,
	VictoryTooltip,
} from "victory";
import { COLORS } from "../constants/colors";
// import axios from "axios"

const getCurrentDimension = () => {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
};

const HomePage = () => {
	const { codedToken } = useParams();

	// State to track which iframes should be visible
	const [visibleIframes, setVisibleIframes] = React.useState<number>(2);
	const visibleIframesRef = React.useRef<number>(visibleIframes);
	const graphSize = getCurrentDimension().width - 40;
	const screenHeight = getCurrentDimension().height;

	const decodedToken = React.useMemo(
		() => Buffer.from(codedToken || "", "base64").toString("ascii"),
		[codedToken]
	);

	// const axiosInstance = React.useMemo(() => axios.create({
	// 	headers: {
	// 		Authorization: decodedToken
	// 	}
	// }), [decodedToken])

	// const updatePaymentMethodBreakdown = async () => {
	// 	try {
	// 		const paymentMethodBreakdownResponse = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/analytics/get-payment-method-breakdown`);

	// 		axiosInstance.post(`${process.env.REACT_APP_BACKEND_SERVICE_URL}`, paymentMethodBreakdownResponse)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// };

	// const updateBudgetVsExpenses = async () => {
	// 	try {
	// 		const budgetVsExpensesResponse = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/analytics/get-budget-vs-expenses`);

	// 		axiosInstance.post(`${process.env.REACT_APP_BACKEND_SERVICE_URL}`, budgetVsExpensesResponse)

	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// };

	// const handleUpdateInfo = async () => {
	// 	await updatePaymentMethodBreakdown();
	// 	await updateBudgetVsExpenses()
	// };

	// React.useEffect(() => {
	// 	handleUpdateInfo();
	// }, [decodedToken])

	const graphs = [
		"https://visualize.graphy.app/view/fabe5917-1b35-4187-bbb9-19238bffdd55",
		"https://visualize.graphy.app/view/bc6c859e-ffb0-4cec-aa07-2ab471d2b389",
		"https://visualize.graphy.app/view/c3d96568-64e0-40cf-b1d5-622026f5df71",
		"https://visualize.graphy.app/view/2e21faf2-635b-423d-b8e7-767b43175cb2",
		"https://visualize.graphy.app/view/3957e668-3303-4eae-ad22-8054f9b40fca",
		"https://visualize.graphy.app/view/bb7f7421-5b14-4705-8e39-e92f9064fd5f",
	];

	const handleScroll = () => {
		const position = window.scrollY;
		const tmp = Math.ceil((position + screenHeight - 300) / (graphSize + 10));
		if (tmp > visibleIframesRef.current) {
			setVisibleIframes(tmp);
			visibleIframesRef.current = tmp;
		}
	};

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		visibleIframesRef.current = visibleIframes;

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [visibleIframes]);

	const elements = graphs.map((graph, index) => (
		<div key={`graph-${index}-${graph}`} className="pb-[10px]">
			{/* {index < 2 || visibleIframes > index ? (
				<Iframe url={graph} width={`${graphSize}`} height={`${graphSize}`} />
			) : (
				<div
					style={{
						width: graphSize,
						height: graphSize,
						backgroundColor: "#000",
					}}
				/>
			)} */}
		</div>
	));

	const data = {
		names: [
			"restaurantes",
			"shopping",
			"servicios",
			"comida",
			"alquiler",
			"transporte",
			"test3",
		],
		spent: [405, 249, 890, 456, 650, 600, 45],
		budget: [760, 343, 245, 754, 700, 600, 800],
	};

	const data2 = [
		{ x: "debito", y: 15 },
		{ x: "credito", y: 15 },
		{ x: "efectivo", y: 70 },
	];

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-xl font-semibold mb-[30px]">Analíticas</h1>
			<ChartCard title="Gastos fijos por categoría
">
				<VictoryChart domainPadding={{ x: 40 }}>
					<VictoryBar
						barRatio={1}
						cornerRadius={5}
						// barWidth={60}
						style={{
							parent: { border: "5px solid black" },
							labels: { fill: "white", fontWeight: 600 },
							data: {
								fill: COLORS.tertiary,
							},
						}}
						labels={({ datum }) => datum.y}
						labelComponent={<VictoryLabel dy={25} />}
						data={[
							{ x: "cat1", y: 200 },
							{ x: "cat2", y: 500 },
							{ x: "cat3", y: 100 },
							{ x: "cat4", y: 566 },
							{ x: "cat5", y: 400 },
							{ x: "cat12", y: 190 },
							{ x: "cat6", y: 300 },
						]}
					/>
				</VictoryChart>
			</ChartCard>
			<ChartCard title="Gastos y presupuestos">
				<VictoryChart domainPadding={{ x: 40 }}>
					<VictoryGroup
						colorScale={[COLORS.primary4, COLORS.tertiary]}
						offset={10}
					>
						{[data.budget, data.spent].map((yData, dataIndex) => (
							<VictoryBar
								key={`chart-${yData[0]}-${yData[1]}`}
								barRatio={5}
								cornerRadius={5}
								barWidth={10}
								// labels={({ datum }) => datum.y}
								labelComponent={<VictoryTooltip />}
								style={{
									parent: { border: "5px solid black" },
									labels: { fill: COLORS.text1, fontWeight: 600, fontSize: 10 },
								}}
								data={data.names.map((name, index) => ({
									x: name,
									y: yData[index],
									label: `${dataIndex % 2 === 0 ? "presupuesto" : "gasto"}\n ${
										yData[index]
									}`,
								}))}
							/>
						))}
					</VictoryGroup>
					<VictoryAxis dependentAxis />
					<VictoryAxis
						style={{
							tickLabels: { angle: 20 },
						}}
					/>
				</VictoryChart>
			</ChartCard>
			<ChartCard title="Tipos de pago">
				<VictoryPie
					width={400}
					height={400}
					cornerRadius={5}
					colorScale={[COLORS.complementary1, COLORS.tertiary, COLORS.error1]}
					labelPlacement={"parallel"}
					labelPosition={"centroid"}
					labels={data2.map(({ x, y }) => `${x}-${y}%`)}
					data={data2}
					labelRadius={30}
					style={{
						labels: { fontSize: 15, fill: COLORS.text1, fontWeight: 600 },
					}}
				/>
			</ChartCard>
		</div>
	);
};

export default HomePage;
