import { authSlice, setUser, setIsAuthChecked, initialState } from './slice';
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './action';
import { TUser } from '@utils-types';

const testUser: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('authSlice', () => {
  it('должно вернуть начальное состояние', () => {
    expect(authSlice.reducer(undefined, { type: 'undefined' })).toEqual(
      initialState
    );
  });

  it('должно установить пользователя при вызове setUser', () => {
    const nextState = authSlice.reducer(initialState, setUser(testUser));
    expect(nextState.user).toEqual(testUser);
  });

  it('должно установить isAuthChecked при вызове setIsAuthChecked', () => {
    const nextState = authSlice.reducer(initialState, setIsAuthChecked(true));
    expect(nextState.isAuthChecked).toBe(true);
  });

  describe('extraReducers', () => {
    it('должно сбросить ошибку при registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.error).toBe(null);
    });

    it('должно установить пользователя и isAuthChecked при registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: testUser }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.user).toEqual(testUser);
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно установить ошибку и isAuthChecked при registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Error' }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.error).toBe('Error');
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно установить пользователя и isAuthChecked при loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: testUser }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.user).toEqual(testUser);
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно установить ошибку и isAuthChecked при loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Error' }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.error).toBe('Error');
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно очистить пользователя при logoutUser.fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const nextState = authSlice.reducer(
        { ...initialState, user: testUser },
        action
      );
      expect(nextState.user).toBe(null);
    });

    it('должно обновить пользователя при updateUser.fulfilled', () => {
      const updatedUser = { ...testUser, name: 'Updated User' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const nextState = authSlice.reducer(
        { ...initialState, user: testUser },
        action
      );
      expect(nextState.user).toEqual(updatedUser);
    });
  });
});
