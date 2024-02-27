import { useState, useEffect } from "react";
import { getProjectById } from "../../../api/projects";
import { useParams } from "react-router";
import { Project } from "../../../api/projects"
import { Typography, Box, Paper, Container } from "@mui/material"

export const ProjectPage = () => {

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
      <Box
        component={"div"}
        sx={{
          borderRadius: '8px',
          objectFit: "cover"
        }}
      >
        <img src={'https://picsum.photos/800/300'} width={'100%'} alt="hero" />
      </Box>
      <Box component={"div"}>
        <Paper square={false} elevation={24} sx={{ width: '80vw' }}>
          <Typography>{project?.id}</Typography>
          <Typography>{project?.project_name}</Typography>
          <Typography>{project?.description}</Typography>
        </Paper>
      </Box>
    </>
  );
};