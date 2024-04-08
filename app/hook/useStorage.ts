'use client'
type Data = {
  [key: string]: string
}

type StoreType = 'sessionStorage' | 'localStorage'

export default function useStorage(type: StoreType) {
  if (typeof window === 'undefined') {
    return {
      get: () => console.log(),
      set: () => console.log(),
      clear: () => console.log(),
      delete: () => console.log(),
    }
  }

  const sessionStorage = window.sessionStorage
  const localStorage = window.localStorage
  const store = type === 'sessionStorage' ? sessionStorage : localStorage

  return {
    get: (key: string) => {
      return store.getItem(key)
    },
    set: (data: Data) => {
      for (const key in data) {
        store.setItem(key, data[key])
      }
    },
    delete: (val: string | Data) => {
      if (typeof val === 'string') {
        return store.removeItem(val)
      }
      for (const key in val) {
        store.removeItem(key)
      }
    },
    clear: () => {
      store.clear()
    },
  }
}
