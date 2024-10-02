
export async function getStaticProps() {
    return {
      redirect: {
        destination: '/countries',
        permanent: false,
      },
    };
  }
  
  const Home = () => {
    return null;
  };
  
  export default Home;