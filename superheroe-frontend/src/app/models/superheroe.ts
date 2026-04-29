export interface Superheroe {
  id: number;
  nombre: string;
  poder: string;
  fortaleza?: string | null;
  resistencia?: string | null;
  debilidad?: string | null;
  imagen_url: string;
  created_at?: string;
}

export interface NuevoSuperheroe {
  nombre: string;
  poder: string;
  fortaleza?: string;
  resistencia?: string;
  debilidad?: string;
  imagen_url: string;
}
