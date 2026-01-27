class LocalStorageService {
    private storage: Storage;
    
    constructor() {
        this.storage = window.localStorage;
    }

    getItem(key: string) {
        const item = this.storage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    setItem(key: string, payload: any) {
        const localStorageItems = this.getItem(key) || [];
        const localStorageHealth = localStorageItems?.length;
        if (localStorageHealth > 21) {
            const cleanedLocalStorageHealth = localStorageItems?.slice(-20);
            this.storage.setItem(key, JSON.stringify(cleanedLocalStorageHealth));
            return
        }
        this.storage.setItem(key, JSON.stringify(payload));
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }
}
const localStorageService = new LocalStorageService();
export default localStorageService;