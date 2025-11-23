const DB_NAME = "MamaSafeDB";
const DB_VERSION = 1;
const STORES = {
  PATIENTS: "patients",
  MEDICATIONS: "medications",
};

export const offlineService = {
  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORES.PATIENTS)) {
          db.createObjectStore(STORES.PATIENTS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORES.MEDICATIONS)) {
          db.createObjectStore(STORES.MEDICATIONS, { keyPath: "id" });
        }
      };
    });
  },

  async cacheData(storeName, data) {
    const db = await this.openDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    data.forEach((item) => store.put(item));
    return tx.complete;
  },

  async getData(storeName, id) {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },
};
