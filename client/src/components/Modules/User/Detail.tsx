import { FC } from 'react';

// Models
import { DetailProps } from '../../../models/Modules/User/DetailProps';

// Common.module.css
import classes from "../../../styles/Modules/User/Detail.module.css";

const Detail: FC<DetailProps> = ({ user }) => {

    const { data }: any = user;

    return (
        <div className={classes.user_wrapper}>
            <div className={classes.user}>
                <ul>
                    <li>
                        <span>
                            <strong>Id:</strong>
                        </span>
                        <span>{data?.id}</span>
                    </li>
                    <li>
                        <span>
                            <strong>Name:</strong>
                        </span>
                        <span>{data?.name}</span>
                    </li>
                    <li>
                        <span>
                            <strong>Surname:</strong>
                        </span>
                        <span>{data?.surname}</span>
                    </li>
                    <li>
                        <span>
                            <strong>Birth date:</strong>
                        </span>
                        <span>{data?.birthDate}</span>
                    </li>
                    <li>
                        <span>
                            <strong>Gender:</strong>
                        </span>
                        <span>{data?.gender === "0" ? "Man" : "Woman"}</span>
                    </li>
                    <li>
                        <span>
                            <strong>Profession:</strong>
                        </span>
                        <span>{data?.profession}</span>
                    </li>
                    <li>
                        <span>
                            <strong>User status:</strong>
                        </span>
                        <span>{data?.isActive ? "Active" : "Inactive"}</span>
                    </li>
                    <li>
                        <span>
                            <strong>Biography:</strong>
                        </span>
                        <span className={classes.biography}>{data?.biography}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Detail;