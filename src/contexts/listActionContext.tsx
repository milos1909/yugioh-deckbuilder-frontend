import listAction from "@/core/listAction";
import DeckModel from "@/models/deckModel";
import UserModel from "@/models/userModel";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

interface ListActionState {
  type: string | null;
  row: UserModel | DeckModel;
  reload: boolean;
}

type ListAction =
    { type: typeof listAction.RELOAD; payload: boolean }
  | { type: typeof listAction.UPDATE; payload: UserModel | DeckModel }
  | { type: typeof listAction.DELETE; payload: UserModel | DeckModel }
  | { type: typeof listAction.RESET };

interface ListActionContextType {
  state: ListActionState;
  dispatch: Dispatch<ListAction>;
}

interface ListActionProviderProps {
  children: ReactNode;
}

const listActionContext = createContext<ListActionContextType | undefined>(undefined);

const initialState : ListActionState = {
    type: null,
    row: {} as UserModel | DeckModel ,
    reload: false
}

const listActionReducer = (state: ListActionState, action: ListAction) => {
    switch (action.type) {
        case listAction.RELOAD:
            return {...state, reload: action.payload};
        case listAction.UPDATE:
            return {...state, row: action.payload, type: listAction.UPDATE};
        case listAction.DELETE:
             return { ...state, row: action.payload, type: listAction.DELETE };
        case listAction.RESET:
            return initialState;
        default:
            return state;
    }
};

const ListActionProvider = ({ children }: ListActionProviderProps ) => {
    const [state, dispatch] = useReducer(listActionReducer, initialState);

    const value = { state, dispatch };

    return (
        <listActionContext.Provider value={value}>
            {children}
        </listActionContext.Provider>
    );
};

const useListActions = () => {
    const context = useContext(listActionContext);

    if (context === undefined) {
        throw new Error('listActions must be used within a ListActionProvider');
    }
    return context;
};

export { ListActionProvider, useListActions };

