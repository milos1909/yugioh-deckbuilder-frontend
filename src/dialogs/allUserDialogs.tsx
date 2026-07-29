import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import UpdateUserDialog from "./user/updateUserDialog";
import DeleteUserDialog from "./user/deleteUserDialog";

const AllUserDialogs = ({}) => {
    const {state} = useListActions();

    return (
        <>
            <UpdateUserDialog isOpen={state.type == listAction.UPDATE} />
            <DeleteUserDialog isOpen={state.type == listAction.DELETE} />
        </>
        
    );
}

export default AllUserDialogs;