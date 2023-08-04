import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import { userRequest } from "../utils/config";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import Button from "@mui/material/Button";

const TaskCard = ({ title, desc, isCompleted, index, fetchOrders, id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChanged = async (event) => {
    await userRequest.patch(`/api/task/update/${id}`, {
      isCompleted: event.target.checked,
    });
    fetchOrders();
  };

  const handleDelete = async () => {
    await userRequest.delete(`/api/task/delete/${id}`);
    fetchOrders();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      title: title,
      desc: desc,
    },
    onSubmit: async ({ title, desc }) => {
      try {
        const res = await userRequest.patch(`/api/task/update/${id}`, {
          title: title,
          desc: desc,
        });
        fetchOrders();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Grid item key={index} xs={12} sm={8} md={4}>
        <Card
          sx={{
            bgcolor: "white",
            width: 250,
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
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleOpen}>
              <EditIcon />
            </IconButton>
            <Checkbox
              checked={isCompleted}
              onChange={handleChanged}
              inputProps={{ "aria-label": "controlled" }}
            />
          </CardActions>
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              label="title"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="description"
              type="text"
              name="desc"
              onChange={handleChange}
              value={values.desc}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              update
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TaskCard;
