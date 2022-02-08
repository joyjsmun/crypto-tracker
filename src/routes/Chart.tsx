import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
    // {
    //     refetchInterval:10000,
    // } 
    );
    const isDark = useRecoilValue(isDarkAtom);
  
    return <div>
        {isLoading ? ("Loading..") : 
    
        (<ApexChart 
            type="candlestick"
           series={[
               {
                data:data?.map(p => (
                    {
                        x: p.time_open,
                        y:[p.open,p.high,p.low,p.close]
                    }
                ))                  
               }
           ]}

        options={{
        theme:{
            mode: isDark ? "dark" : "light",
        },
        chart:{
            type:"candlestick",
            height: 600,
            width:600,
            toolbar:{
                show:false,
            },
            background: "transparent",
        },
        stroke: {
            curve:"smooth",
            width: 1,
        },
       yaxis:{
           show:true,
           labels:{
               formatter:(val) => {
                return val.toFixed(3);
              }
           }
       },
        tooltip:{
            y:{
               formatter:(value) => `${value.toFixed(2)}`, 
            },
           
                enabled: true
        },
        grid: {show:true},
        xaxis:{
            axisTicks:{show:false},
            labels:{show:true},
            axisBorder:{show:false},
            categories:data?.map(price => price.time_close),
            type:"datetime",
        },
       /*  fill: {
        type:"gradient",
        gradient:{gradientToColors:["#0be881"], stops:[0,100]}},
        colors:["#0fbcf9"], */
    }}

    />)
    }
    </div>
}

export default Chart;