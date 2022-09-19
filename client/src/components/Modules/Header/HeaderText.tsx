import { FC } from 'react';

// Models
import { TextProps } from '../../../models/Modules/Header/TextProps';

// Header.module.css
import classes from "../../../styles/Modules/Header/Header.module.css";

const HeaderText: FC<TextProps> = ({ title }) => {
    return (
        <div className={classes.header_text}>
            <h3>{title}</h3>
        </div>
    )
}

export default HeaderText;