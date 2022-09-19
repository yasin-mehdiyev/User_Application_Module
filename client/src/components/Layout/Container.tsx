import { FC } from 'react';

// Models
import { ChildrenProps } from '../../models/Layout/ChildrenProps';

const Container: FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}

export default Container;