import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import FoodList from './FoodList';

function App() {
  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  // const [newFoodName, setNewFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);


  useEffect(() => {
    getFoodList();
  }, [])
  
  const getFoodList = async () => {
    try{
      await Axios.get('http://localhost:3001/')
        .then(response => {
          // console.log(response.data);
          setFoodList(response.data);
        })
        // console.log("useEffect occured")
    } catch (err) {
        console.log(err);
    }
  }

  const addToList = () => {
    Axios.post('http://localhost:3001/insert/', {
        foodName: foodName,
        daysSinceEaten: days,
    })
    // .then(response => {
    //   setFoodList(response.data);
    // })
  }

  return (
    <div className="App">
      <h1>MERN App</h1>
      <label>Food name:</label>
      <input type="text" onChange={e => setFoodName(e.target.value)}/>
      <label>Days since eaten:</label>
      <input type="number" onChange={e => setDays(e.target.value)}/>
      <button onClick={addToList}>Add to List</button>
      <FoodList 
        foodList={foodList}
        setFoodList={setFoodList}
      />
    </div>
    
  );
}

export default App;
