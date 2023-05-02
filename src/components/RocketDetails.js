import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import read from "../shared/interface";
import Stats from "./Stats";
import { AppContext } from "../shared";
import merlin from '../public/merlin.jpg';
import Button from "../elements/Button";

function RocketDetails() {
    const params = useParams();
    const theme = useContext(AppContext);
    const navigate = useNavigate();
    const [state, setState] = useState({});
    const [stats, setStats] = useState({});
    
    useEffect(() => {
        read(`https://api.spacexdata.com/v3/rockets/${params.id}`).then(res => {
            setState(res);
        });

        read(`https://api.spacexdata.com/v3/launches?rocket_id=${params.id}`).then(res => {
            let successful = res.filter(launch => launch.launch_success);
            setStats({
                total: res.length,
                success: successful.length,
                failures: res.length - successful.length
            });
        });
    }, [params.id]);

    const goBack = () => {
        navigate('/rockets');
    }

    const onBack = useCallback(() => goBack(), []);

    return (
        <div className="inherit-size flex overflow-auto">
            <div className="full-width text-end margin-x"><Button name='Back' callback={onBack} /></div>
            {Object.entries(state).length > 0 &&
                <>
                    <div className="rocket-info">
                        <div className="font-large text-center" style={{ color: theme.primary }}>{state.rocket_name}</div>
                        <div className="content">{state.description}</div>
                    </div>
                    <div className="rocket-stats">
                        {(Object.entries(stats).length > 0) ? <Stats total={stats.total} success={stats.success} failures={stats.failures} /> : ''}
                    </div>
                    <div className="widget">
                        <div className="full-width">
                            <div className="font-large">overview</div>
                            <div className="overview-item"><span>HEIGHT</span><span>{state.height.meters} M/{state.height.feet} FT</span></div>
                            <div className="overview-item"><span>DIAMETER</span><span>{state.diameter.meters} M/{state.diameter.feet} FT</span></div>
                            <div className="overview-item"><span>MASS</span><span>{state.mass.kg} KG/{state.mass.lb} LB</span></div>
                            <div className="overview-item">
                                <span>PAYLOAD TO LEO</span>
                                {state.payload_weights[0] && <span>{state.payload_weights[0].kg} KG/{state.payload_weights[0].lb} LB</span>}
                            </div>
                            <div className="overview-item">
                                <span>PAYLOAD TO GTO</span>
                                {state.payload_weights[1] && <span>{state.payload_weights[1].kg} KG/{state.payload_weights[1].lb} LB</span>}
                            </div>
                            <div className="overview-item">
                                <span>PAYLOAD TO MARS</span>
                                {state.payload_weights[2] && <span>{state.payload_weights[2].kg} KG/{state.payload_weights[2].lb} LB</span>}
                            </div>
                        </div>

                        <div className="engine-details">
                            <div className="font-large">ENGINE : {state.engines.type}({state.engines.version})</div>
                            <div className="space-between flex content">
                                <span>PROPELLANT 1</span>
                                <span>{state.engines.propellant_1}</span>
                            </div>
                            <div className="space-between flex content">
                                <span>PROPELLANT 2</span>
                                <span>{state.engines.propellant_2}</span>
                            </div>
                            <div className="space-between flex content">
                                <span>THRUST SEA LEVEL</span>
                                <span>{state.engines.thrust_sea_level.kN} kN / {state.engines.thrust_sea_level.lbf} lbf</span>
                            </div>
                            <div className="space-between flex content">
                                <span>THRUST VACUUM LEVEL</span>
                                <span>{state.engines.thrust_vacuum.kN} kN / {state.engines.thrust_vacuum.lbf} lbf</span>
                            </div>
                        </div>
                    </div>

                    <div className="widget hide">
                        <img src={merlin} alt="Nil" />
                    </div>                    
                </>
            }
        </div>
    )
}

export default RocketDetails;