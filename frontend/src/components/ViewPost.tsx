import * as React from "react"
import Toolbar from "material-ui/Toolbar"
import AppBar from "material-ui/AppBar"
import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"
import {EditControls, RatingControls} from "./Controls"
import './styles/ViewPost.css'
import CommentSection from "./CommentSection"

class ViewPost extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {value: null}
    }

    render(): JSX.Element {
        return <div style={{width: 'auto'}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" color="inherit">
                        Readable
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="flex-div-center-align">
                <Paper style={{height: 'auto', width: 700, margin: 20}}>
                    <div className="flex-div-column">
                        <div className="flex-div-row" id="post-main">
                            <div className="flex-div-column">
                                <div style={{marginLeft: 10, minWidth: 240}}>
                                    <Typography type='headline' color='primary' style={{paddingBottom: 10}}>
                                        Hello! How are you?</Typography>
                                    <Typography type='body2'>Written by <b>AuthorName</b></Typography>
                                    <Typography type='body2'>10 October, 2017</Typography>
                                </div>
                                <div className="flex-div-row">
                                    <RatingControls voteScore={5} upVote={()=> {}} downVote={()=> {}}/>
                                    <Typography style={{fontSize: 14, marginTop: 15}}><b> 15 comments </b></Typography>
                                </div>
                            </div>
                            {/*<EditControls/>*/}
                        </div>
                        <Typography id='post-body' type='body2'>Long Description. Long Description. Long Description.
                            Long Description. Long Description.</Typography>
                        <Typography style={{textSize: '15px', margin: '10px 20px'}}><b>COMMENTS</b></Typography>
                        <CommentSection/>
                    </div>
                </Paper>
            </div>
        </div>
    }
}

export default ViewPost