import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import History from "./components/History";
import Launches from "./components/Launches";
import Rockets from "./components/Rockets";
import RocketDetails from "./components/RocketDetails";

function AppRouter() {
	return (
		<Routes>			
			<Route exact path="/" element={<Home />} />
			<Route exact path="/history" element={<History />} />
			<Route exact path="/launches" element={<Launches />} />
			<Route exact path="/rockets" element={<Rockets />} />
			<Route exact path="/rockets/:id" element={<RocketDetails />}/>
		</Routes>
	)
}

export default AppRouter;