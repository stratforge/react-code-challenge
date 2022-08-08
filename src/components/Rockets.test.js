import { render, screen } from "@testing-library/react";
import { Provider} from "react-redux";
import store from '../redux/store'
import Rockets from "./Rockets";

//test block
test("Rockets component", () => {
// render the component on virtual dom
render(<Provider store={store}><Rockets /></Provider>);

//select the elements you want to interact with
const counter = screen.getByTestId("overview");
const para = screen.getByTestId("content");
const list = screen.getAllByTestId("list");
const details = screen.getByTestId("rightpanel");

expect(counter).toHaveTextContent("Rockets");
expect(list).toHaveLength(1);
expect(details).toHaveClass("rightPanel");
});