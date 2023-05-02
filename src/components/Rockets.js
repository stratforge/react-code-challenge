import { useEffect, useState } from "react";
import read from "../shared/interface";
import { useNavigate } from "react-router-dom";

function Rockets() {
    const [state, setState] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;
        read('https://api.spacexdata.com/v3/rockets').then(res => {
            if (!ignore) {
                setState(res)
            };
        });

        return () => {
            ignore = true
        }
    }, []);

    const openRocket = (name) => {
        navigate(`/rockets/${name}`);
    }

    return (
        <div className="inherit-size flex">
            {
                state.length && state.map((rocket, index) => {
                    return (
                        <div key={`rocket-${index}`} className="rocket" onClick={() => openRocket(rocket.rocket_id)}>
                            {rocket.rocket_name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Rockets;