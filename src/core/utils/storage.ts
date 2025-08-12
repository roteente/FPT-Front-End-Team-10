export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove from localStorage:', error)
    }
  },

  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  },
}

// Enhanced storage utilities
export const setStorage = (key: string, value: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void => {
  try {
    const storageObj = storageType === 'localStorage' ? localStorage : sessionStorage
    storageObj.setItem(key, value)
  } catch (error) {
    console.error(`Failed to save to ${storageType}:`, error)
  }
}

export const getStorage = (key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): string | null => {
  try {
    const storageObj = storageType === 'localStorage' ? localStorage : sessionStorage
    return storageObj.getItem(key)
  } catch (error) {
    console.error(`Failed to get from ${storageType}:`, error)
    return null
  }
}

export const removeStorage = (key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void => {
  try {
    const storageObj = storageType === 'localStorage' ? localStorage : sessionStorage
    storageObj.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove from ${storageType}:`, error)
  }
}