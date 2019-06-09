/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';

import {
    SortT,
    OrderT
} from 'store/reducer';


import styles from './THeader.module.css';

type THeaderT = React.HTMLProps<HTMLTableHeaderCellElement> & {
    sort: SortT,
    order: OrderT,
    id: SortT,
    onChangeSort: (sort: SortT, order: OrderT) => void
};

const THeader = ({
    children,
    sort,
    order,
    id,
    onChangeSort
}: THeaderT) => {
    const handleClick = useCallback(() => {
        let newSort = sort;
        let newOrder = order;

        if (id === sort) {
            if (order === 'asc') {
                newOrder = 'desc';
            } else {
                newOrder = 'asc';
            }
        } else {
            newSort = id;
        }

        onChangeSort(newSort, newOrder);
    }, [sort, order, id, onChangeSort]);
    const handleClearClick = useCallback((e) => {
        e.stopPropagation();

        onChangeSort('score', 'desc');
    }, []);

    return (
        <th
            className={styles.th}
            onClick={handleClick}
        >
            {children}
            {id === sort &&
                <>
                    <span
                        className={styles.arrow}
                    >
                        {orderArrow[order]}
                    </span>
                    <span
                        className={styles.clearSorting}
                        onClick={handleClearClick}
                    >
                        ×
                    </span>
                </>
            }
        </th>
    );
};

const orderArrow = {
    'desc': '⬇',
    'asc': '⬆'
};

export default THeader;
