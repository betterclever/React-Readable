import * as React from 'react'
import Toolbar from 'material-ui/Toolbar'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { EditControls, RatingControls } from './Controls'
import './styles/ViewPost.css'
import CommentSection from './CommentSection'
import { Comment, Post } from '../utils/model'
import { RouteComponentProps } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import {
    deletePostWorker,
    downVotePostWorker,
    getPostCommentsWorker,
    getPostWorker,
    upVotePostWorker
} from '../actions/thunk-actions'
import { isUndefined } from 'util'

interface ViewPostProps extends RouteComponentProps<any> {
    comments: { [id: string]: Comment[]; },
    posts: Post[],
    fetchPost: (postId: string) => Promise<any>
    fetchComments: (postId: string) => Promise<any>,
    upVotePost: (postId: string) => Promise<any>,
    deletePost: (postId: string) => Promise<any>,
    downVotePost: (postId: string) => Promise<any>
}

class ViewPost extends React.Component<ViewPostProps, any> {

    constructor(props: any) {
        super(props)
    }

    componentDidMount(): void {
        const postID = this.props.match.params.id
        this.props.fetchPost(postID)
        this.props.fetchComments(postID)
    }

    render(): JSX.Element {
        const postID = this.props.match.params.id
        const post = this.props.posts[postID]
        const postComments = this.props.comments[postID]

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
                    {(!isUndefined(post) && !(isUndefined(post.deleted)) && !post.deleted) ?
                        (<div className="flex-div-column">
                            <div className="flex-div-row" id="post-main">
                                <div className="flex-div-column">
                                    <div style={{marginLeft: 10, minWidth: 240}}>
                                        <Typography type="headline" color="primary" style={{paddingBottom: 10}}>
                                            {post.title}
                                        </Typography>
                                        <Typography type="body2">Written by <b>{post.author}</b></Typography>
                                        <Typography
                                            type="body2">{(new Date(post.timestamp)).toLocaleString()}</Typography>
                                    </div>
                                    <div className="flex-div-row">
                                        <RatingControls voteScore={post.voteScore}
                                                        upVote={() => this.props.upVotePost(post.id)}
                                                        downVote={() => this.props.downVotePost(postID)}/>
                                        <Typography style={{fontSize: 14, marginTop: 15}}>
                                            <b> {post.commentCount} comments </b>
                                        </Typography>
                                    </div>
                                </div>
                                <EditControls deleteIt={() => {
                                    this.props.deletePost(post.id).then(() => this.props.history.push('/'))
                                }} editIt={() =>
                                    this.props.history.push(`/edit/${post.id}`)}/>
                            </div>
                            <Typography id="post-body" type="body2">{post.body}</Typography>
                            <Typography style={{
                                textSize: '15px',
                                margin: '10px 20px'
                            }}>
                                <b>COMMENTS</b>
                            </Typography>
                            <CommentSection
                                refreshPost={() => this.props.fetchPost(post.id)}
                                parentID={post.id}
                                comments={postComments}/>
                        </div>) :
                        (<div style={{margin: 20}}> No such post</div>)
                    }
                </Paper>
            </div>
        </div>
    }
}

const mapStateToProps = (state: any) => ({
    posts: state.posts.posts,
    comments: state.comments
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchPost: (postId: string) => getPostWorker(dispatch, postId),
    deletePost: (postId: string) => deletePostWorker(dispatch, postId),
    fetchComments: (postId: string) => getPostCommentsWorker(dispatch, postId),
    upVotePost: (postId: string) => upVotePostWorker(dispatch, postId),
    downVotePost: (postID: string) => downVotePostWorker(dispatch, postID)
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)