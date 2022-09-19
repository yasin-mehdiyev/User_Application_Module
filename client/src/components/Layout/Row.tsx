import { FC } from 'react';

// Models
import { ChildrenProps } from '../../models/Layout/ChildrenProps';

const Row: FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="row">
            {children}
        </div>
    )
}

export default Row;