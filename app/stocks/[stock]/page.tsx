"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
export interface ComponentProps<Params, SearchParams = undefined> {
  params: Params;
  searchParams: SearchParams;
}

export type StockData = {
  date: string;
  close: number;
};

export default function Stock({ params }: ComponentProps<{ stock: string }>) {
  const [chartData, setChartData] = useState<ChartData<"line">>(
    {} as unknown as ChartData<"line">,
  );

  const [loading, setLoading] = useState(true);

  // To make configuration
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Close price",
        },
        display: true,
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
        display: true,
      },
    },
  };
  const codeStock = params.stock;
  const getStockDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.wallstreetoddsapi.com/api/historicstockprices?&symbol=${codeStock}&fields=symbol,date,close&apikey=qo5qju0kpt6r&format=json&sortBy=date&sortDir=asc`,
      );
      const data = await response.json();
      const historicalData = data?.response;
      console.log(historicalData);

      setChartData({
        labels: historicalData?.map((stock: StockData) => stock.date),
        datasets: [
          {
            // Title of Graph
            label: `Historical stock prices for ${codeStock}`,
            data: historicalData?.map((stock: StockData) => stock.close),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
      setLoading(false);
    } catch (error) {}
  }, []);
  useEffect(() => {
    getStockDetails();

    return () => {};
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container flex justify-center px-4 py-6 mt-20 h-96">
      <Line data={chartData} options={options} />
    </div>
  );
}
