import { useContext, useEffect, useState } from "react";
import read from "../shared/interface";
import { AppContext } from "../shared";
import rocket from '../public/history.png';
import wiki from '../public/wikipedia.png';
import Icon from "../elements/Icon";
import article from '../public/article.png';

function History() {
    const [state, setState] = useState([]);
    const theme = useContext(AppContext);

    useEffect(() => {
        let ignore = false;
        read('https://api.spacexdata.com/v4/history').then(res => {
            if (!ignore) {
                setState(res)
            };
        });

        return () => {
            ignore = true;
        }
    }, []);

    const onOpen = (link) => {
        window.open(link.links.article);
    }

    return (
        <div className="inherit-size overflow-auto bg-position" style={{ backgroundImage: `url(${rocket})` }}>
            {state.length && state.map((history, index) => {
                return (
                    <div className="card" key={`history-${index}`}>
                        <div className="title">
                            <span style={{ color: theme.secondary }}>{history.title}</span>                            
                        </div>
                        <div className="margin-x">{history.event_date_utc}</div>            
                        <div className="content">{history.details}</div>                        
                        <div className="footer">
                            <Icon callback={() => onOpen(history)} src={wiki} title='Click here' />
                            <Icon callback={() => onOpen(history)} src={article} title='Click here' />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default History;