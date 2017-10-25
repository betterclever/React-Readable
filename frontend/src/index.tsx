import * as React from 'react';
import './index.css';
import ResponsiveDrawer from "./components/HomeScreen"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import createMuiTheme from "material-ui/styles/createMuiTheme"
import {BrowserRouter} from "react-router-dom"
import {Route, Switch} from "react-router"
import AddNewPost from "./components/AddNewPost"
import ViewPost from "./components/ViewPost"
import * as Redux from "redux"
import rootReducer from "./reducers/index"
import {Provider} from 'react-redux'
import * as ReactDOM from 'react-dom'
import thunk from "redux-thunk"
import * as api from './utils/api'

const theme = createMuiTheme();

const store = Redux.createStore(
    rootReducer,
    {},
    Redux.compose(
        Redux.applyMiddleware(thunk),
        window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f
    )
);

api.getCategories().then((posts) => {
    console.log(posts)
})

//const action = await store.dispatch(fetchAllPostsWorker({}));

function App() {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={ResponsiveDrawer}/>
                        <Route exact path="/addNew" component={AddNewPost}/>
                        <Route exact path="/post" component={ViewPost}/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        </Provider>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);

//registerServiceWorker();
