import * as React from "react"
import IconButton from "material-ui/IconButton"
import ModeEditIcon from "material-ui-icons/ModeEdit"
import DeleteIcon from "material-ui-icons/Delete"
import ThumbUpIcon from "material-ui-icons/ThumbUp"
import ThumbDownIcon from "material-ui-icons/ThumbDown"
import * as Icons from "material-ui-icons"
import Typography from "material-ui/Typography"


export const EditControls = (props: any) => (
    <div className="flex-div-column">
        <IconButton color="accent" aria-label="Edit">
            <ModeEditIcon/>
        </IconButton>
        <IconButton color="primary" aria-label="Add">
            <DeleteIcon/>
        </IconButton>
    </div>
)

export const RatingControls = (props: any) => (
    <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
    }}>
        <IconButton aria-label="Like">
            <ThumbUpIcon/>
        </IconButton>
        <Typography type='subheading' style={{marginTop: '15px'}}>5</Typography>
        <IconButton aria-label="Dislike">
            <ThumbDownIcon/>
        </IconButton>
    </div>
)