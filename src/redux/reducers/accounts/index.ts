import { IAccount } from '../../../models/accounts/IAccount';
import { Routine } from 'redux-saga-routines';
import { fetchAccountsRoutine } from '../../routines';
import { FetchingStatus } from '../../state';
import { accountsInitialState } from './initalState';

export interface IAccountsListState {
  accounts?: IAccount[];
  accountsRequestStatus: FetchingStatus;
  accountsRequestError?: string;
}

export const accountsRecords = (
  state = accountsInitialState,
  action: Routine<any> // TODO Add typings for routines
): IAccountsListState => {
  switch (action.type) {
    case fetchAccountsRoutine.TRIGGER:
      return {
        ...state,
        accountsRequestStatus: 'loading'
      };
    case fetchAccountsRoutine.SUCCESS: {
      return {
        ...state,
        accounts: action.payload,
        accountsRequestStatus: 'succeeded'
      };
    }
    case fetchAccountsRoutine.FAILURE:
      return {
        ...state,
        accountsRequestStatus: 'failed',
        accountsRequestError: action.payload.toString()
      };
    default:
      return state;
  }
};