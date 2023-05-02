import { useCallback, useContext, useEffect, useState } from "react";
import read from "../shared/interface";
import launch from '../public/launch.jpg';
import { AppContext } from "../shared";
import Button from "../elements/Button";
import Input from "../elements/input";
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";

function Launches() {
    const theme = useContext(AppContext);
    const navigate = useNavigate();
    const [state, setState] = useState({
        totalCount: 0,
        launches: [],
        success: 0,
        failures: 0,
    });

    const updateState = (state) => {
        setState((prev) => ({ ...prev, ...state }));
    }

    useEffect(() => {
        bindLaunches('https://api.spacexdata.com/v3/launches', 'all');
        bindLaunches('https://api.spacexdata.com/v3/launches?launch_success=true', 'success');
    }, []);

    useEffect(() => {
        if (state.totalCount > 0) {
            updateState({ failures: state.totalCount - state.success });
        }
    }, [state.success, state.totalCount]);

    const bindLaunches = (url, type) => {
        read(url).then(res => {
            switch (type) {
                case 'all': {
                    updateState({
                        totalCount: res.length,
                        launches: res.slice(0, 10)
                    });
                    break;
                }
                case 'success': {
                    updateState({
                        success: res.length,
                    });
                    break;
                }
                case 'filter': {
                    updateState({
                        launches: res.slice(0, 10)
                    });
                    break;
                }
                default: {
                    updateState({
                        launches: res.slice(0, 10)
                    });
                    break;
                }
            }
        });
    }

    const onFilter = () => {
        let url = 'https://api.spacexdata.com/v3/launches';
        let ele = document.getElementById('searchRocket');

        if (ele && ele.value) {
            url += `?rocket_name=${ele.value}`;
        }

        bindLaunches(url, 'filter');
    }

    const onMoreDetails = (launch) => {
        navigate(`/rockets/${launch.rocket.rocket_id}`);
    }

    const filterMethod = useCallback(() => onFilter(), []);
    const moreDetails = useCallback((launch) => onMoreDetails(launch), []);

    return (
        <div className="launch">
            <div className="launch-header" style={{ backgroundImage: `url(${launch})` }}></div>
            <div className="launch-stats">
                <Stats total={state.totalCount} success={state.success} failures={state.failures} />
            </div>

            <div className="flex inherit-size launches">
                <div className="filters">
                    <Input placeholder='Search rocket' id='searchRocket' className='margin-x' />
                    <Button name='Search' callback={filterMethod} />
                </div>
                {state.launches.length ? state.launches.map((launch, index) => {
                    return (
                        <div key={`launch-${index}`} className="tile pos-relative">
                            <img src={launch.links.mission_patch_small} alt="Failed" className="white hide"></img>
                            <div className="tile-content">
                                <div className="title">
                                    <span style={{ color: theme.secondary }}>
                                        {launch.mission_name}({launch.rocket.rocket_name}) |
                                        <span style={{ color: launch.launch_success ? 'green' : 'red' }} className="font-small margin-x">{launch.launch_success ? 'Success' : 'Failure'}</span>
                                    </span>

                                    <Button name='More Details' callback={() => moreDetails(launch)} />
                                </div>
                                <div className="content">{launch.details}</div>
                                <div className="pos-bottom margin-x hide" style={{ color: theme.secondary }}>Year: {launch.launch_year} | site: {launch.launch_site.site_name} | Date: {launch.launch_date_utc}</div>
                            </div>
                        </div>
                    )
                }) : 'No records found'}
            </div>
        </div>
    )
}

export default Launches;