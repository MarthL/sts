import { useState, useEffect } from "react";
import { getProjectById } from "../../../api/projects";
import { useParams } from "react-router";
import { Project } from "../../../api/projects"
import { useQuery } from "react-query";
import { Typography } from "@mui/material"

export const ProjectPage = () => {

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project>();
  const [error, setError] = useState(false)

  useEffect(() => {
    if (id !== undefined) {
      getProjectById(parseInt(id)).then((res) => {
        setProject(res);
      })
    }
  }, [])
  console.log(project)


  return (
    <>
      <Typography>it works! Project ID: {id}</Typography>
    </>
  );
};