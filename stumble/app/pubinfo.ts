export interface PubInfo {
  id: number,
  name: string,
  location: string,
  image: string,
  rating: number,
  opening_times: string[],
  food_times: string[],
  darts: boolean,
  pool: boolean,
  gambling: boolean,
  wetherspoons: boolean,
  coordinates: number[]
}
