import * as React from 'react'
import { CSSProperties } from 'react'
import {
    AppBar,
    Avatar,
    Button,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
} from 'material-ui'
import { Theme, withStyles } from 'material-ui/styles'
import { Add, Home, Menu } from 'material-ui-icons'
import CategoryList from './CategoryList'
import PostList from './PostList'
import { Link } from 'react-router-dom'

const drawerWidth = 240

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
        minHeight: 700,
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
})

class HomeScreen extends React.Component<any, any> {
    state = {
        mobileOpen: false,
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen })
    }

    render() {
        const { classes, theme } = this.props

        const drawer = (
            <div>
                <div className={classes.drawerHeader} />
                <Divider />
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <Avatar>
                            <Home />
                        </Avatar>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Divider />
                <CategoryList cat={[{ path: 'd', name: 'fsf' }]} />
            </div>
        )

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
                                <Menu />
                            </IconButton>
                            <Typography type="title" color="inherit" noWrap>
                                READABLE
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
                        <PostList history={this.props.history} location={this.props.location} />
                    </main>
                </div>
                <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
                    <Link to="/addPost">
                        <Button fab color="accent" aria-label="Add New Post">
                            <Add />
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default (withStyles(styles, { withTheme: true })(HomeScreen))
