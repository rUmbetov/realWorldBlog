import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://blog.kata.academy/api';

export const fetchGloballyArticles = createAsyncThunk(
  'article/fetchGloballyArticles',
  async ({ offset = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/articles?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      if (response.ok) {
        console.log(data)
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
    const response = await fetch(`${API_URL}/articles`, {
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
      const response = await fetch(`${API_URL}/articles/${slug}`, {
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
    const response = await fetch(`${API_URL}/articles/${slug}`, {
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

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    articleCount: null,
    status: 'loading',
    error: null,
    offset: 0,
    limit: 10,
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGloballyArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGloballyArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.articleCount = action.payload.articlesCount;
      })
      .addCase(fetchGloballyArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch articles';
      })
      .addCase(createArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to create article';
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update article';
      })
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete article';
      });
  },
});
export const { setOffset, setLimit } = articleSlice.actions;
export default articleSlice.reducer;
