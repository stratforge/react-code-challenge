import { render, screen } from "@testing-library/react";
import { Provider} from "react-redux";
import store from '../redux/store'
import Details from "./Details";

test("Details component", () => {
render(<Provider store={store}><Details /></Provider>);

//select the elements you want to interact with
const details = screen.getByTestId("details");
expect(details).toHaveClass("noClass");
});