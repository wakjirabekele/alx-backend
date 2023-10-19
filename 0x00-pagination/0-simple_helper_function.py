#!/usr/bin/env python3
"""
Simple Helper Function
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple:
    """
    The function should return a tuple of size two containing a start index
    and an end index corresponding to the range of indexes to return in a list
    for those particular pagination parameters.
    """
    final_index = page * page_size
    initial_index = final_index - page_size
    return (initial_index, final_index)
