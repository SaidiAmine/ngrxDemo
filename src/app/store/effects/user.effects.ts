import {Injectable} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IAppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess} from '../actions/user.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {selectUserList} from '../selectors/user.selectors';
import {of} from 'rxjs';
import {IUserHttp} from '../../models/http-models/user-http.interface';

@Injectable()
export class UserEffects {

  constructor(
    private _userService: UserService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}

  @Effect()
    // A pipe function takes an n sequence of operations; in which each operation takes an argument; process it; and gives the processed
    // output as an input for the next operation in the sequence. The result of a pipe
    // function is a function that is a bundled up version of the sequence of operations.
  getUser$ = this._actions$.pipe(
    // 'ofType' filters an Observable of Actions into an observable of
    // the actions whose type strings are passed to it.
    ofType<GetUser>(EUserActions.GetUser),
    // You use map to transform a collection of items into a collection of different items.
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const selectedUser = users.filter(user => user.id === +id)[0];
      return of(new GetUserSuccess(selectedUser));
    })
  );

  @Effect()
  getUsers$ = this._actions$.pipe(
    // Declare what action is to be procceeded.
    ofType<GetUsers>(EUserActions.GetUsers),
    // Dismiss the last Observable ^, return Observable<IUserHTTP> \/
    switchMap(() => this._userService.getUsers()),
    // Switch to a new Observable, create a new GetUsersSuccess and inject IUser[] (through constructor) in its payload.
    switchMap((userHTTP: IUserHttp) => of(new GetUsersSuccess(userHTTP.users)))
  );
}
