import { useQuery } from "react-query";
import styled from "styled-components";
import {fetchPriceHistory} from "../api";


interface PriceProps{
    coinId:string
}

interface PriceData{

    id:string ;
    name:string ;
    symbol:string ;
    rank:number ;
    circulating_supply:number ;
    total_supply:number ;
    max_supply:number ;
    beta_value:number ;
    first_data_at:string ;
    last_updated:string ;
    quotes: {
        USD:{
            ath_date: string;
            ath_price:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_1h:number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_change_12h:number;
            percent_change_15m:number;
            percent_change_24h:number;
            percent_change_30d:number;
            percent_change_30m:number;
            percent_from_price_ath:number;
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
        }
    } ;
}

const PriceTabs = styled.div`
    display: grid;
`

const PriceTab = styled.div`
    font-size: 16px;
    border: none;
    color: ${(props) => props.theme.textColor};
    padding:20px;
    margin: 10px 0px;
    border: 1px solid white;
    border-radius: 4px;
    background-color:${(props) => props.theme.accentColor};
`

function Price({coinId}:PriceProps){
    const {isLoading, data:tickerData} = useQuery<PriceData>(["priceTag",coinId],() => fetchPriceHistory(coinId));
    
    
    console.log(tickerData?.quotes.USD.percent_change_1h)
    return (<div>
       {isLoading ? ("Loading..." 
       ) : (
       <PriceTabs>
           <PriceTab>Percent Change 15 mins : {tickerData?.quotes.USD.percent_change_15m} %</PriceTab>
           <PriceTab>Percent Change 30 mins : {tickerData?.quotes.USD.percent_change_30m} %</PriceTab>
           <PriceTab>Percent Change 1 hr : {tickerData?.quotes.USD.percent_change_1h} %</PriceTab>
           <PriceTab>Percent Change 6 hr : {tickerData?.quotes.USD.percent_change_6h} %</PriceTab>
           <PriceTab>Percent Change 24 hr : {tickerData?.quotes.USD.percent_change_24h} %</PriceTab>
           <PriceTab>Percent Change 7 days : {tickerData?.quotes.USD.percent_change_7d} %</PriceTab>
           </PriceTabs>)}
       </div>)
}

export default Price;


