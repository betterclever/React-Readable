import * as React from "react"
import Paper from "material-ui/Paper"
import './styles/PostItem.css'
import Typography from "material-ui/Typography"
import IconButton from "material-ui/IconButton"
import ModeEditIcon from "material-ui-icons/ModeEdit"
import DeleteIcon from "material-ui-icons/Delete"
import ThumbUpIcon from "material-ui-icons/ThumbUp"
import ThumbDownIcon from "material-ui-icons/ThumbDown"
import {EditControls, RatingControls} from "./Controls"


class PostItem extends React.Component<any, any> {

    render(): JSX.Element {
        return <Paper style={{
            height: 'auto',
            width: 'auto',
            margin: '10px'
        }}>
            <div className="flex-div-row">
                <div className="flex-div-column">
                    <div style={{marginLeft: 10, minWidth: 240}}>
                        <Typography type='headline' color='primary' style={{paddingBottom: 10}}>Hello! How are
                            you?</Typography>
                        <Typography type='body2'>Written by <b>AuthorName</b></Typography>
                        <Typography type='body2'>10 October, 2017</Typography>
                    </div>
                    <div className="flex-div-row">
                        <RatingControls/>
                        <Typography style={{fontSize: 14, marginTop: 15}}><b> 15 comments </b></Typography>
                    </div>
                </div>
                <EditControls/>
            </div>
        </Paper>
    }
}


export default PostItem