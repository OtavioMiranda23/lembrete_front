import { useEffect, useState } from "react";
import { RestaurantPost } from "../types/restaurantsPost";
import { Food } from "../types/food";

export interface IRestaurantForm {
  foodsApi: Food[];
}

export default function RestaurantForm ( { foodsApi } :IRestaurantForm) {
    const [name,setName] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [num, setNum] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [avaliation, setAvaliation] = useState<number | undefined>(undefined);
    const [foods, setFoods] = useState<Food[]>();
    const [error, setError] = useState(false);
    
    const handleFood = (food: Food ): void => {
      setFoods((prevFoods) => {      
        const updateFoods: Food[] = prevFoods ? [...prevFoods] : [];
        const isFoodAlreadySelected: boolean = updateFoods.some(f => f.id === food.id); 
        if (!isFoodAlreadySelected) {
          food.name.trim();
          updateFoods.push(food);
        } 
        return updateFoods;
      });       
    };

    async function fetchRestaurant(restaurant: RestaurantPost ) {
      const request = await fetch('http://localhost:3000/api/restaurant/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(restaurant)
      });
      const res = await request.json();
      console.log({res});
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const userData = { 
        userIds:["459ba75c-f302-46c4-97f5-835fe9bbc4bb"], 
        name, 
        street, 
        num, 
        region, 
        avaliation, 
        foodType: foods?.map(food => food.id) };

      if (!userData.name) {
        setError(true);
        alert('erro')
        return

      } 
      fetchRestaurant(userData);
    }
    return (
        <>
         <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700">Nome do Restaurante *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-400 w-full"
              required
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-700">Rua</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="mt-1 p-2 border w-full border-gray-400"
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-700">Número</label>
            <input
              type="text"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              className="mt-1 p-2 border w-full border-gray-400"
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-700">Região</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 p-2 border w-full border-gray-400"
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-700">Avaliação</label>
            <input
              type="number"
              value={avaliation}
              onChange={(e) => setAvaliation(parseInt(e.target.value))}
              className="mt-1 p-2 border w-full border-gray-400"
            />
          </div>

          <label className="block text-gray-700">Tipos de comida</label>
          <select 
          className="border border-gray-400" 
          name="foods" 
          onChange={(e) => { 
            const selectedFood = foodsApi.find(food => food.name === e.target.value)
            if (selectedFood) handleFood(selectedFood);
          }}
          id="foods-select">
            {foodsApi.map((food, i) => {
              return (
                <option 
                key={i} 
                value={food.name}
                > {food.name}</option>    
            )
            })}
          </select>
          <div className="mt-4 flex flex-col">
            <span>Comidas selecionadas:</span>
            <div className="flex gap-2 self-center">
              { foods?.map((food, i) =>  
                <span 
                key={i} 
                className="w- border border-green-500 rounded-full text-green-500 px-2"
                >{food.name}</span>) }

            </div>
          </div>
          
          <div className='flex flex-col gap-3'>
            <span className='font-light text-xs'>(*) Valores obrigatórios</span>
    
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Criar Restaurante
            </button>
          </div>
    
        </form>
        </>
      )
}