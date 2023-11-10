// import React from 'react'

const getDataProjects = async () => {
  const fetchData = await fetch(
    "https://proyectos-molones-profes.onrender.com/listproject"
  );
  const dataJson = await fetchData.json();
  return dataJson;
};

export default getDataProjects;
