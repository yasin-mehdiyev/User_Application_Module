import axios from "../helpers/setupAxios";

// GET - /user
export async function getAllUsers(): Promise<any> {
    try {
        let { data } = await axios.get(`/user`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

// GET - /user/:id
export async function getUserById(id: string): Promise<any> {
    try {
        let { data } = await axios.get(`/user/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

// POST - /user
export async function createUser(payload: object): Promise<any> {
    try {
        let response = await axios.post(`/user`, payload);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

// PUT - /user/:id
export async function updateUser(id: string, payload: object): Promise<any> {
    try {
        let response = await axios.put(`/user/${id}`, payload);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

// DELETE - /user/:id
export async function deleteUser(id: string): Promise<any> {
    try {
        let response = await axios.delete(`/user/${id}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};