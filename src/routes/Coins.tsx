import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";


const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    max-width:480px;
`;

const Header = styled.header`
height: 10vh;
display:flex;
justify-content:center;
align-items:center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    margin-bottom:10px;
    
    border-radius:15px;
    border: 1px solid white;

    a{
        padding:20px;
        transition: color 0.2s ease-in;
        display:flex;
        align-items:center;
    }

    &:hover {
        a{
            color:${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size:48px;
    color:${(props) => props.theme.accentColor};
    padding-bottom:30px;
`

const Loader = styled.span`
    text-align:center;
    display:block;
    font-size:40px;
    `

const Img = styled.img`
    width: 35px;
    height:35px;
    margin-right:5px;
`


interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank : number,
    is_new: boolean,
    is_active:boolean,
    type:string

}


function Coins(){
    const {isLoading,data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    /* const [coins,setCoins] = useState<CoinInterface[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        (async() => {
    
        setCoins(json.slice(0,100));
        setLoading(false);
        })();
    },[]); */
  
    return (
        <Container>
             <Helmet>
            <title>Coin List</title>
        </Helmet>
            <Header>
                <Title>Coin List</Title>
            </Header>
           {isLoading ? (
               <Loader>✈️</Loader>
               ) : (
                <CoinList>
                {data?.slice(0,100).map((coin) => (<Coin key={coin.id}>
                    <Link to={{
                        pathname:`/${coin.id}`,
                        state:{name: coin.name},
                        
                    }}> 
                           <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />{coin.name} &rarr;         
                    </Link>
                </Coin>
                ))}
            </CoinList>
               )} 
        </Container>
    )
}

export default Coins;