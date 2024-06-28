"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Stock = {
  symbol: string;
  price: number;
  percentchange: number;
};
export type StockResponse = {
  response: Stock[];
};
export default function Stocks() {
  const [stocks, setStocks] = useState<StockResponse>(
    [] as unknown as StockResponse,
  );
  const router = useRouter();
  const getStocksList = async () => {
    try {
      const response = await fetch(
        "https://www.wallstreetoddsapi.com/api/livestockprices?&apikey=qo5qju0kpt6r&fields=symbol,price,percentChange&format=json&symbols=GTBP,ICLO,YI,NMZ,IRTC,UTF,GEHC,OPBK",
      );
      const data = await response.json();
      setStocks(data);
    } catch (error) {}
  };
  useEffect(() => {
    getStocksList();

    return () => {};
  }, []);

  return (
    <div>
      <h1>Stocks</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
            {stocks?.response?.map((stock, index) => (
              <tr
                key={stock.symbol}
                className="hover"
                onClick={() => router.push(`/stocks/${stock.symbol}`)}
              >
                <th>{index + 1}</th>
                <td>{stock.symbol}</td>
                <td>{stock.price}</td>
                <td>{stock.percentchange}</td>
              </tr>
            ))}
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
