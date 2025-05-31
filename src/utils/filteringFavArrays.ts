export function filterPackingTypeZero(array: any) {
  return array.filter((obj: any) => obj.packing_type === 0);
}

export function filterPackingTypeOne(array: any) {
  return array.filter((obj: any) => obj.packing_type === 1);
}

export function checkTooManyPackings(
  packingList: Array<any>,
  packingLooked: number
) {
  const count = packingList.filter(
    (p) => p.packing_type === packingLooked
  ).length;
  return count;
}
