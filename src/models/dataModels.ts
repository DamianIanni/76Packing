export type PackingType = 0 | 1 | 2 | 3;

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
  name: string;
  luggage1: string;
  luggage2: string | null;
  luggage3: string | null;
  luggage4: string | null;
  packingType: PackingType;
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
  savedLuggage: string | null;
  favClothes: FavClothesInterface | null;
  favPacking: FavPackingInterface | null;
}
