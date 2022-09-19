import { FC } from 'react';

// 404.module.css
import classes from "../../styles/Modules/404/404.module.css";

const Index: FC = () => {
    return (
        <div className={classes.not_found}>
            Error, 404 not found page
        </div>
    )
}

export default Index;