/**
 * LocalStorage utility with quota checking and error handling
 */

export class LocalStorageManager {
  /**
   * Estimate available localStorage space (in bytes)
   */
  private getAvailableSpace(): number {
    const testKey = "__storage_test__";
    let estimate = 0;

    try {
      // Try progressively larger strings to estimate capacity
      for (let i = 0; i < 10; i++) {
        const size = 1024 * Math.pow(2, i); // 1KB, 2KB, 4KB, etc.
        const testData = "x".repeat(size);

        localStorage.setItem(testKey, testData);
        estimate = size;
      }
    } catch {
      // Hit quota limit
    } finally {
      localStorage.removeItem(testKey);
    }

    return estimate;
  }

  /**
   * Get total localStorage usage (in bytes)
   */
  private getCurrentUsage(): number {
    let total = 0;

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }

    return total;
  }

  /**
   * Safely set item in localStorage with quota checking
   */
  setItem<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      const dataSize = serialized.length + key.length;
      const currentUsage = this.getCurrentUsage();
      const availableSpace = this.getAvailableSpace();

      // Check if there's enough space
      if (currentUsage + dataSize > availableSpace * 0.9) {
        // 90% threshold
        console.warn(
          `LocalStorage is almost full. Attempting to clear old data...`,
        );
        this.clearOldestEntries(1);
      }

      localStorage.setItem(key, serialized);

      return true;
    } catch (e) {
      if (e instanceof Error && e.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded. Clearing old entries...");
        this.clearOldestEntries(3);

        // Retry once after clearing
        try {
          localStorage.setItem(key, JSON.stringify(value));

          return true;
        } catch {
          console.error("Failed to save after clearing space");

          return false;
        }
      }
      console.error("Error saving to localStorage:", e);

      return false;
    }
  }

  /**
   * Safely get item from localStorage
   */
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);

      if (!item) return null;

      return JSON.parse(item) as T;
    } catch (e) {
      console.error("Error reading from localStorage:", e);

      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing from localStorage:", e);
    }
  }

  /**
   * Clear oldest entries (simple FIFO strategy)
   * In a real-world scenario, you might want to track timestamps
   */
  private clearOldestEntries(count: number): void {
    const keys = Object.keys(localStorage);

    for (let i = 0; i < Math.min(count, keys.length); i++) {
      localStorage.removeItem(keys[i]);
    }
  }

  /**
   * Clear all localStorage data
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Error clearing localStorage:", e);
    }
  }
}

// Export singleton instance
export const localStorageManager = new LocalStorageManager();
