import { render, screen } from "@testing-library/react";
import { Provider} from "react-redux";
import store from '../redux/store'
import Launches from "./Launches";

//test block
test("Launches component", () => {
// render the component on virtual dom
render(<Provider store={store}><Launches /></Provider>);

//select the elements you want to interact with
const counter = screen.getByTestId("overview");
const para = screen.getByTestId("content");
const list = screen.getAllByTestId("list");
const details = screen.getByTestId("rightpanel");

expect(counter).toHaveTextContent("Overview");
expect(list).toHaveLength(1);
expect(details).toHaveClass("rightPanel");
});