import * as React from 'react'
import IconButton from 'material-ui/IconButton'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'
import ThumbUpIcon from 'material-ui-icons/ThumbUp'
import ThumbDownIcon from 'material-ui-icons/ThumbDown'
import Typography from 'material-ui/Typography'

interface RatingControlProps {
    voteScore: number,
    upVote: () => void
    downVote: () => void
}

interface EditControlProps {
    deleteIt: () => void,
    editIt: () => void,
}

export const EditControls = (props: EditControlProps) => (
    <div className="flex-div-column">
        <IconButton color="accent" aria-label="Edit" onClick={() => props.editIt()}>
            <ModeEditIcon />
        </IconButton>
        <IconButton color="primary" aria-label="Add" onClick={() => props.deleteIt()}>
            <DeleteIcon />
        </IconButton>
    </div>
)

export const RatingControls = (props: RatingControlProps) => (
    <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
    }}>
        <IconButton aria-label="UpVote" onClick={() => props.upVote()}>
            <ThumbUpIcon />
        </IconButton>
        <Typography type="subheading" style={{ marginTop: '15px' }}>{props.voteScore}</Typography>
        <IconButton aria-label="DownVote" onClick={() => props.downVote()}>
            <ThumbDownIcon />
        </IconButton>
    </div>
)