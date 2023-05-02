import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../shared";

function LinkRoute({
    to,
    name
}) {
    const location = useLocation();
    const theme = useContext(AppContext);

    const isSelected = () => {
        if (to === '/' ) {
            return location.pathname === to ? theme.primary : 'inherit';
        } else {
            return location.pathname.includes(to) ? theme.primary : 'inherit';
        }
    }

    return <Link
        to={to}
        style={{
            color: isSelected(),
            textDecoration: 'inherit'
        }}
    >{name}</Link>;
}

export default LinkRoute;