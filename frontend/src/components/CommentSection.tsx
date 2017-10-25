import * as React from "react";
import './styles/Comment.css'
import Comment from "./Comment"
import Dialog, {DialogActions, DialogContent, DialogTitle} from "material-ui/Dialog"
import {Button, TextField} from "material-ui";

const AddComment = (props: any) => {
    return <div className='flex-div-column'>
        <TextField style={{marginBottom: '5px', width: '600px'}} label='Author'/>
        <TextField multiline style={{marginBottom: '15px', width: '600px'}} label='Comment'/>
        <Button raised color='primary'>Comment</Button>
    </div>
}

class CommentSection extends React.Component {
    handleRequestClose = () => {

    };

    render(): JSX.Element {
        return <div className='flex-div-column' id='comment-section'>
            <Comment/>
            <Comment/>
            <Comment/>
            <AddComment/>
            <Dialog open={false} onRequestClose={this.handleRequestClose}>
                <DialogTitle>Edit Content</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Author"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Comment"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

export default CommentSection