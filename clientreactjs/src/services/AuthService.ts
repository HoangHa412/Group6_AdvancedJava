import axios from "axios";
import ConstantList from "@/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/auth";

export function registerUser(user: any) {
    const url = API_PATH + '/register';
    return axios.post(url, user);
}

export function authenticateUser(user: any) {
    const url = API_PATH + '/authenticate';
    return axios.post(url, user);
}

export function registerPassword({ token, msv, firstName, lastName, password, confirmPassword }: { token: string, msv: string, firstName: string, lastName: string, password: string, confirmPassword: string }) {
    const url = API_PATH + '/registerPassword';
    return axios.post(url, { token, msv, firstName, lastName, password, confirmPassword });
}

export function forgotPassword(email: string) {
    const url = API_PATH + '/forgotPassword';
    return axios.post(url, { email });
}

export function resetPassword(token: string, password: string, confirmPassword: string) {
    const url = API_PATH + '/resetPassword';
    return axios.post(url, { token, password, confirmPassword });
}
