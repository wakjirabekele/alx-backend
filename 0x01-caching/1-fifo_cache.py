#!/usr/bin/env python3
"""FIFO Cache module
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ BaseCaching:
      - Simple class to implement a cache system
      - First in First out system
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
            if len(self.cache_data) > self.MAX_ITEMS:
                deleteKey = list(self.cache_data.keys())[0]
                print('DISCARD: {}'.format(deleteKey))
                self.cache_data.pop(deleteKey)
        else:
            pass

    def get(self, key):
        """
        Return the valur from the given key if exists
        """
        return self.cache_data.get(key)
