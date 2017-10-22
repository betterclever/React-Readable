import * as React from "react"
import {FormControl, InputLabel, MenuItem, TextField} from "material-ui";
import Select from "material-ui/Select"
import Input from "material-ui/Input"
import Typography from "material-ui/Typography"
import Toolbar from "material-ui/Toolbar"
import AppBar from "material-ui/AppBar"
import Paper from "material-ui/Paper"
import DoneIcon from "material-ui-icons/Done"

import './styles/PostItem.css'
import Button from "material-ui/Button"

export class AddNewPost extends React.Component <any, any> {

    constructor(props: any) {
        super(props)
        this.state = {value: null}
    }

    render(): JSX.Element {
        return <div style={{width: 'auto'}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" color="inherit">
                        Add New Post
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="flex-div-center-align">
                <Paper style={{height: 'auto', width: 500, margin: 20}}>
                    <div className="flex-div-column">
                        <TextField style={{margin: 10, width: '400px'}} label='Title'/>
                        <TextField style={{margin: 10, width: '400px'}} label="Body" multiline/>
                        <TextField style={{margin: 10, width: '400px'}} label='Author'/>
                        <FormControl style={{margin: 10, width: '200px'}}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
                                value={this.state.value}
                                input={<Input id="age-simple"/>}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Paper>
            </div>
            <div style={{position: 'fixed', bottom: 20, right: 20}}>
                <Button fab color="accent" aria-label="add">
                    <DoneIcon />
                </Button>
            </div>
        </div>

    }
}

export default AddNewPost