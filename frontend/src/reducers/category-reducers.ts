import {reducerWithInitialState} from "typescript-fsa-reducers"
import {Category} from "../utils/model"
import {getCategoriesAction} from "../actions/actions"

export interface CategoryState {
    categories: Category[],
    isFetching: boolean,
}

const INITIAL_STATE: CategoryState = {
    categories: [],
    isFetching: false
}

const CategoryReducer = reducerWithInitialState(INITIAL_STATE)
    .caseWithAction(getCategoriesAction.started, (state, {}) => {
        return {
            ...state,
            isFetching: true
        }
    })
    .caseWithAction(getCategoriesAction.done, (state, {payload}) => {
        console.log(payload.result)
        return {
            ...state,
            isFetching: false,
            categories: payload.result.categories
        }
    })

export default CategoryReducer