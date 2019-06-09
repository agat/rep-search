import React from 'react';

import styles from './Link.module.css';

type LinkT = React.HTMLProps<HTMLAnchorElement>;

const Link = ({
    children,
    ...props
}: LinkT) => (
    <a
        className={styles.link}
        {...props}
    >
        <span className={styles.body}>
            {children}
        </span>
    </a>
);

export default React.memo<LinkT>(Link);
