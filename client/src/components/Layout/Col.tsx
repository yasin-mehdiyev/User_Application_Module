import { FC } from 'react';

// Models
import { ColProps } from '../../models/Layout/ColProps';

const Col: FC<ColProps> = ({ children, device, size, textCenter }) => {
    return (
        <div className={`col-${device}-${size} mt-2 mb-2 ${textCenter ? "text-center" : ""}`}>
            {children}
        </div>
    )
}

export default Col;