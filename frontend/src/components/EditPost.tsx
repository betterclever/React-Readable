import * as React from 'react'
import { TextField } from 'material-ui'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import DoneIcon from 'material-ui-icons/Done'
import Button from 'material-ui/Button'

import './styles/PostItem.css'
import { EditPostModel, Post } from '../utils/model'
import { editPostWorker, getPostWorker } from '../actions/thunk-actions'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

interface EditPostState {
    partialPost: {
        title: string,
        body: string,
    }
}

interface EditPostProps extends RouteComponentProps<any> {
    post: Post,
    fetchPost: (id: string) => Promise<any>,
    editPost: (post: EditPostModel) => Promise<any>
}

class EditPost extends React.Component<EditPostProps, EditPostState> {

    constructor(props: EditPostProps) {
        super(props)
        const id = props.match.params.id
        const post = this.props.post
        props.fetchPost(id)
        this.state = {
            partialPost: {
                title: post.title,
                body: post.body
            }
        }
    }

    render(): JSX.Element {
        const pp = this.state.partialPost
        return <div style={{ width: 'auto' }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" color="inherit">
                        Edit Post
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="flex-div-center-align">
                <Paper style={{ height: 'auto', width: 500, margin: 20 }}>
                    <div className="flex-div-column">
                        <TextField style={{ margin: 10, width: '400px' }} onChange={
                            (event) => this.setState({
                                partialPost: {
                                    ...this.state.partialPost,
                                    title: event.target.value
                                }
                            })} label="Title" value={pp.title} />
                        <TextField style={{ margin: 10, width: '400px' }} label="Body" onChange={
                            (event) => this.setState({
                                partialPost: {
                                    ...this.state.partialPost,
                                    body: event.target.value
                                }
                            })} value={pp.body} multiline />
                    </div>
                </Paper>
            </div>
            <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <Button fab color="accent" aria-label="add" onClick={() => this.props.editPost({
                    ...pp,
                    id: this.props.post.id
                }).then(() => {
                    return this.props.history.push('/')
                })}>
                    <DoneIcon />
                </Button>
            </div>
        </div>

    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        post: state.posts.posts[ownProps.match.params.id]
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchPost: (id: string) => getPostWorker(dispatch, id),
    editPost: (post: EditPostModel) => editPostWorker(dispatch, post)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)