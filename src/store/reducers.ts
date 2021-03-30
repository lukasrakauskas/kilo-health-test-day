import { combineReducers } from '@reduxjs/toolkit';
import quiz from 'features/quiz/quizSlice';

const rootReducer = combineReducers({
  quiz,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
