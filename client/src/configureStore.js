import { throttle } from 'lodash';
import { createStore, applyMiddleware, compose  } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { loadState, saveState } from './actions';

export const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const persistedState = loadState();     
    const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(ReduxThunk)
        )
    );
    store.subscribe(throttle(() => {
        saveState({
            auth: store.getState().auth
        });
    }, 1000));
    return store;    
}

export default configureStore;