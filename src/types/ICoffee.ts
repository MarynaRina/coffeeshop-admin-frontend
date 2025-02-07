export interface ICoffee {
  id?: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: "hot" | "cold" | "others";
}
