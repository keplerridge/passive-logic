import {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [pump, setPump] = useState(false),
        [tankTemp, setTankTemp] = useState(60),
        [tankMass] = useState(50),
        [gpm] = useState(13.2);

  useEffect(() => {
    if(tankTemp >= 120){
      setPump(false)
    } else if (tankTemp <= 115){
      setTimeout(pumping(tankTemp), 6000)
    }
  }, [pump])

// 13.2 gpm grundfos 1" pump
// Temperature equation for incoming water
// T(final) = (m1 * T1 + m2 * T2) / (m1 + m2)

  const pumping = (tankTemp) => {
    let t1 = tankTemp
    let m1 = tankMass - m2
    let t2 = tankTemp + 2
    let m2 = gpm / 10

    if(tankTemp <= 115){
      do {
        let T = (m1 * t1 + m2 * t2) / (m1 + m2)
        setTankTemp(T)
      } while (tankTemp < 120)
    } else {
      setPump(false)
    }
  }

// Quick google search said a well insulated water heater loses about 1/2 degree to 1 degree of temperature per hour
// I am using that to calculate the heat loss

  const stagnant = (tankTemp) => {

    if(tankTemp >= 120){
      do {

      } while (tankTemp >= 120)
    } else {
      setPump(true)
    }
  }

  return (
    <div className="App">
      <button onClick={setPump(true)}>Start Simulation</button>
      <div>{console.log(tankTemp)} degrees<br></br></div>
    </div>
  );
}

export default App;