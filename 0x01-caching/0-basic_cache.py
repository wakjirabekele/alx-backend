#!/usr/bin/env python3
"""Base Caching module
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ BaseCaching:
      - Simple class to implement a cache system
      - Learn the basis to cache algorithnms
    """

    def __init__(self):
        """
        CONSTRUCTOR
        """
        super().__init__()

    def put(self, key, item):
        """
        update the key in the cache data
        """
        if key is not None:
            self.cache_data.update({key: item})
        else:
            pass

    def get(self, key):
        """
        Return the valur from the given key if exists
        """
        return self.cache_data.get(key)
