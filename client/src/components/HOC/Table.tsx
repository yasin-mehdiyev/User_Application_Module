import { FC } from 'react';

// Table.module.css
import classes from "../../styles/HOC/Table/Table.module.css";

// React Icons
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// Models
import { TableProps } from '../../models/HOC/TableProps';

const Table: FC<TableProps> = ({ data, handleRemove, handleDetailUser, handleUpdateUser }) => {
    return (
        <table className={classes.users}>
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Birth date</th>
                    <th>Gender</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((user: any, index: number) => (
                        <tr key={index} onClick={() => handleDetailUser(user?.id)}>
                            <td>{index + 1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.surname}</td>
                            <td>{user?.birthDate}</td>
                            <td>{user?.gender === "0" ? "Man" : "Woman"}</td>
                            <td className={classes.actions}>
                                <span className={classes.edit} onClick={(e) => handleUpdateUser(e, user?.id)}>
                                    <AiOutlineEdit />
                                </span>
                                <span className={classes.delete} onClick={(e) => handleRemove(e, user?.id, user)}>
                                    <AiOutlineDelete />
                                </span>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table;