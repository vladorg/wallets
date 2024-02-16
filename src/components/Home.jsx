import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

export const Home = () => {
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [wallet, setWallet] = useState(null);  
  const [balance, setBalance] = useState(null);  
  const [holders, setHolders] = useState(null);  
  const [isHolder, setIsHolder] = useState(null);  
  
  const connect = async () => {
    try {
      const [ req ] = await sdk?.connect();
      setWallet(req);    
       
    } catch(err) {
      console.warn("failed to connect..", err);
    }
  };

  const checkBalance = async () => {
    try {
      const req = await window.ethereum.request({        
        method: "eth_getBalance",              
        params: [wallet, "latest"],       
      });
      const parsed = parseInt(req) / Math.pow(10, 18);
      setBalance(parsed);    
      console.log(parsed);
      

    } catch(err) {
      console.warn(err);      
    }
  }

  const getHolders = async () => {
    try {
      const req = await fetch('/holders.json');
      const holders = await req.json();
      console.log(holders);      

      setHolders(holders);
    } catch(err) {
      console.warn(err);      
    }    
  }

  const checkMyWallet = () => {
    //const [holder] = holders.filter((el) => el.wallet == '0x7CA66E034fd5f2390d5438395817e705Bce4C812' );
    const [holder] = holders.filter((el) => el.wallet == wallet );    

    if (holder) setIsHolder(holder)
    else setIsHolder(0)
  }



  

  return (
    <>
      <button className="hover:underline" onClick={connect}>Connect wallet</button>
      <button className="hover:underline ml-4" onClick={checkBalance}>Get balance</button>
      <button className="hover:underline ml-4" onClick={getHolders}>Get holders</button>

      {wallet ? ( 
        <div className="mt-2 pt-2 border-t">
          Your wallet: {wallet}
        </div>
      ) : null}

      {balance || balance === 0 ? ( 
        <div className="mt-2 pt-2 border-t">
          Your balance {balance} ETH
        </div>
      ) : null}

      {holders ? ( 
        <>
          <div className="mt-2 pt-2 border-t">
            Holders count: {holders.length}
          </div>

          {wallet ? ( 
            <div className="mt-2 pt-2 border-t">
              <button className="hover:underline" onClick={checkMyWallet}>Check my wallet</button>

              {isHolder ? ( 
                <div>
                  <div>Holder: {isHolder.wallet}</div>
                  <div>Quantity: {isHolder.balance}</div>
                </div>
              ) : null}

              {isHolder === 0 ? ( 
                <div>You are not holder!</div>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}
