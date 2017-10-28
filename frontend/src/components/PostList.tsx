import * as React from 'react'
import './styles/PostItem.css'
import IconButton from 'material-ui/IconButton'
import { ArrowDownward, ArrowUpward } from 'material-ui-icons'
import PostItem from './PostItem'
import Select from 'material-ui/Select'
import { Input, MenuItem } from 'material-ui'
import { connect, Dispatch } from 'react-redux'
import { getAllPostsWorker } from '../actions/thunk-actions'
import { Post } from '../utils/model'
import * as qs from 'query-string'
import { isUndefined } from 'util'
import { withRouter } from 'react-router'
import { History } from 'history'

interface PostListProps {
    history: History,
    posts: { [id: string]: Post; },
    isLoading: boolean,
    fetchAllPosts: () => Promise<any>,
    location: Location
}

interface PostListState {
    sortOrder: 'ascending' | 'descending',
    sortOn: 'Date' | 'Title' | 'Author' | 'Votes'
}

class PostList extends React.Component<PostListProps, PostListState> {

    constructor() {
        super()
        this.state = {
            sortOrder: 'ascending',
            sortOn: 'Title'
        }
    }

    componentDidMount(): void {
        this.props.fetchAllPosts()
    }

    render(): JSX.Element {
        const { category } = qs.parse(this.props.location.search)
        return <div id="content-div">
            <div id="sort-header-div">
                <IconButton onClick={() => {
                    this.setState({
                        sortOrder: this.state.sortOrder === 'ascending' ? 'descending' : 'ascending'
                    })
                }}>
                    {(this.state.sortOrder === 'ascending') ? <ArrowDownward /> : <ArrowUpward />}
                </IconButton>
                <Select
                    value={this.state.sortOn}
                    onChange={(event) => this.setState({
                        sortOn: event.target.value as 'Date' | 'Title' | 'Author' | 'Votes'
                    })}
                    input={<Input id="sort-on" />}>
                    <MenuItem value="Date">Date</MenuItem>
                    <MenuItem value="Author">Author</MenuItem>
                    <MenuItem value="Title">Title</MenuItem>
                    <MenuItem value="Votes">Votes</MenuItem>
                </Select>
            </div>
            <div className="flex-div-row">
                {(Object).values(this.props.posts)
                    .filter((post: Post) => !post.deleted)
                    .sort((a, b) => {
                        if (this.state.sortOrder === 'descending') {
                            [a, b] = [b, a]
                        }
                        // tslint:disable-next-line:switch-default
                        switch (this.state.sortOn) {
                            case 'Date':
                                return (a.timestamp - b.timestamp)
                            case 'Votes':
                                return (a.voteScore - b.voteScore)
                            case 'Author':
                                return (a.author.localeCompare(b.author))
                            case 'Title':
                                return (a.title.localeCompare(b.title))
                        }
                    })
                    .filter((post) => isUndefined(category) ? true : post.category === category)
                    .map((post: Post) =>
                        <PostItem history={this.props.history} key={post.id} post={post} />
                    )}
            </div>
        </div>
    }
}

const mapStateToProps = (state: any) => ({
    posts: state.posts ? state.posts.posts : {},
    isLoading: state.posts ? state.posts.isLoading : true
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchAllPosts: () => getAllPostsWorker(dispatch, {})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostList))