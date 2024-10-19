import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import routeNames from "./constants/RouteNames";

import UserContext from "./context/UserContext";
import PrivateOutlet from "./components/PrivateOutlet";
import PublicOutlet from "./components/PublicOutlet";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

import App from "./App";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateJob from "./pages/CreateJob";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserContext>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route element={<PrivateOutlet />}>
						<Route path={routeNames.ROOT.path} element={<App />} index />
						<Route path={routeNames.COMPANY.path} element={<App />} />
						<Route
							path={routeNames.COMPANY.CHILDS.CREATE_JOB.path}
							element={<CreateJob />}
						/>
					</Route>

					<Route element={<PublicOutlet />}>
						<Route path={routeNames.REGISTER.name} element={<Register />} />
						<Route path={routeNames.LOGIN.name} element={<Login />} />
					</Route>

					<Route
						path={routeNames.VERIFY.path}
						element={
							<PrivateRoute>
								<Verify />
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</UserContext>
	</React.StrictMode>
);
