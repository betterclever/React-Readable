import * as React from 'react'
import { CircularProgress, List, ListItem, ListItemText } from 'material-ui'
import { Link } from 'react-router-dom'
import { Category } from '../utils/model'
import { Dispatch } from 'redux'
import { getCategoriesWorker } from '../actions/thunk-actions'
import { connect } from 'react-redux'
import * as qs from 'querystring'
import { Bookmark } from 'material-ui-icons'
import Avatar from 'material-ui/Avatar'

interface CategoryListProps {
    categories: Array<Category>,
    isLoading: boolean,
    fetchCategories: () => Promise<any>
}

class CategoryList extends React.Component<CategoryListProps, any> {

    componentDidMount(): void {
        this.props.fetchCategories()
    }

    render(): JSX.Element {
        return (this.props.isLoading) ?
            <CircularProgress id="spinner" /> :
            <List>
                <div />
                {this.props.categories.map(category =>
                    <Link key={category.name}
                        style={{textDecoration: 'none'}}
                        to={{ pathname: '/', search: qs.stringify({ category: category.path }) }}>
                        <ListItem button>
                            <Avatar>
                                <Bookmark />
                            </Avatar>
                            <ListItemText primary={category.name.toUpperCase()} style={{ textDecoration: 'none' }} />
                        </ListItem>
                    </Link>
                )}
            </List>
    }

}

const mapStateToProps = (state: any) => {
    return {
        categories: state.categories ? state.categories.categories : [],
        isLoading: state.categories ? state.categories.isFetching : true
    }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return {
        fetchCategories: () => getCategoriesWorker(dispatch, {})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)