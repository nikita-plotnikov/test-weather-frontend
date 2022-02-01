import axios from 'axios';
import React, { useState } from 'react';
import { Container, ContentContainer, Input, InputContainer, ResultsContainer, SubmitButton, TextPart } from './styled';
import { WeatherInterface } from './interfaces/weather.interface';

function App() {

  const [weatherData, setWeatherData] = useState<WeatherInterface>()

  async function handleRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const submitter = (event.nativeEvent as any).submitter.name

    try {
      if(submitter === 'search') {
        // const {data} = await axios.get(`https://hx9bxaihce.execute-api.eu-west-2.amazonaws.com/dev/weather/${target.city.value}/current`)
        const {data} = await axios.get(`http://localhost:3000/dev/weather/${target.city.value}`)
        console.log(data);
        setWeatherData(data);
      }
    } catch(e) {
      console.log('Request failed', e)
    }
  }


  return (
    <div className="App">
      <Container>
        <ContentContainer>
          <InputContainer style={{justifyContent:"space-between"}} onSubmit={(event) => handleRequest(event)}>
            <Input name="city"/>
            <SubmitButton name="search"> Search </SubmitButton>
            <SubmitButton name="search_server"> Search with server </SubmitButton>
          </InputContainer>

          <b> Results for City Name: </b>

          <ResultsContainer> 
            <TextPart> Temperature: {weatherData?.temperature} &deg;C</TextPart>
            <TextPart> Weather conditions: {weatherData?.textWeather[0]} </TextPart>
            <br/>
            <TextPart> Wind: {weatherData?.windSpeed}</TextPart>
            <TextPart> Wind direction: {weatherData?.windDir}</TextPart>
            <TextPart> Pressure: {weatherData?.pressure}</TextPart>
            <TextPart> Humidity: {weatherData?.humidity}%</TextPart>
          </ResultsContainer>
        </ContentContainer>
      </Container>
    </div>
  );
}

export default App;
