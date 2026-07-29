import UserModel from "./userModel";

export default interface UserPageModel {
    users: UserModel[],
    totalPages: number,
    totalElements: number
}