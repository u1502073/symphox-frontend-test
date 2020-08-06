
import { install as installReduxLoop, combineReducers } from 'redux-loop'
import { compose, createStore,  } from "redux"
import reducers from "../reducers"


export default function configureStore(initialState) {
  const rootReducer = combineReducers({
    ...reducers
  })
  const enhancer = compose(
    installReduxLoop(),
    // applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
