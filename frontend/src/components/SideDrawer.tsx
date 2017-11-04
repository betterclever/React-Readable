import * as React from "react"
import { Avatar, Divider, Drawer, ListItem, ListItemText } from "material-ui"
import { Link } from "react-router-dom"
import { Home } from "material-ui-icons"
import CategoryList from "./CategoryList"

export const SideDrawer = (props: any) => {
    return <Drawer
        type="permanent">
        <div>
            <Link to="/" style={{textDecoration: 'none'}}>
                <ListItem button>
                    <Avatar>
                        <Home/>
                    </Avatar>
                    <ListItemText primary="Home"/>
                </ListItem>
            </Link>
            <Divider/>
            <CategoryList/>
        </div>
    </Drawer>
}