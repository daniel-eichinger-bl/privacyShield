import React, { useEffect, useState } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryTheme } from 'victory';

const BarChart = (props) => {
    const trafficData = props.trafficData;
    const [hourStats, setHourStats] = useState([])

    const getEmptyStatObject = () => {
        const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        const stats = []
        for (const hour of hours) {
            stats.push({ x: hour, y: 0 })
        }
        return stats;
    }

    // UnixTimestamp in Db, thats why *1000
    useEffect(() => {
        let stats = getEmptyStatObject();
        for (const d of trafficData) {
            const hour = new Date(d.timestamp*1000).getHours();
            stats[hour].y = stats[hour].y + 1;
        }
        setHourStats(stats);
    }, [trafficData])

    return (
        <div>
            <h5>Connection Request Occurrence by hour</h5>
            <VictoryChart domainPadding={20} width={1000} theme={VictoryTheme.material} animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
            }}>

                <VictoryAxis
                    tickValues={hourStats.map((stat) => stat.x)}
                    tickFormat={(x) => { return x.toFixed(0).toString(); }}
                    style={{
                        tickLabels: { fontSize: 13, padding: 5, fill: "#fff" },
                        axisLabel: { fontSize: 13, padding: 30, fill: "#fff" }
                    }}
                    label="Hour - 0 am to 23 pm "
                />
                <VictoryAxis dependentAxis
                    tickFormat={(x) => { return x.toFixed(0).toString(); }}
                    style={{
                        tickLabels: { fontSize: 14, padding: 5, fill: "#fff" },
                        axisLabel: { fontSize: 13, padding: 30, fill: "#fff" }
                    }}
                    label="Requests"
                />

                <VictoryBar
                    style={{ data: { fill: "#dc3545" } }}
                    barWidth={5}
                    data={hourStats}
                    labelComponent={<VictoryTooltip />}
                    labels={(obj) => {
                        let flag = "pm";
                        if (obj.x >= 0 && obj.x < 12) {
                            flag = "am"
                        }

                        return `time: ${obj.x} ${flag} - requests: ${obj.y}`
                    }}
                ></VictoryBar>
            </VictoryChart>
        </div>
    )
}

export default BarChart
