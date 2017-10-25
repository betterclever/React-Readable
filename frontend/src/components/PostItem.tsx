import * as React from "react"
import Paper from "material-ui/Paper"
import './styles/PostItem.css'
import Typography from "material-ui/Typography"
import {EditControls, RatingControls} from "./Controls"
import {Post} from "../utils/model"
import {deletePostWorker, downVotePostWorker, upVotePostWorker} from "../actions/thunk-actions"
import {connect} from "react-redux"

interface IPostItemProps {
    post: Post
    upVotePost: (id: string) => Promise<any>,
    downVotePost: (id: string) => Promise<any>
    deletePost: (id: string) => Promise<any>
}

class PostItem extends React.Component<IPostItemProps, {}> {

    render(): JSX.Element {
        const post = this.props.post
        return <Paper style={{
            height: 'auto',
            width: 'auto',
            margin: '10px'
        }}>
            <div className="flex-div-row">
                <div className="flex-div-column">
                    <div style={{marginLeft: 10, minWidth: 240}}>
                        <Typography type='headline' color='primary' style={{paddingBottom: 10}}>
                            {post.title}
                        </Typography>
                        <Typography type='body2'>Written by <b>{post.author}</b></Typography>
                        <Typography type='body2'>{post.timestamp}</Typography>
                    </div>
                    <div className="flex-div-row">
                        <RatingControls voteScore={post.voteScore} downVote={() => this.props.downVotePost(post.id)}
                                        upVote={() => this.props.upVotePost(post.id)}/>
                        <Typography style={{fontSize: 14, marginTop: 15}}><b> 15 comments </b></Typography>
                    </div>
                </div>
                <EditControls deleteIt={() => this.props.deletePost(post.id)}/>
            </div>
        </Paper>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    console.log(dispatch)
    return {
        upVotePost: (id: string) => upVotePostWorker(dispatch, id),
        downVotePost: (id: string) => downVotePostWorker(dispatch, id),
        deletePost: (id: string) => deletePostWorker(dispatch, id)
    }
}


export default connect(null, mapDispatchToProps)(PostItem)