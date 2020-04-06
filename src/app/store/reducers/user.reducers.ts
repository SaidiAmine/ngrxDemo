import {initialUserState, IUserState} from '../state/user.state';
import {EUserActions, UserActions} from '../actions/user.actions';


export const userReducers = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUserSuccess: {
      return {
        ...state, // ...state => spread operator, keep the same object but change after the comma ,
        selectedUser: action.payload
      };
    }
    case EUserActions.GetUsersSuccess: {
      return {
        ...state,
        users: action.payload
      };
    }
    default:
      return state;
  }
};
