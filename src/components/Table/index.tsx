import React from 'react';

import styles from './Table.module.css';


type TableT = React.HTMLProps<HTMLTableElement>;

const Table = ({
    children,
    ...props
}: TableT) => (
    <table
        className={styles.table}
        {...props}
    >
        {children}
    </table>
);

export default React.memo<TableT>(Table);
