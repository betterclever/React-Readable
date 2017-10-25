import * as React from "react";
import {EditControls, RatingControls} from "./Controls"
import Typography from "material-ui/Typography"
import './styles/Comment.css'

class Comment extends React.Component {
    render(): JSX.Element {
        return <div className="flex-div-row" id='comment-div'>
            <div className="flex-div-column">
                <div style={{marginLeft: 10, minWidth: 240}}>
                    <Typography id='comment' color='default'>Hello! How are you?</Typography>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography type='body2' style={{paddingRight: 10}}>10 October, 2017</Typography>
                        <Typography type='body2'>Written by <b>AuthorName</b></Typography>
                    </div>
                </div>
                <div className="flex-div-row">
                    <RatingControls voteScore={5} upVote={()=> {}} downVote={()=> {}}/>
                </div>
            </div>
            {/*<EditControls/>*/}
        </div>
    }
}

export default Comment