import {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [pump, setPump] = useState(false),
        [tankTemp, setTankTemp] = useState(60),
        [tankMass] = useState(50),
        [gpm] = useState(13.2);

  useEffect(() => {
    if(tankTemp >= 120){
      setInterval(stagnant(tankTemp), 6000)
    } else if (tankTemp <= 115){
      setInterval(pumping(tankTemp), 6000)
    }
  }, [pump])

// 13.2 gpm grundfos 1" pump
// Temperature equation for incoming water
// T(final) = (m1 * T1 + m2 * T2) / (m1 + m2)

  const increasing = () => {
    let t1 = tankTemp
    let m2 = gpm / 10
    let m1 = tankMass - m2
    let t2 = tankTemp + 2

    do {
      let T = (m1 * t1 + m2 * t2) / (m1 + m2)
      setTankTemp(T)
    } while (tankTemp < 120)
  }

  const pumping = (tankTemp) => {

    if(tankTemp <= 115){
      increasing()
    } else {
      setPump(false)
    }
  }

// Quick google search said a well insulated water heater loses about 1/2 degree to 1 degree of temperature per hour
// I am using that to calculate the heat loss at 1 degree per hour 1 / 60 / 10

  const decreasing = () => {
    do {
      setTankTemp(tankTemp - (1 / 60 / 10))
    } while (tankTemp >= 120)
  }

  const stagnant = (tankTemp) => {

    if(tankTemp >= 120){
      decreasing()
    } else {
      setPump(true)
    }
  }

  return (
    <div className="App">
      <button onClick={setPump(true)}>Start Simulation</button>
      <div>{console.log(tankTemp)}</div>
    </div>
  );
}

export default App;