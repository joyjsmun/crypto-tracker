import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId:string;
}

interface IHistoricalData {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId}:ChartProps){
    const {isLoading,data} = useQuery<IHistoricalData[]>(["ohlcv",coinId], () => fetchCoinHistory(coinId),
    {
        refetchInterval:10000,
    } 
    );
  
    return <div>
        {isLoading ? ("Loading..") : 
    
        (<ApexChart 
            type="line"
        series={[
            {
                name: "Price",
                data : data?.map(price => price.close)
            },
         ]}
    options={{
        theme:{
            mode:"dark"
        },
        chart:{
            height: 300,
            width:500,
            toolbar:{
                show:false,
            },
            background: "transparent",
        },
        stroke: {
            curve:"smooth",
            width: 4,
        },
        tooltip:{
            y:{
               formatter:(value) => `${value.toFixed(2)}`, 
            }
        },
        yaxis:{
            show:false,
        },
        grid: {show:false},
        xaxis:{
            axisTicks:{show:false},
            labels:{show:false},
            axisBorder:{show:false},
            categories:data?.map(price => price.time_close),
            type:"datetime",
        },
        fill: {
        type:"gradient",
        gradient:{gradientToColors:["#0be881"], stops:[0,100]}},
        colors:["#0fbcf9"],
    }}
    />)
    }
    </div>
}

export default Chart;