const fileServices = require('./fileService');
const errors = require('../helpers/constants');
const uuid = require("uuid");

const findAllUsers = async (status) => {
    const existUsers = await fileServices.readUserData();
    if (!existUsers) {
        return [];
    }

    if (status === undefined || status === null) return existUsers;

    const users = existUsers.filter((user) => user.deletedStatus === status);
    return users;
};

const findUserById = async (id) => {
    const existUsers = await findAllUsers(false);
    if (!existUsers) {
        return null;
    }
    const findUser = existUsers.find((user) => user.id === id);
    return findUser;
};

const createUser = async (data) => {
    const existUsers = await findAllUsers();

    if (!existUsers) {
        return null;
    }

    const findExist = existUsers.find((user) => user.name === data.name && user.surname === data.surname && user.deletedStatus === false);

    if (findExist) {
        return errors.DUPLICATE;
    }

    const payload = { id: uuid.v4(), ...data, deletedStatus: false };
    existUsers.push(payload);

    await fileServices.saveUserData(existUsers);
    return existUsers.length;
};

const updateUser = async (id, userValues) => {
    const findUser = await findUserById(id);

    if (!findUser) {
        return null;
    }

    const existUsers = await findAllUsers(false);
    const updatedUsers = existUsers.map(user => {
        if (user.id === findUser.id) {
            return { ...user, ...userValues };
        }
        return user;
    });

    await fileServices.saveUserData(updatedUsers);
    return existUsers.length;
};

const deleteUser = async (id) => {
    const findUser = await findUserById(id);

    if (!findUser) {
        return null;
    }

    const existUsers = await findAllUsers();
    const updatedUsers = existUsers.map(user => {
        if (user.id === findUser.id) {
            return { ...user, deletedStatus: true };
        }
        return user;
    });

    await fileServices.saveUserData(updatedUsers);
    return existUsers.length;
};

module.exports = { findAllUsers, findUserById, createUser, updateUser, deleteUser };