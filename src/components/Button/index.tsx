import React from 'react';

import styles from './Button.module.css';


type ButtonT = React.HTMLProps<HTMLDivElement>;

const Button = ({
    children,
    ...props
}: ButtonT) => (
    <div
        className={styles.button}
        {...props}
    >
        {children}
    </div>
);

export default React.memo<ButtonT>(Button);
