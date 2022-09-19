import { FC, Fragment } from 'react';

// Models
import { ButtonProps } from '../../models/HOC/ButtonProps';

// Button.module.css
import classes from "../../styles/HOC/Button/Button.module.css";

const Button: FC<ButtonProps> = ({ content, onClick }) => {
  return (
    <Fragment>
      <button className={classes.button} onClick={() => onClick?.()}>{content}</button>
    </Fragment>
  )
}

export default Button;