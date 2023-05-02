import { useEffect, useState } from 'react';
import space from '../public/space.jpg';
import read from '../shared/interface';

function Home() {
    const [state, setState] = useState({
        info: {},
        upcomingLaunches: [],
        nextLaunch: {},
    });

    const updateState = (state) => {
        setState((prev) => ({ ...prev, ...state }));
    }

    useEffect(() => {
        read('https://api.spacexdata.com/v3/info').then(res => {
            updateState({ info: res });
        });

        read('https://api.spacexdata.com/v3/launches/upcoming').then(res => {
            updateState({ upcomingLaunches: res });
        });

        read('https://api.spacexdata.com/v3/launches/next').then(res => {
            updateState({ nextLaunch: res });
        });
    }, []);

    return (
        <div className="inherit-size flex overflow-auto" style={{ backgroundImage: `url(${space})` }}>
            {(Object.entries(state.info).length > 0 && state.upcomingLaunches.length) ?
                <>
                    <div className='center-align content half-width'>
                        <div>
                            <div>{state.info.summary}</div>
                            <div>
                                <span className='margin-x'>Vehicles: <span className='font-large'>{state.info.vehicles}</span></span>
                                <span className='margin-x'>Launch Sites: <span className='font-large'>{state.info.launch_sites}</span></span>
                            </div>
                        </div>
                    </div>
                    <div className='widget'>
                        <div className='content margin-top-50'>Upcoming launches</div>
                        <div className='upcoming-launches'>
                            {state.upcomingLaunches.map((launch, index) => {
                                return (
                                    <div key={`info-${index}`} className='border-bottom'>
                                        <div className='space-between flex content'>
                                            <span>Flight Number: {launch.flight_number}</span>
                                            <span>Misson Name: {launch.mission_name}</span>
                                        </div>
                                        <div className='space-between flex content'>
                                            <span>Rocket: {launch.rocket.rocket_name}</span>
                                            <span>Rocket Type Name: {launch.rocket.rocket_type}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='content margin-top-50'>Next Launch</div>
                        <div className='upcoming-launches'>
                            <div className='space-between flex content'>
                                <span>Flight Number: {state.nextLaunch && state.nextLaunch.flight_number}</span>
                                <span>Misson Name: {state.nextLaunch && state.nextLaunch.mission_name}</span>
                            </div>
                            <div className='space-between flex content'>
                                <span>Rocket: {state.nextLaunch && state.nextLaunch.rocket && state.nextLaunch.rocket.rocket_name}</span>
                                <span>Rocket Type: {state.nextLaunch && state.nextLaunch.rocket && state.nextLaunch.rocket.rocket_type}</span>
                            </div>
                        </div>
                    </div>
                </> : ''
            }
        </div>
    )
}

export default Home;