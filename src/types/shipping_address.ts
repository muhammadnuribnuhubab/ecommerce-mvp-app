export type ShippingAddress = {
  id?: number;
  user_id: string;
  full_name: string;
  phone_number: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  notes: string;
  created_at?: string;
  updated_at?: string;
};
