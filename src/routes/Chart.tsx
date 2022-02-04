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
    const {isLoading,data} = useQuery<IHistoricalData[]>(["ohlcv",coinId], () => fetchCoinHistory(coinId) )
    
    return <div>{isLoading ? ("Loading..") : 
    
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
        yaxis:{
            show:false,
        },
        grid: {show:false},
        xaxis:{
            axisTicks:{show:false},
            labels:{show:false},
            axisBorder:{show:false}
        },
        fill: {
        type:"gradient",
        gradient:{gradientToColors:["blue"]}},
        colors:["red"],
    }}
    />)
    }
    </div>
}

export default Chart;