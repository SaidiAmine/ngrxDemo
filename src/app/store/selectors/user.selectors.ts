import {IAppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {IUserState} from '../state/user.state';

// Const where to save Users
const selectUsers = (state: IAppState) => state.users;

// Create selector to getAllUsers
export const selectUserList = createSelector(
  selectUsers,
  (state: IUserState) => state.users
);

// Create selector to getOneUser
export const selectSelectedUser = createSelector(
  selectUsers,
  (state: IUserState) => state.selectedUser
);
