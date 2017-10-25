import * as React from "react"
import {CircularProgress, List} from "material-ui"
import {Link} from "react-router-dom"
import Typography from "material-ui/Typography"
import {Category} from "../utils/model"
import {Dispatch} from "redux"
import {getCategoriesWorker} from "../actions/thunk-actions"
import {connect} from "react-redux"

interface ICategoryListProps {
    categories: Array<Category>,
    cat: Array<Category>
    isLoading: boolean,
    fetchCategories: () => Promise<any>
}

class CategoryList extends React.Component<ICategoryListProps, any> {

    componentDidMount(): void {
        this.props.fetchCategories()
    }

    render(): JSX.Element {
        return (this.props.isLoading) ?
            <CircularProgress id="spinner"/> :
            <List>
                <div/>
                {console.log(this.props)}
                {this.props.categories.map(category => {
                    console.log(category)
                    return <div key={category.name} style={{padding: 8}}>
                        <Link to={`/${category.path}`}>
                            <Typography>{category.name}</Typography>
                        </Link>
                    </div>
                })}
            </List>
    }

}

const mapStateToProps = (state: any) => {
    console.log(state)
    return {
        categories: state.categories ? state.categories.categories : [],
        isLoading: state.categories ? state.categories.isFetching : true
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchCategories: () => getCategoriesWorker(dispatch, {})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)