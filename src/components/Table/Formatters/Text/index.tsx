import React from 'react';

import styles from './Text.module.css';


type TextT = React.HTMLProps<HTMLDivElement>;

const Text = ({
    children,
    ...props
}: TextT) => (
    <div
        className={styles.text}
        {...props}
    >
        <span className={styles.body}>
            {children}
        </span>
    </div>
);

export default React.memo<TextT>(Text);
