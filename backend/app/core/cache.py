"""
Simple in-memory cache with Time-To-Live (TTL) support.
Implements Tiered Caching:
- Pregnancy Status: 24 hours
- Drug Safety: 1 week (168 hours)
"""
import time
from typing import Any, Dict, Optional, Tuple

class TieredCache:
    def __init__(self):
        self._cache: Dict[str, Tuple[Any, float]] = {}
        
        # TTL Constants (in seconds)
        self.TTL_PREGNANCY = 24 * 60 * 60  # 24 hours
        self.TTL_DRUG_SAFETY = 7 * 24 * 60 * 60  # 1 week

    def get(self, key: str) -> Optional[Any]:
        """Get value from cache if it exists and hasn't expired."""
        if key not in self._cache:
            return None
            
        value, expiry = self._cache[key]
        
        if time.time() > expiry:
            del self._cache[key]
            return None
            
        return value

    def set(self, key: str, value: Any, ttl: int):
        """Set value in cache with specific TTL."""
        expiry = time.time() + ttl
        self._cache[key] = (value, expiry)

    def get_pregnancy_status(self, patient_id: int) -> Optional[Dict]:
        return self.get(f"preg_{patient_id}")

    def set_pregnancy_status(self, patient_id: int, data: Dict):
        self.set(f"preg_{patient_id}", data, self.TTL_PREGNANCY)

    def get_drug_safety(self, drug_name: str) -> Optional[Dict]:
        return self.get(f"drug_{drug_name.lower()}")

    def set_drug_safety(self, drug_name: str, data: Dict):
        self.set(f"drug_{drug_name.lower()}", data, self.TTL_DRUG_SAFETY)
        
    def clear(self):
        self._cache.clear()

# Global cache instance
cache = TieredCache()
