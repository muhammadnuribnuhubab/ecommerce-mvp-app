export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
        };
        Update: {
          name?: string;
          email?: string;
        };
        Relationships: [];
      };

      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: number;
          title: string;
          category: string;
          price: number;
          image: string;
          quantity: number;
          is_selected: boolean | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: number;
          title: string;
          category: string;
          price: number;
          image: string;
          quantity?: number;
          is_selected?: boolean;
        };
        Update: {
          user_id?: string;
          product_id?: number;
          title?: string;
          category?: string;
          price?: number;
          image?: string;
          quantity?: number;
          is_selected?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_items_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
  };
};
