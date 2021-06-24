import { useState } from 'react';
import Axios from 'axios';
import './FoodList';


const FoodList = ({foodList}) => {

    const [newFoodName, setNewFoodName] = useState('');

    const updateFood = (id) => {
        Axios.put('http://localhost:3001/update/', {
            id: id, 
            newFoodName: newFoodName
        })
    }

    const deleteFood = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`)
    }

    return ( 
        <div>
            {foodList.map((food, key) => {
                return(
                    <div key={key} className="food">
                        <h1 id="foodName">{food.foodName}</h1>
                        <p id="daysSinceEaten">{food.daysSinceEaten}</p>
                        <input type="text" placeholder="New food name" onChange={e => setNewFoodName(e.target.value)}/>
                        <button onClick={() => updateFood(food._id)}>Update</button>
                        <button onClick={() => deleteFood(food._id)}>Delete</button>
                    </div>
                )
            })}
        </div>
     );
}
 
export default FoodList;