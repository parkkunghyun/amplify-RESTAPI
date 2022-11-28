import React, {useState, useEffect} from "react";
import {API} from 'aws-amplify'


function App() {
  const [input,updateInput]= useState({limit:5, start:0})
  const [coins, updateCoins] = useState([])

  async function fetchCoins() {
    const {limit, start} = input
    const data = await API.get('cryptonewapi',`/coins?start=${start}&limit=${limit}`)
    updateCoins(data.coins)
  }

  function updateInputValue(type,value) {
    updateInput({...input,[type]: value})
  }

  useEffect(()=> {
    fetchCoins()
  })

  return (
    <div className="App">
      <input onChange={e=> updateInputValue('limit', e.target.value)} placeholder='limit' />
      <input onChange={e=> updateInputValue('start', e.target.value)} placeholder='start' />
      <button onClick={fetchCoins}>fetchCoins</button>
      {
        coins.map((coin,idx)=> (
          <div key={idx}>
            <h2>{coin.name}</h2>
            <span>{coin.symbol}</span>
            <span>{coin.price_usd}</span>
          </div>
        ))
      }
    </div>
  );
}

export default App;
