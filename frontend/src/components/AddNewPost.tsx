import * as React from 'react'
import {
    AppBar,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Toolbar,
    Typography
} from 'material-ui'
import DoneIcon from 'material-ui-icons/Done'

import './styles/PostItem.css'
import './styles/AddNewPost.css'
import Button from 'material-ui/Button'
import { Category, SubmitPost } from '../utils/model'
import { Dispatch } from 'redux'
import { addPostWorker, getCategoriesWorker } from '../actions/thunk-actions'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import * as uuid from 'uuid'

interface AddNewPostState {
    partialPost: {
        title: string,
        body: string,
        author: string,
        category: string,
    }
}

interface AddNewPostProps extends RouteComponentProps<any> {
    addPost: (post: SubmitPost) => Promise<any>,
    refreshCategories: () => Promise<any>,
    categories: Category[]
}

export class AddNewPost extends React.Component<AddNewPostProps, AddNewPostState> {

    constructor(props: AddNewPostProps) {
        super(props)
        this.state = {
            partialPost: {
                title: '',
                body: '',
                category: '',
                author: ''
            }
        }
    }

    componentDidMount() {
        this.props.refreshCategories().then((categories) => {
            this.setState({
                partialPost: {
                    ...this.state.partialPost,
                    category: categories.categories[0].name
                }
            })
        })
    }

    render(): JSX.Element {
        return (<div style={{width: 'auto'}}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            Add New Post
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="flex-div-center-align">
                    <Paper style={{height: 'auto', width: 500, margin: 20}}>
                        <div className="flex-div-column">
                            <TextField className="input-field" label="Title" onChange={
                                (event) => this.setState({
                                    partialPost: {
                                        ...this.state.partialPost,
                                        title: event.target.value
                                    }
                                })
                            }/>
                            <TextField className="input-field" label="Body" multiline onChange={
                                (event) => this.setState({
                                    partialPost: {
                                        ...this.state.partialPost,
                                        body: event.target.value
                                    }
                                })
                            }/>
                            <TextField className="input-field" label="Author" onChange={
                                (event) => this.setState({
                                    partialPost: {
                                        ...this.state.partialPost,
                                        author: event.target.value
                                    }
                                })
                            }/>
                            <FormControl style={{margin: 10, width: '200px'}}>
                                <InputLabel htmlFor="age-simple">Category</InputLabel>
                                <Select value={this.state.partialPost.category}
                                        input={<Input id="age-simple"/>}
                                        onChange={(event) => this.setState({
                                            partialPost: {
                                                ...this.state.partialPost,
                                                category: event.target.value
                                            }
                                        })}>
                                    {this.props.categories.map((category) =>
                                        <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>
                </div>
                <div style={{position: 'fixed', bottom: 20, right: 20}}>
                    <Button fab
                            color="accent"
                            aria-label="add"
                            onClick={() => {
                                const partialPost = this.state.partialPost
                                this.props.addPost({
                                    id: uuid.v4(),
                                    title: partialPost.title,
                                    body: partialPost.body,
                                    author: partialPost.author,
                                    timestamp: Date.now(),
                                    category: partialPost.category
                                }).then(() => {
                                    this.props.history.push('/')
                                })
                            }}>
                        <DoneIcon/>
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    categories: state.categories.categories
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    refreshCategories: () => getCategoriesWorker(dispatch, {}),
    addPost: (post: SubmitPost) => addPostWorker(dispatch, post)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost)