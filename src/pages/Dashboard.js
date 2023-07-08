import React from "react";

import { Link } from "react-router-dom";
import Button from "../todolistComponents/Button";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import data from "../../electron/appUsageData.json";

export default function Dashboard() {
  const convertedData = Object.entries(data["Desktop-Dashboard"]).map(
    ([application, count]) => ({
      application,
      count,
    })
  );
  return (
    <div>
      <h1>Dashboard</h1>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        height={300}
        width={400}
      >
        <VictoryAxis
          tickFormat={(x) => `App ${x}`}
          style={{
            tickLabels: { fontSize: 8, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x}`}
          style={{
            tickLabels: { fontSize: 8, padding: 5 },
          }}
        />
        <VictoryBar
          data={convertedData}
          x="application"
          y="count"
          style={{
            data: { fill: "#69b3a2" },
          }}
        />
      </VictoryChart>
    </div>
  );
}
