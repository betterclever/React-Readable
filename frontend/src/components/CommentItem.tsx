import * as React from 'react'
import { EditControls, RatingControls } from './Controls'
import Typography from 'material-ui/Typography'
import './styles/Comment.css'
import { Dispatch } from 'redux'
import { deleteCommentWorker, downVoteCommentWorker, upVoteCommentWorker } from '../actions/thunk-actions'
import { connect } from 'react-redux'
import { Comment } from '../utils/model'

interface CommentItemProps {
    comment: Comment,
    upVote: (id: string) => Promise<any>,
    downVote: (id: string) => Promise<any>,
    editComment: (comment: Comment) => void,
    deleteComment: (id: string) => Promise<any>
}

class CommentItem extends React.Component<CommentItemProps, {}> {

    render(): JSX.Element {
        const comment = this.props.comment
        return <div className="flex-div-row" id="comment-div">
            <div className="flex-div-column">
                <div style={{ marginLeft: 10, minWidth: 240 }}>
                    <Typography id="comment" color="default">{comment.body}</Typography>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography
                            type="body2"
                            style={{ paddingRight: 10 }}>
                            {(new Date(comment.timestamp)).toLocaleString()}
                        </Typography>
                        <Typography type="body2">Written by <b>{comment.author}</b></Typography>
                    </div>
                </div>
                <div className="flex-div-row">
                    <RatingControls voteScore={comment.voteScore} upVote={() => this.props.upVote(comment.id)}
                        downVote={() => this.props.downVote(comment.id)} />
                </div>
            </div>
            <EditControls
                editIt={() => this.props.editComment(comment)}
                deleteIt={() => this.props.deleteComment(comment.id)} />
        </div>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    upVote: (id: string) => upVoteCommentWorker(dispatch, id),
    downVote: (id: string) => downVoteCommentWorker(dispatch, id),
    deleteComment: (id: string) => deleteCommentWorker(dispatch, id)
})

export default connect(null, mapDispatchToProps)(CommentItem)