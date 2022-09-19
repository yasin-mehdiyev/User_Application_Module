import { FC } from 'react';

// React_Router_DOM
import { useNavigate } from 'react-router-dom';

// Components
import Button from '../../HOC/Button';

// Models
import { ActionProps } from '../../../models/Modules/Header/ActionProps';

const HeaderAction: FC<ActionProps> = ({ moreButton, backButton, addButton }) => {

    const navigate: any = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleAdd = () => {
        navigate('/add');
    };

    return (
        <div className={`d-flex ${moreButton ? "justify-content-between" : addButton ? "justify-content-end" : null}`}>

            {
                backButton && <Button content="Back" onClick={() => handleBack()} />
            }

            {
                addButton && <Button content="Add User" onClick={() => handleAdd()} />
            }

        </div>
    )
}

export default HeaderAction;