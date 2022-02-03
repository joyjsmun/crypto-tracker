import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

    


interface RouteParams {
    coinId:string
}

interface RouteState {
    name:string
}


function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
  
    return <Container>
    <Header>
        <Title>{state?.name|| "Loading..."}</Title>
    </Header>
   {loading ? (
       <Loader>✈️</Loader>
       ) : null } </Container>;
}
    

export default Coin;