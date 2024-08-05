/* eslint-disable import/prefer-default-export */
export const ReducerWithDictionary = <T extends {id: number}>(arrayOne: T[], arrayTwo: T[]): T[] => {
  const reducedArray: T[] = []
  const dictionary: {[key: number]: boolean} = {}

  arrayOne.forEach(object => {
    if (dictionary[object.id]) return
    dictionary[object.id] = true
    reducedArray.push(object)
  })

  arrayTwo.forEach(object => {
    if (dictionary[object.id]) return
    dictionary[object.id] = true
    reducedArray.push(object)
  })

  return reducedArray
}

// eslint-disable-next-line arrow-body-style
export const isEmpty = (value: string) => {
  // eslint-disable-next-line no-nested-ternary
  return value ? (typeof value === 'string' ? !value.trim() : false) : true;
}