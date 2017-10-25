import * as React from 'react';
import {CSSProperties} from 'react';
import {Theme, withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu'
import PostItem from "./PostItem"
import {connect} from "react-redux"
import {getAllPostsWorker} from "../actions/thunk-actions"
import {Dispatch} from "redux"
import CategoryList from "./CategoryList"

const drawerWidth = 240;

const styles: Partial<CSSProperties> = (theme: Theme) => ({
    root: {
        width: '100%',
        height: 'auto',
        minHeight: 800,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        minHeight: 800,
        height: 'auto',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});


class HomeScreen extends React.Component <any, any> {
    state = {
        mobileOpen: false,
    };

    componentDidMount(): void {
        this.props.fetchAllPosts()
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    render() {
        console.log(this.props)
        console.log(this.props.posts)

        const {classes, theme} = this.props;

        const drawer = (
            <div>
                <div className={classes.drawerHeader}/>
                <Divider/>
                <CategoryList cat={[{path: 'd', name: 'fsf'}]}/>
                <Divider/>
            </div>
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" noWrap>
                                Responsive drawer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            type="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            onRequestClose={this.handleDrawerToggle}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <Drawer
                            type="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <div className="flex-div-row">
                            <PostItem/>
                            <PostItem/>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    posts: state.PostState ? state.PostState.posts : null,
    isLoading: state.PostState ? state.PostState.isLoading : true
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchAllPosts: () => getAllPostsWorker(dispatch, {})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(HomeScreen))
