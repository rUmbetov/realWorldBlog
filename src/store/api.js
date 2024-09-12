import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchGloballyArticles = createAsyncThunk(
  'article/fetchGloballyArticles',
  async ({ offset = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const createArticle = createAsyncThunk('article/createArticle', async (dataArticle, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    const articleData = {
      title: dataArticle.title,
      description: dataArticle.description,
      body: dataArticle.body,
      ...(dataArticle.tags && dataArticle.tags[0] && { tagList: dataArticle.tags }),
    };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    const data = await response.json();
    if (!response.ok) {
      rejectWithValue(data.err);
    }
  } catch (err) {
    rejectWithValue(err.message);
  }
});
export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async ({ title, description, body, tagList, slug }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const articleData = {
        title,
        description,
        body,
        ...(tagList && tagList.length > 0 && { tagList }),
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article: articleData }),
      });
      const data = await response.json();
      if (!response.ok) {
        rejectWithValue(data.err);
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk('article/deleteArticle', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      rejectWithValue(data.err);
    }
  } catch (err) {
    rejectWithValue(err.message);
  }
});

export const fetchNewUser = createAsyncThunk('newUser/fetchNewUser', async (dataNewUser, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
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
