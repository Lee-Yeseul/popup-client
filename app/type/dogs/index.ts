export type PostDogResponse = {
  id: number
}

export type DogResponse = {
  id: number
  name: string
  breed: string
  age: number
  imagePath: string
  ownerId: number
}

export type DogBreedResponse = {
  dogBreeds: {
    [key: string]: string
  }
}
