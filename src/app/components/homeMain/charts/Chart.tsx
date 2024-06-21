"use client";
import React, { useEffect } from "react";

// Redux
import { RootState } from "../../../state/store";
import { useSelector } from "react-redux";

// Chart Imports
import {
  AreaChart,
  Area,
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

const ChartContent: React.FC<{
  data: { price1: number; price2: number; date: string }[];
}> = ({ data }) => {
  const currentCoinAbv = useSelector(
    (state: RootState) => state.currentCoin.currentCoinAbv,
  );
  const coinId = useSelector((state: RootState) => state.currentCoin.coinId);
  const coinComparison = useSelector(
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

  useEffect(() => {}, [coinId]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white p-8 dark:bg-dark-blue-chart-bg">
      {data && data.length > 0 && !data[0].price2 ? (
        <div className="flex h-1/3 w-full flex-col items-start justify-evenly">
          <div className="text-xl text-dark-blue-chart-bg dark:text-grey-nav-text">
            {coinId.charAt(0).toUpperCase() + coinId.slice(1)}{" "}
            {`(${currentCoinAbv})`}
          </div>
          <div className="text-3xl text-black dark:text-white">
            $
            {data[data.length - 1] &&
              data[data.length - 1].price1.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
          </div>
          <div className="text-sm text-dark-blue-chart-bg dark:text-light-grey-chart-text">
            {data[data.length - 1] && data[data.length - 1].date}, 2024
          </div>
        </div>
      ) : (
        <div className="flex h-1/3 w-full flex-col items-start justify-evenly">
          <div className="text-3xl text-black dark:text-white">
            {data[data.length - 1] && data[data.length - 1].date}, 2024
          </div>
        </div>
      )}

      <div className="flex w-full flex-grow items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              right: 0,
              left: 0,
            }}
          >
            {/* <CartesianGrid /> */}
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
                stroke: "#8884d8",
                strokeWidth: 2,
                strokeDasharray: "3 3",
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
              !data[0].price2 ? (
                <Area
                  type="monotone"
                  dataKey="price1"
                  stroke="#7474F2"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  // activeDot={{ stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
                />
              ) : (
                <>
                  <Area
                    type="monotone"
                    dataKey="price1"
                    stroke="#7474F2"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    // activeDot={{ stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price2"
                    stroke="#B374F2"
                    fillOpacity={1}
                    fill="url(#colorBv)"
                    // activeDot={{ stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
                  />
                  <Legend
                    align="center"
                    payload={[
                      {
                        value: `${(coinComparison[0] as any).id} $${data[data.length - 1].price1}`,
                        type: "line",
                        color: "#7474F2",
                      },
                      {
                        value: `${(coinComparison[1] as any).id} $${data[data.length - 1].price2}`,
                        type: "line",
                        color: "#9D62D9",
                      },
                    ]}
                  />
                </>
              )
            ) : (
              <div>Loading...</div>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContent;
