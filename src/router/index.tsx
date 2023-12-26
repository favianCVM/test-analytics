import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../pages";

const router = createBrowserRouter([
	{
		path: "/:codedToken?",
		element: <HomePage />,
	},
]);

export default function Router() {
	return (
		<div className="bg-neutro-1 px-2.4 py-[67px] min-h-screen h-full relative flex flex-col">
			<RouterProvider router={router} />
		</div>
	);
}
