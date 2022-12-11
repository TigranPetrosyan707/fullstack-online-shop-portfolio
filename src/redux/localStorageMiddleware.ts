import {
   isAsyncThunkAction,
   isFulfilled,
   isAnyOf,
   createListenerMiddleware
} from '@reduxjs/toolkit';
import { TUser } from '../types';
import { signIn, signUp } from './userSlice';

const signInListenerMiddleware = createListenerMiddleware();

signInListenerMiddleware.startListening({
   matcher: isAnyOf(isAsyncThunkAction(signIn)),
   effect: (action, listenerApi) => {
      const shouldSave = isFulfilled(signIn);
      const state: { user: TUser } = listenerApi.getState() as { user: TUser };
      if (shouldSave(action)) {
         localStorage.setItem(
            'currentUser',
            JSON.stringify({ isLogged: true, id: state.user.id, email: state.user.email })
         );
      }
   }
});

const signUpListenerMiddleware = createListenerMiddleware();

signUpListenerMiddleware.startListening({
   matcher: isAnyOf(isAsyncThunkAction(signUp)),
   effect: (action, listenerApi) => {
      const shouldSave = isFulfilled(signUp);
      const state: { user: TUser } = listenerApi.getState() as { user: TUser };
      if (shouldSave(action)) {
         const { id, email, name } = state.user;
         localStorage.setItem('currentUser', JSON.stringify({ isLogged: true, id, email, name }));
      }
   }
});

export const signInMiddleware = signInListenerMiddleware.middleware;
export const signUpMiddleware = signUpListenerMiddleware.middleware;
