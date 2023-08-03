import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from '@mui/material/Checkbox';

const TaskCard = ({ title, desc, isCompleted, index }) => {

    const [checked, setChecked] = React.useState(isCompleted);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

  return (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <Card
        sx={{
          width: 300,
          bgcolor: "white",
          border: "1px solid #000",
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "black",
              textTransform: "capitalize",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="grey">
            {desc}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TaskCard;
