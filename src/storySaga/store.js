import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { storyReducer } from './StoryStypes';
import { storySaga } from './StorySaga';

// Tạo saga middleware
const sagaMiddleware = createSagaMiddleware();

// Redux Store với Redux Saga Middleware
const store = createStore(
    storyReducer,
  applyMiddleware(sagaMiddleware)
);

// Kích hoạt Saga
sagaMiddleware.run(storySaga);

export default store;