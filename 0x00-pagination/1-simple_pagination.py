#!/usr/bin/env python3
"""
Simple Helper Function
"""
import csv
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        gets the set according by number of page and page size
        """

        assert page.__class__.__name__ == 'int'
        assert page_size.__class__.__name__ == 'int'
        assert (page > 0)
        assert (page_size > 0)

        self.dataset()

        pagination = index_range(page, page_size)

        pagination = [x for x in pagination]

        return (self.__dataset[pagination[0]:pagination[1]])


def index_range(page: int, page_size: int) -> Tuple:
    """
    The function should return a tuple of size two containing a start index
    and an end index corresponding to the range of indexes to return in a list
    for those particular pagination parameters.
    """
    final_index = page * page_size
    initial_index = final_index - page_size
    return (initial_index, final_index)
