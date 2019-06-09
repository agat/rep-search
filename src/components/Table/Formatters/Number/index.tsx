import React from 'react';
import cx from 'classnames';
import numeral from 'numeral';

import styles from './Number.module.css';

type NumberT = React.HTMLProps<HTMLSpanElement> & {
    val: number
};

const Number = ({
    val,
    ...props
}: NumberT) => (
    <span
        className={cx(styles.number, {
            [styles.numberPositive]: val > 0,
            [styles.numberNegative]: val < 0
        })}
        {...props}
    >
        {numeral(val).format('0,0')}
    </span>
);

export default React.memo<NumberT>(Number);
