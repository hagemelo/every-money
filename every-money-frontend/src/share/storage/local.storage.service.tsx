export class LocalStorageService {
    private readonly key: string;
  
    constructor(key: string) {
      this.key = key;
    }
  
    setItem(value: string): void {
      localStorage.setItem(this.key, value);
    }
  
    getItem(): string | null {
      return localStorage.getItem(this.key);
    }
  
    removeItem(): void {
      localStorage.removeItem(this.key);
    }
  }