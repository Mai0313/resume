/**
 * LocalStorage utility with quota checking and error handling
 * Features:
 * - Application-scoped key management (prevents cross-app data deletion)
 * - LRU (Least Recently Used) cache eviction strategy
 * - Safe quota management
 */

interface StorageMetadata {
  timestamp: number;
  accessCount: number;
  lastAccess: number;
  size: number;
}

export class LocalStorageManager {
  // Application namespace to prevent conflicts with other apps
  private readonly APP_PREFIX = "resume_app_";
  private readonly METADATA_SUFFIX = "_meta";

  // Priority levels for data retention
  private readonly PRIORITY_KEYS = new Set([
    "resume_data",
    "github_token",
    "user_preferences",
    "theme"
  ]);

  /**
   * Get prefixed key for this application
   */
  private getPrefixedKey(key: string): string {
    return `${this.APP_PREFIX}${key}`;
  }

  /**
   * Check if a key belongs to this application
   */
  private isAppKey(key: string): boolean {
    return key.startsWith(this.APP_PREFIX);
  }

  /**
   * Get original key without prefix
   */
  private getOriginalKey(prefixedKey: string): string {
    return prefixedKey.replace(this.APP_PREFIX, "");
  }

  /**
   * Estimate available localStorage space (in bytes)
   */
  private getAvailableSpace(): number {
    const testKey = `${this.APP_PREFIX}__storage_test__`;
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
   * Get total localStorage usage for this application (in bytes)
   */
  private getCurrentUsage(): number {
    let total = 0;

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && this.isAppKey(key)) {
        total += localStorage[key].length + key.length;
      }
    }

    return total;
  }

  /**
   * Get metadata for a storage item
   */
  private getMetadata(key: string): StorageMetadata | null {
    const metaKey = `${this.getPrefixedKey(key)}${this.METADATA_SUFFIX}`;
    try {
      const meta = localStorage.getItem(metaKey);
      return meta ? JSON.parse(meta) : null;
    } catch {
      return null;
    }
  }

  /**
   * Set metadata for a storage item
   */
  private setMetadata(key: string, metadata: StorageMetadata): void {
    const metaKey = `${this.getPrefixedKey(key)}${this.METADATA_SUFFIX}`;
    try {
      localStorage.setItem(metaKey, JSON.stringify(metadata));
    } catch {
      // Ignore metadata save failures
    }
  }

  /**
   * Safely set item in localStorage with quota checking and metadata tracking
   */
  setItem<T>(key: string, value: T): boolean {
    try {
      const prefixedKey = this.getPrefixedKey(key);
      const serialized = JSON.stringify(value);
      const dataSize = serialized.length + prefixedKey.length;
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

      // Save the data
      localStorage.setItem(prefixedKey, serialized);

      // Update metadata for LRU tracking
      const metadata: StorageMetadata = {
        timestamp: Date.now(),
        accessCount: 1,
        lastAccess: Date.now(),
        size: dataSize
      };
      this.setMetadata(key, metadata);

      return true;
    } catch (e) {
      if (e instanceof Error && e.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded. Clearing old entries...");
        this.clearOldestEntries(3);

        // Retry once after clearing
        try {
          const prefixedKey = this.getPrefixedKey(key);
          localStorage.setItem(prefixedKey, JSON.stringify(value));

          // Update metadata after successful retry
          const metadata: StorageMetadata = {
            timestamp: Date.now(),
            accessCount: 1,
            lastAccess: Date.now(),
            size: JSON.stringify(value).length + prefixedKey.length
          };
          this.setMetadata(key, metadata);

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
   * Safely get item from localStorage with access tracking
   */
  getItem<T>(key: string): T | null {
    try {
      const prefixedKey = this.getPrefixedKey(key);
      const item = localStorage.getItem(prefixedKey);

      if (!item) return null;

      // Update access metadata for LRU tracking
      const metadata = this.getMetadata(key);
      if (metadata) {
        metadata.lastAccess = Date.now();
        metadata.accessCount++;
        this.setMetadata(key, metadata);
      }

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
      const prefixedKey = this.getPrefixedKey(key);
      const metaKey = `${prefixedKey}${this.METADATA_SUFFIX}`;

      localStorage.removeItem(prefixedKey);
      localStorage.removeItem(metaKey);
    } catch (e) {
      console.error("Error removing from localStorage:", e);
    }
  }

  /**
   * Clear oldest entries using LRU strategy
   * Only clears entries belonging to this application
   */
  private clearOldestEntries(count: number): void {
    try {
      // Get all application keys with their metadata
      const appEntries: Array<{
        key: string;
        originalKey: string;
        metadata: StorageMetadata | null;
        isPriority: boolean;
      }> = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !this.isAppKey(key) || key.includes(this.METADATA_SUFFIX)) {
          continue;
        }

        const originalKey = this.getOriginalKey(key);
        const metadata = this.getMetadata(originalKey);
        const isPriority = this.PRIORITY_KEYS.has(originalKey);

        appEntries.push({
          key,
          originalKey,
          metadata,
          isPriority
        });
      }

      // Sort by priority and LRU (least recently used first)
      appEntries.sort((a, b) => {
        // Priority items should be kept
        if (a.isPriority !== b.isPriority) {
          return a.isPriority ? 1 : -1;
        }

        // Sort by last access time (oldest first)
        const aTime = a.metadata?.lastAccess || 0;
        const bTime = b.metadata?.lastAccess || 0;
        return aTime - bTime;
      });

      // Remove the oldest non-priority entries
      const toRemove = appEntries.slice(0, Math.min(count, appEntries.length));

      for (const entry of toRemove) {
        if (!entry.isPriority) {
          console.log(`Removing old cache entry: ${entry.originalKey}`);
          this.removeItem(entry.originalKey);
        }
      }

      // If we couldn't remove enough non-priority items, log a warning
      if (toRemove.filter(e => !e.isPriority).length < count) {
        console.warn("Unable to free enough space without removing priority items");
      }
    } catch (e) {
      console.error("Error clearing old entries:", e);
    }
  }

  /**
   * Clear all localStorage data for this application only
   */
  clear(): void {
    try {
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && this.isAppKey(key)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.error("Error clearing localStorage:", e);
    }
  }

  /**
   * Get all keys stored by this application
   */
  getAllKeys(): string[] {
    const keys: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && this.isAppKey(key) && !key.includes(this.METADATA_SUFFIX)) {
        keys.push(this.getOriginalKey(key));
      }
    }

    return keys;
  }
}

// Export singleton instance
export const localStorageManager = new LocalStorageManager();
