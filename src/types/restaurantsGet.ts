export type RestaurantGet = {
    name: string,
    street?: string,
    num?: string,
    region?: string,
    avaliation?: number,
    foodType?: { 
        id: string,
        name: string
    }[]
}