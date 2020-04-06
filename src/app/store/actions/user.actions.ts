import {Action} from '@ngrx/store';
import {IUser} from '../../models/user.interface';
import {logger} from 'codelyzer/util/logger';

export enum EUserActions {
  GetUsers = '[User] Get Users',
  GetUser = '[User] Get User',
  GetUsersSuccess = '[User] Get Users Success',
  GetUserSuccess = '[User] Get User Success'
}


export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: number) {  }
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: IUser[]) { }
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) { }
}

export type UserActions = GetUser | GetUsers | GetUserSuccess | GetUsersSuccess;
