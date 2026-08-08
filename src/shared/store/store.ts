import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from '@/shared/store/slices/auth.slice';
import projectReducer from '@/shared/store/slices/project.slice';
import membersReducer from '@/shared/store/slices/members.slice';
import epicsReducer from '@/shared/store/slices/epics.slice';
import { epicsApi } from '@/features/epics/services/epicsApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      project: projectReducer,
      members: membersReducer,
      epics: epicsReducer,
      [epicsApi.reducerPath]: epicsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(epicsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);