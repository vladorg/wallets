import { MetaMaskProvider } from "@metamask/sdk-react"
import { Home } from "./components/Home"

export const App = () => {
  const metamask_conf = {
    defug: false,
    sdkOptions: {
      dappMetadata: {
        name: 'Example',
        url: window.location.href,
      }
    }
  }

  return (
    <>
      { window?.ethereum?.isMetaMask ? (
        <MetaMaskProvider {...metamask_conf}>
          <h1>Hello metamask!</h1>
          <Home />
        </MetaMaskProvider>
        ) : (
        <h1>Hello!</h1>
      )}      
    </>
  )
}
