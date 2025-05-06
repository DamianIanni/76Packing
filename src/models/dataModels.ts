export type PackingType = 0 | 1 | 2 | 3;

export interface PropmtDataInterface {
  destination: string | null;
  season: string[] | null;
  activities: string | null;
  luggage: string[] | null;
  duration: number | null;
  accommodation: string | null;
  utilities: string[] | null;
}

export interface SavedLuggage {
  userId: string;
  luggage1: string;
  luggage2?: string;
  luggage3?: string;
  luggage4?: string;
}
export interface UserInterface {
  email: string;
  name: string;
  surname: string;
  userId: string;
  dateOfBirth: string | null;
  height: number | null;
  gender: string | null;
}

export interface UserStyleInterface {
  userId: string;
  brands: string | null;
  style: string | null;
}

export interface FavClothesInterface {
  userId: string;
  item: string | null;
}

export interface FavPackingInterface {
  userId: string;
  Name: string;
  Luggage_1: string;
  Luggage_2: string | null;
  Luggage_3: string | null;
  Luggage_4: string | null;
  packing_type: PackingType;
}

export interface UserStateInterface {
  googleIdToken: string | null;
  userId: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  photoUrl: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  height: number | null;
  style: string | null;
  brands: string | null;
  savedLuggage: string[] | null;
  favClothes: FavClothesInterface | null;
  favPacking: FavPackingInterface | null;
}
