const dataApi = (data) => {
    return fetch(
        "https://proyectos-molones-profes.onrender.com/api/projects/add",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json' }
        }
    ).then(response => response.json())
        .then(data => {
            console.log(data);
            return data.cardURL;
        })
}


//obtener el listado 
const listProjectsApi = () => {
    return fetch(
        "https://proyectos-molones-profes.onrender.com/api/projects/all"
    ).then(response => response.json())
        .then(data => {
            return data;
        });
}



export default { dataApi, listProjectsApi };