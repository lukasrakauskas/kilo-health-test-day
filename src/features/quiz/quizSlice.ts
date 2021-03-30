import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { QuizDTO } from './quizDto';

export const fetchQuiz = createAsyncThunk<QuizDTO, string>(
  'quiz/fetchQuiz',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://rnd-stage.kilo.live/api/quizzes/${slug}?api_token=${process.env.REACT_APP_KILO_API_KEY}`
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const data = await response.json();
      return data as QuizDTO;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface QuizState {
  quiz: QuizDTO | null;
  status: 'idle' | 'pending' | 'succeded' | 'error';
  error: string;
}

const initialState: QuizState = {
  quiz: null,
  status: 'idle',
  error: '',
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuiz.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchQuiz.fulfilled, (state, { payload: quiz }) => {
      state.quiz = quiz;
      state.status = 'succeded';
    });
    builder.addCase(fetchQuiz.rejected, (state) => {
      state.error = 'failed to fetch quiz';
      state.status = 'error';
    });
  },
});

export default quizSlice.reducer;
