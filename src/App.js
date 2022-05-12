import React from "react";
import { Cards, Chart, CountryPicker, Footer, Navbar, Drawer} from './components';
import Box from '@mui/material/Box';
import styles from './App.module.css';
import { fetchData } from './api';
import LinearProgress from '@mui/material/LinearProgress';


class App extends React.Component {
  state = {
    data: {},
    country: '',
    isLoading: false
  }

  async componentDidMount() {
    const covidData = await fetchData();
    this.setState({ data: covidData, isLoading:true });
  }

  handleCountryChange = async (country) => {
    country = country === 'global' ? null : country;
    const covidData = await fetchData(country);

    this.setState({data: covidData, country: country})
    console.log(covidData)
  }

  render() {
    const { data, country } = this.state;

    return (
      <div>
      {!this.state.isLoading ?  
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
      : 
      <Box sx={{ flexGrow: 1 }}>
       <Drawer />
        <Navbar />
        <div className={styles.container}>
          <Cards data={data} country={country} />
          <CountryPicker handleCountryChange={this.handleCountryChange}/>
          <Chart data={data} country={country}/>
        </div>
        <Footer />
      </Box>
      }
    </div>
    )
  }
}

export default App;