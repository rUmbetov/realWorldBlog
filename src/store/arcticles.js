import { createSlice } from '@reduxjs/toolkit';

import { fetchGloballyArticles, createArticle, updateArticle, deleteArticle } from './api';

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
