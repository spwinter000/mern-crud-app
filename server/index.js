const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require("./models/Food");

// middleware for front-end information
app.use(express.json()) // converts responses to JSON
app.use((cors())); // for using custom APIs 

mongoose.connect("mongodb+srv://mern-user:mern-password@mern-project.fr3il.mongodb.net/mern-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.get("/", (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
})

app.post("/insert", async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.daysSinceEaten;
    
    const food = new FoodModel({foodName: foodName, daysSinceEaten: days});

    try{
        await food.save();
        res.send("inserted data");
    } catch(err){
        console.log(err);
    }
})

app.put("/update", async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    
    // const food = new FoodModel({foodName: foodName, daysSinceEaten: days});

    try{
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send('update');
        })
    } catch(err){
        console.log(err);
    }
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id; //id of food to be deleted

    await FoodModel.findByIdAndRemove(id).exec();
    res.send('delete');

})

app.listen(3001, () => console.log('mern-project is up on 3001'))