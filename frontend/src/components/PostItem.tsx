import * as React from 'react'
import Paper from 'material-ui/Paper'
import './styles/PostItem.css'
import Typography from 'material-ui/Typography'
import { EditControls, RatingControls } from './Controls'
import { Post } from '../utils/model'
import { deletePostWorker, downVotePostWorker, upVotePostWorker } from '../actions/thunk-actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { History } from 'history'

interface PostItemProps {
    post: Post,
    history: History,
    upVotePost: (id: string) => Promise<any>,
    downVotePost: (id: string) => Promise<any>
    deletePost: (id: string) => Promise<any>
}

class PostItem extends React.Component<PostItemProps, {}> {

    render(): JSX.Element {
        const post = this.props.post
        return <Paper
            style={{
                height: 'auto',
                width: 'auto',
                margin: '10px'
            }}>
            <div className="flex-div-row">
                <div className="flex-div-column">
                    <div style={{ marginLeft: 10, minWidth: 240 }}>
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                            <Typography type="headline" color="primary" style={{ paddingBottom: 10 }}>
                                {post.title}
                            </Typography>
                        </Link>
                        <Typography type="body2">Written by <b>{post.author}</b></Typography>
                        <Typography type="body2">
                            {(new Date(post.timestamp)).toLocaleString()}
                        </Typography>
                    </div>
                    <div className="flex-div-row">
                        <RatingControls
                            voteScore={post.voteScore}
                            downVote={() => this.props.downVotePost(post.id)}
                            upVote={() => this.props.upVotePost(post.id)}
                        />
                        <Typography style={{ fontSize: 14, marginTop: 15 }}>
                            <b>{post.commentCount} comments </b>
                        </Typography>
                    </div>
                </div>
                <EditControls
                    deleteIt={() => this.props.deletePost(post.id)}
                    editIt={() => this.props.history.push(`/edit/${post.id}`)}
                />
            </div>
        </Paper>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        upVotePost: (id: string) => upVotePostWorker(dispatch, id),
        downVotePost: (id: string) => downVotePostWorker(dispatch, id),
        deletePost: (id: string) => deletePostWorker(dispatch, id)
    }
}

export default connect(null, mapDispatchToProps)(PostItem)