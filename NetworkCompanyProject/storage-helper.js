const StorageHelper = {
  isAvailable: null,

  checkAvailability() {
    if (this.isAvailable !== null) return this.isAvailable;
    
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      this.isAvailable = true;
      return true;
    } catch (e) {
      this.isAvailable = false;
      console.warn('localStorage is not available, using in-memory storage');
      return false;
    }
  },

  inMemoryStorage: {},

  getItem(key) {
    try {
      if (this.checkAvailability()) {
        return localStorage.getItem(key);
      } else {
        return this.inMemoryStorage[key] || null;
      }
    } catch (e) {
      console.error('Error getting item from storage:', e);
      return this.inMemoryStorage[key] || null;
    }
  },

  setItem(key, value) {
    try {
      if (this.checkAvailability()) {
        localStorage.setItem(key, value);
      }
      this.inMemoryStorage[key] = value;
    } catch (e) {
      console.error('Error setting item in storage:', e);
      this.inMemoryStorage[key] = value;
    }
  },

  removeItem(key) {
    try {
      if (this.checkAvailability()) {
        localStorage.removeItem(key);
      }
      delete this.inMemoryStorage[key];
    } catch (e) {
      console.error('Error removing item from storage:', e);
      delete this.inMemoryStorage[key];
    }
  },

  getParsed(key, defaultValue = null) {
    try {
      const value = this.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error('Error parsing stored value:', e);
      return defaultValue;
    }
  },

  setStringified(key, value) {
    try {
      this.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error stringifying value:', e);
    }
  }
};
