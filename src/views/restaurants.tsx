import { useEffect, useState } from "react";
import RestaurantForm from "../components/RestaurantForm";

export default function Restaurants() {
    const [foods, setFoods] = useState(null);
    useEffect(() => {
        getData();
    }, []);

    async function getData(): Promise<void> {
        try {
            const  response = await fetch('http://localhost:3000/api/food/');
            const result = await response.json();
            setFoods(result);
        } catch (e) {
            console.error(e);
        }
    };
    return (
       foods ?  <RestaurantForm foodsApi={foods}/> : <p>CARREGANDO</p>  
    )
}