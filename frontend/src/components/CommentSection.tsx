import * as React from 'react'
import './styles/Comment.css'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { Button, TextField } from 'material-ui'
import { Comment } from '../utils/model'
import { isUndefined } from 'util'
import CommentItem from './CommentItem'
import { addCommentWorker, editCommentWorker } from '../actions/thunk-actions'
import { connect, Dispatch } from 'react-redux'
import * as uuid from 'uuid'

interface CommentSectionState {
    partialComment: {
        author: string,
        body: string
    },
    editComment: {
        id: string,
        body: string
    },
    editDialogOpen: boolean
}

interface CommentSectionProps {
    parentID: string,
    comments: Comment[],
    addComment: (comment: Partial<Comment>) => Promise<any>,
    editComment: (comment: any) => Promise<any>
}

class CommentSection extends React.Component<CommentSectionProps, CommentSectionState> {
    handleRequestClose = () => {
        this.setState({
            editDialogOpen: false
        })
    }

    constructor(props: CommentSectionProps, context: any) {
        super(props, context)
        this.state = {
            partialComment: {
                author: '',
                body: ''
            },
            editComment: {
                id: '',
                body: ''
            },
            editDialogOpen: false
        }
    }

    editComment = (comment: Comment) => {
        this.setState({
            editComment: {
                id: comment.id,
                body: comment.body
            },
            editDialogOpen: true
        })
    }

    render(): JSX.Element {
        return <div className="flex-div-column" id="comment-section">
            {(isUndefined(this.props.comments) || this.props.comments.length === 0) ?
                (<div style={{margin: 20}}>No Comments Available</div>) :
                this.props.comments
                    .filter((comment) => !comment.deleted)
                    .map((comment) =>
                        <CommentItem key={comment.id}
                                     editComment={this.editComment}
                                     comment={comment}/>)}
            <div className="flex-div-column">
                <TextField style={{marginBottom: '5px', width: '600px'}}
                           label="Author"
                           value={this.state.partialComment.author}
                           onChange={event => this.setState({
                               partialComment: {
                                   ...this.state.partialComment,
                                   author: event.target.value
                               }
                           })}/>
                <TextField multiline
                           style={{marginBottom: '15px', width: '600px'}}
                           label="Comment"
                           value={this.state.partialComment.body}
                           onChange={event => this.setState({
                               partialComment: {
                                   ...this.state.partialComment,
                                   body: event.target.value
                               }
                           })}/>
                <Button raised color="primary"
                        onClick={() => this.props.addComment({
                            author: this.state.partialComment.author,
                            body: this.state.partialComment.body,
                            parentId: this.props.parentID,
                            id: uuid.v4(),
                            timestamp: Date.now()
                        }).then(() => this.setState({
                            partialComment: {
                                author: '',
                                body: ''
                            }
                        }))}>Comment</Button>
            </div>

            <Dialog open={this.state.editDialogOpen} onRequestClose={this.handleRequestClose}>
                <DialogTitle>Edit Content</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Comment"
                        fullWidth
                        value={this.state.editComment.body}
                        onChange={(event) => this.setState({
                            editComment: {
                                ...this.state.editComment,
                                body: event.target.value
                            }
                        })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.editComment({
                        id: this.state.editComment.id,
                        timestamp: Date.now(),
                        body: this.state.editComment.body
                    }).then(() => this.setState({
                        editDialogOpen: false
                    }))} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addComment: (comment: any) => addCommentWorker(dispatch, comment),
    editComment: (comment: any) => editCommentWorker(dispatch, comment)
})

export default connect(null, mapDispatchToProps)(CommentSection)