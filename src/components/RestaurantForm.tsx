import { ReactNode, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export interface IRestaurantForm {
  foodsApi: {
    id: string,
    name: string
  }[];
}

export default function RestaurantForm ( { foodsApi } :IRestaurantForm) {
    const [name,setName] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [num, setNum] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [avaliation, setAvaliation] = useState<number | undefined>(undefined);
    const [foods, setFoods] = useState<string[]>();
    const [error, setError] = useState(false);
    const [counterInput, setCounterInput] = useState<number>(1);
    
    const handleFood = (food: string): void => {
      setFoods((prevFoods) => {
        const updateFoods: string[] = prevFoods ? [...prevFoods] : [];
        const indexMatchFood: number = updateFoods.indexOf(food.trim());
        if (indexMatchFood != -1) {
          updateFoods[indexMatchFood] = food.trim();
        } else {
          updateFoods.push(food.trim());
        } 
        return updateFoods;
      });
    };
    const addInput = (): void => {
      setCounterInput((prev) => prev + 1);
    }
    const deleteInput = (): void => {
      setCounterInput((prev) => prev - 1);
    }

    let quantityInputs: number[] = Array.from({ length: counterInput }, (_, i) => i + 1 )

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const userData = { name, street, num, region, avaliation, foods };
      console.log(userData);
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
          <select className="border border-gray-400" name="foods" id="foods-select">
            {foodsApi.map((food, i) => {
              return (
                <option 
                key={i} 
                value={food.name}
                onClick={() => handleFood(food.name)}
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
                >{food}</span>) }

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