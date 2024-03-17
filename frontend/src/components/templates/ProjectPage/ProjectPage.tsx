import { useState, useEffect } from "react";
import { getProjectById } from "../../../api/projects";
import { useParams } from "react-router";
import { Project } from "../../../api/projects"
import { Typography, Box, Paper, Container, Grid } from "@mui/material"
import React from "react";

export const ProjectPage: React.FC<any> = () => {

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (id !== undefined) {
      getProjectById(parseInt(id)).then((res) => {
        setProject(res);
      })
    }
  }, [])


  return (
    <>
      <Box component={"div"}>
        <Paper square={true} elevation={24} sx={{ width: '80vw' }}>
          <Typography variant="h2">Project Name : {project?.project_name}</Typography>
          {/* <Typography>{project?.id}</Typography> */}
        </Paper>
      </Box>
      <Grid container mt={5}>
        <Grid xs={6} item>
          <Typography variant="body1">{project?.description}</Typography>
        </Grid>
        <Grid
          xs={6}
          item
        >
          <img src={'https://picsum.photos/800/300'} width={'contain'} alt="hero" />
        </Grid>
      </Grid>
    </>
  );
};