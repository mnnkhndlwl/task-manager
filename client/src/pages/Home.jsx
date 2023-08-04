import Navbar from "../components/Navbar";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { TaskInitialValues, TaskSchema } from "../schemas/taskSchema";
import { userRequest } from "../utils/config";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import TaskCard from "../components/TaskCard";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";

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

const stylecards = {
  position: "absolute",
  top: "25%",
  m: 5,
  flexGrow: 1,
};

const buttonstyle = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await userRequest.get(`/api/task/get`);
    setTasks(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: TaskInitialValues,
    validationSchema: TaskSchema,
    onSubmit: async ({ title, desc }) => {
      try {
        setLoading(true);
        const res = await userRequest.post("/api/task/add", {
          title,
          desc,
        });
        fetchOrders();
        setLoading(false);
      } catch (error) {
        setError(error.response["data"]["message"]);
      }
    },
  });

  return (
    <>
      <Navbar />
      {loading ? <LinearProgress /> : <></>}
      <Button
        sx={buttonstyle}
        variant="contained"
        onClick={handleOpen}
        endIcon={<AddIcon />}
      >
        Add task
      </Button>
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
              error={touched.title && errors.title !== undefined}
              helperText={
                touched.title && errors.title !== undefined ? errors.title : ""
              }
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
              error={touched.desc && errors.desc !== undefined}
              helperText={
                touched.desc && errors.desc !== undefined ? errors.desc : ""
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
            <Typography sx={{ color: "red" }}>{error}</Typography>
          </Box>
        </Box>
      </Modal>
      <Container sx={{ py: 8, my: 5 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {tasks.map((task, index) => (
            <TaskCard
              title={task.title}
              id={task._id}
              key={task._id}
              desc={task.desc}
              isCompleted={task.isCompleted}
              fetchOrders={fetchOrders}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
