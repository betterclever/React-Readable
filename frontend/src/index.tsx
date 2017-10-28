import * as React from 'react'
import './index.css'
import HomeScreen from './components/HomeScreen'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import AddNewPost from './components/AddNewPost'
import ViewPost from './components/ViewPost'
import * as Redux from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import EditPost from './components/EditPost'
import * as Colors from 'material-ui/colors'

const theme = createMuiTheme({
    palette: {
        primary: Colors.red,
        secondary: Colors.blue,
    }
})

const store = Redux.createStore(
    rootReducer,
    {},
    Redux.compose(
        Redux.applyMiddleware(thunk),
        // tslint:disable-next-line:no-string-literal
        window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f
    )
)

const App = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={HomeScreen} />
                        <Route exact path="/addPost" component={AddNewPost} />
                        <Route exact path="/post/:id" component={ViewPost} />
                        <Route exact path="/edit/:id" component={EditPost} />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        </Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
)

// registerServiceWorker();
