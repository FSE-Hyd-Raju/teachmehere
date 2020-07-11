import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

// const sagaMiddleware = createSagaMiddleware();
// export default createStore(reducers, {}, applyMiddleware(sagaMiddleware));

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducers, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));


// export default store;
