import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const API_URL = 'https://blog.kata.academy/api';
export const fetchNewUser = createAsyncThunk('newUser/fetchNewUser', async (dataNewUser, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: dataNewUser.username,
          email: dataNewUser.email,
          password: dataNewUser.password,
        },
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('isAuth', true);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.user.token);
      return data;
    } else {
      return rejectWithValue(data.errors);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
export const userAuth = createAsyncThunk('auth/userAuth', async (dataUser, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: dataUser.email,
          password: dataUser.password,
        },
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('isAuth', true);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.user.token);
      return data;
    } else {
      return rejectWithValue(data.errors);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
export const userUpdate = createAsyncThunk('update/userUpdate', async (dataUpdateUser, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          email: dataUpdateUser.email,
          username: dataUpdateUser.username,
          password: dataUpdateUser.password,
          image: dataUpdateUser.image,
        },
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.user.token);
      return data;
    } else {
      return rejectWithValue(data.err);
    }
  } catch (err) {
    rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'loading',
    error: null,
    isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuth');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNewUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        state.isAuth = true;
      })
      .addCase(fetchNewUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(userAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        state.isAuth = true;
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(userUpdate.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
