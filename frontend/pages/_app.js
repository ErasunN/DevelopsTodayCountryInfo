import '../global.css';
import CountryHeader from '../components/CountryHeader'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CountryHeader />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;