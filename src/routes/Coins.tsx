import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


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
    background-color:white;
    color:${(props) => props.theme.bgColor};
    margin-bottom:10px;
    
    border-radius:5px;
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


interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank : number,
    is_new: boolean,
    is_active:boolean,
    type:string

}


function Coins(){
    const [coins,setCoins] = useState<CoinInterface[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        (async() => {
        const response = await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await response.json();
        setCoins(json.slice(0,100));
        setLoading(false);
        })();
    },[])
    console.log(coins);
    return (
        <Container>
            <Header>
                <Title>Coin List</Title>
            </Header>
           {loading ? (
               <Loader>✈️</Loader>
               ) : (
                <CoinList>
                {coins.map((coin) => (<Coin key={coin.id}>
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