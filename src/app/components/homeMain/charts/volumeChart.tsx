"use client";
import React from "react";

// Redux
import { RootState } from "../../../state/store";
import { useSelector } from "react-redux";

// Chart Imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";

type TValue = number | string;
type TName = string;
interface CustomTooltipProps extends TooltipProps<TValue, TName> {
  active: any;
  payload: any;
  label: any;
}

const VolumeChart: React.FC<{
  data: { volume1: number; volume2: number; date: string }[];
}> = ({ data }) => {
  const comparedCoins = useSelector(
    (state: RootState) => state.compareCoins.comparedCoins,
  );

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border border-purple-muted-90 bg-light-purple p-2 shadow-lg">
          <p className="text-black dark:text-light-grey-chart-text">{`${label}`}</p>
          {payload.map((item: any) => (
            <p
              key={Math.random()}
              className="text-black dark:text-light-grey-chart-text"
            >
              {`${item.name}: ${item.value}`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white p-8 dark:bg-primary-purple">
      {data && data.length > 0 && !data[0].volume2 ? (
        <div className="flex h-1/3 w-full flex-col items-start justify-evenly">
          <div className="text-xl text-dark-blue-chart-bg dark:text-grey-nav-text">
            Volume
          </div>
          <div className="text-3xl text-black dark:text-white">
            $
            {data[data.length - 1] &&
              data[data.length - 1].volume1.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
          </div>
          <div className="text-sm text-dark-blue-chart-bg dark:text-light-grey-chart-text">
            {data[data.length - 1] && data[data.length - 1].date}, 2024
          </div>
        </div>
      ) : (
        <div className="flex h-1/3 w-full flex-col items-start justify-evenly">
          <div className="text-3xl text-black dark:text-white">Volume</div>
        </div>
      )}

      <div className="flex w-full flex-grow items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{
              right: 0,
              left: 0,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              tick={{ fontSize: 12 }}
              minTickGap={30}
              tickMargin={0}
              axisLine={false}
              interval={"preserveStartEnd"}
              allowDataOverflow
            />
            <YAxis hide={true} scale="log" domain={["auto", "auto"]} />
            <Tooltip
              content={CustomTooltip as any}
              cursor={{
                stroke: "#B374F",
                strokeWidth: 3,
              }}
            />
            <defs>
              <linearGradient id="colorBv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9D62D9" stopOpacity={1} />
                <stop offset="95%" stopColor="#B374F2" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7474F2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7474F2" stopOpacity={0} />
              </linearGradient>
            </defs>
            {data && data.length > 0 ? (
              !data[0].volume2 ? (
                <Bar
                  // I may need the commented out properties in the future for styling
                  //   type="monotone"
                  dataKey="volume1"
                  //   activeBar={{ stroke: "red", strokeWidth: 2 }}
                  //   fillOpacity={1}
                  //   activeBar={<Dot r={10} fill="white" stroke="black" />}
                  fill="url(#colorBv)"
                  //   activeDot={{ stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
                />
              ) : (
                <>
                  <Bar
                    //   type="monotone"
                    dataKey="volume1"
                    //   activeBar={{ stroke: "red", strokeWidth: 2 }}
                    //   fillOpacity={1}
                    //   activeBar={<Dot r={10} fill="white" stroke="black" />}
                    fill="url(#colorUv)"
                    //   activeDot={{ stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
                  />
                  <Bar
                    //   type="monotone"
                    dataKey="volume2"
                    //   activeBar={{ stroke: "red", strokeWidth: 2 }}
                    //   fillOpacity={1}
                    //   activeBar={<Dot r={10} fill="white" stroke="black" />}
                    fill="url(#colorBv)"
                    //   activeDot={{ stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
                  />
                  <Legend
                    align="center"
                    payload={[
                      {
                        value: `${(comparedCoins[0] as any).id} $${data[data.length - 1].volume1}`,
                        type: "line",
                        color: "#7474F2",
                      },
                      {
                        value: `${(comparedCoins[1] as any).id} $${data[data.length - 1].volume2}`,
                        type: "line",
                        color: "#9D62D9",
                      },
                    ]}
                  />
                </>
              )
            ) : (
              <div>is Loading...</div>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VolumeChart;
