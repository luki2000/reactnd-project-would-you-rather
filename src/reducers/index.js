import {combineReducers} from 'redux';

import {users} from './users';
import {authUser, isAuthenticated} from './authentication';
import {questions} from './questions';

export default combineReducers({users, authUser, isAuthenticated, questions})