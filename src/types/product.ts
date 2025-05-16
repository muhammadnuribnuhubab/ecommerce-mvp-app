export type ProductBase = {
  id: number; // dari fakestoreapi id bertipe number
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number; // angka rating (contoh: 3.9)
    count: number; // jumlah review (contoh: 120)
  };
};

export type ProductDetail = ProductBase & {
  description: string;
  category: string; // fakestoreapi pakai string biasa, misal "men's clothing"
};
