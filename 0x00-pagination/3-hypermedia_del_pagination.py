#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            print(dataset)
            print(type(dataset))
            print(len(dataset))
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """The goal here is that if between two queries, certain rows are
        removed from the dataset, the user does not miss items from dataset
        when changing page.
        """

        limit_index = len(self.__indexed_dataset) - 1
        assert index <= limit_index and index >= 0

        keys = list(self.__indexed_dataset.keys())

        start_slice = index
        while start_slice <= limit_index:
            if start_slice in keys:
                start_slice = keys.index(start_slice)
                break
            else:
                start_slice += 1

        final_slice = start_slice + page_size
        keys_page = keys[index: final_slice]
        data = [self.__indexed_dataset[i] for i in keys_page]
        hyper_index = {
            "index": index, "next_index": keys[final_slice],
            "page_size": page_size, "data": data
        }
        return hyper_index
