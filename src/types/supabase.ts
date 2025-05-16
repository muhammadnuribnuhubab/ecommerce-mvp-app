export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string; // wajib ada, tidak boleh null
          email: string; // wajib ada
          password: string; // wajib ada, tidak boleh null
        };
        Insert: {
          id?: string;
          name: string; // wajib isi saat insert
          email: string; // wajib isi saat insert
          password: string; // wajib isi saat insert
        };
        Update: {
          name?: string;
          email?: string;
          password?: string;
        };
        Relationships: [];
      };
      // Table lain seperti cart dll
    };
  };
};
