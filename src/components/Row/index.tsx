import React from 'react';
import cx from 'classnames';

import styles from './Row.module.css';


type RowT = React.HTMLProps<HTMLDivElement> & {
    isCentered?: boolean
};

const Row = ({
    isCentered,
    ...props
}: RowT) => (
    <div
        className={cx(styles.row, {
            [styles.rowCentered]: isCentered
        })}
        {...props}
    />
);

export default React.memo<RowT>(Row);
