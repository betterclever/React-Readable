import { AsyncActionCreators } from 'typescript-fsa'

function wrapAsyncWorker<TParameters, TSuccess, TError>(asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
    worker: (params: TParameters) => Promise<TSuccess>, ) {
    return function wrappedWorker(dispatch: Function, params: TParameters): Promise<TSuccess> {
        dispatch(asyncAction.started(params))
        return worker(params).then(result => {
            dispatch(asyncAction.done({ params, result }))
            return result
        }, (error: TError) => {
            dispatch(asyncAction.failed({ params, error }))
            throw error
        })
    }
}

export default wrapAsyncWorker