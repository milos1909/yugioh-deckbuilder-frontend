import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import RenameDeckDialog from "./deck/renameDeckDialog";
import DeleteDeckDialog from "./deck/deleteDeckDialog";

const AllDeckDialogs = ({}) => {
    const {state} = useListActions();

    return (
        <>
            <RenameDeckDialog isOpen={state.type == listAction.UPDATE} />
            <DeleteDeckDialog isOpen={state.type == listAction.DELETE} />
        </>
        
    );
}

export default AllDeckDialogs;