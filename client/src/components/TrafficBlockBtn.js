import React, {useState} from 'react'
import { Button, Spinner} from 'reactstrap';

const TrafficBlockBtn = (props) => {
    var {mac, blocked, ip} = props;

    const [trafficBlocked, setTrafficBlocked] = useState(blocked === 0 ? false : true);
    const [isLoading, setIsLoading] = useState(false);

    const handleTrafficBlock = () => {
        setIsLoading(true);
        setTrafficBlocked(!trafficBlocked);
        blocked = trafficBlocked;

        fetch('/api/devices/block', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mac, blocked, ip })
        })
            .then(res => { if (res.status === 200) { return res.json(); } })
            .then(data => {
                if (data) {
                    setIsLoading(false);
                }
            });
    }

    return (
        <div>
            {!isLoading ?
                <Button id="blockTrafficBtn" color={trafficBlocked ? "danger" : "success"} onClick={handleTrafficBlock}>
                    {trafficBlocked ? "Block Traffic" : "Enable Traffic"}
                </Button>
                :
                <Spinner color="danger"></Spinner>
            }
        </div>
    )
}

export default TrafficBlockBtn
