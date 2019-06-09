import React from 'react';
import cx from 'classnames';

import styles from './Boolean.module.css';

type BooleanT = React.HTMLProps<HTMLSpanElement> & {
    val: boolean
};

const Boolean = ({
    val,
    ...props
}: BooleanT) => (
    <span
        className={cx(styles.boolean, {
            [styles.booleanPositive]: val,
            [styles.booleanNegative]: !val
        })}
        {...props}
    >
        {val ? 'Yes': 'No'}
    </span>
);

export default React.memo<BooleanT>(Boolean);
