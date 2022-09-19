const userServices = require("../services/userService");
const errors = require("../helpers/constants");

// GET_ALL USER METHOD
const getUsers = async (_, res) => {
    const users = await userServices.findAllUsers(false);
    return res.status(200).json({
        success: true,
        data: users
    });
};

// GET_BY_ID USER METHOD
const getByIdUser = async (req, res) => {
    const id = req.params.id;
    const findUser = await userServices.findUserById(id);

    if (!findUser) {
        return res.status(404).json({
            success: false,
            message: `${id} id is not exist`
        });
    };

    return res.status(200).json({
        success: true,
        data: findUser
    });
};

// POST_USER METHOD
const createUser = async (req, res) => {
    const userData = req.body;

    if (Object.keys(userData).length !== 7 || userData?.name == null || userData?.surname == null || userData?.birthDate == null || userData?.gender == null || userData?.profession == null || userData?.isActive == null || userData?.biography == null) {
        return res.status(400).json({
            success: false,
            message: 'Bad Request'
        });
    }

    const createdResult = await userServices.createUser(userData);

    if (createdResult === errors.DUPLICATE) {
        return res.status(409).json({
            success: false,
            message: 'Username already exist'
        });
    }

    if (!createdResult) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'User data added successfully'
    });
};

// PUT_USER METHOD
const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    if (Object.keys(userData).length !== 7 || userData?.name == null || userData?.surname == null || userData?.birthDate == null || userData?.gender == null || userData?.profession == null || userData?.isActive == null || userData?.biography == null) {
        return res.status(400).json({
            success: false,
            message: 'Bad Request'
        });
    }

    const updateResult = await userServices.updateUser(id, userData);

    if (!updateResult) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }

    return res.status(200).json({
        success: true,
        message: `User updated successfully`
    });
};

// DELETE_USER METHOD
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const updateResult = await userServices.deleteUser(id);
    if (!updateResult) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }

    return res.status(200).json({
        success: true,
        message: `User deleted successfully`
    });
};

module.exports = { getUsers, getByIdUser, createUser, updateUser, deleteUser };