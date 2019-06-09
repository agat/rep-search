import React from 'react';

import styles from './Input.module.css';


type RefT = HTMLInputElement;

type InputT = React.HTMLProps<HTMLInputElement>;

const Input = React.forwardRef<RefT, InputT>((props, ref) => (
    <input
        className={styles.input}
        ref={ref}
        {...props}
    />
));

export default Input;
