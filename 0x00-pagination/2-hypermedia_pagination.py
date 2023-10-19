#!/usr/bin/env python3
"""
Simple Helper Function
"""
import csv
import math
from typing import List, Tuple, Dict


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

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        gets hyper information , better pagination and more info
        """
        # define response fields
        keys = ('page_size', 'page', 'data', 'next_page',
                'prev_page', 'total_pages')

        # calls the method get_page to aquieres the set
        data = self.get_page(page, page_size)

        # obtains the size of the set
        size = len(self.__dataset)

        total_pages = math.ceil(size/page_size)

        # create the response
        response = {}
        for key in keys:
            if key == 'page_size':
                response.update({key: page_size})

            if key == 'page':
                response.update({key: page})

            if key == 'data':
                response.update({key: data})

            if key == 'next_page':
                if (page + 1) >= total_pages:
                    response.update({key: None})
                else:
                    response.update({key: (page+1)})

            if key == 'prev_page':
                if (page - 1) > 0:
                    response.update({key: (page-1)})
                else:
                    response.update({key: None})

            if key == 'total_pages':
                response.update({key: total_pages})

        return response


def index_range(page: int, page_size: int) -> Tuple:
    """
    The function should return a tuple of size two containing a start index
    and an end index corresponding to the range of indexes to return in a list
    for those particular pagination parameters.
    """
    final_index = page * page_size
    initial_index = final_index - page_size
    return (initial_index, final_index)
