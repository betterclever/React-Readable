import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import ResponsiveDrawer from "./components/ResponsiveDrawerLayout"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import createMuiTheme from "material-ui/styles/createMuiTheme"
import {BrowserRouter} from "react-router-dom"
import {Route, Switch} from "react-router"
import AddNewPost from "./components/AddNewPost"

const theme = createMuiTheme();
theme.breakpoints

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ResponsiveDrawer}/>
                    <Route exact path="/addNew" component={AddNewPost}/>
                </Switch>
            </BrowserRouter>

        </MuiThemeProvider>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
