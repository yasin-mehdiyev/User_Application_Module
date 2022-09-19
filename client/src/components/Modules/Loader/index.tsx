import { FC } from 'react';

// React_Spinner_Loader
import { Circles } from 'react-loader-spinner';

// Loader.module.css
import classes from "../../../styles/Modules/Loader/Loader.module.css";

const Index: FC = () => {
    return (
        <div className={classes.loader}>
            <Circles color="#00BFFF" height={80} width={80} />
        </div>
    )
}

export default Index;