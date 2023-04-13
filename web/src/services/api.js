const dataApi = (data) => {
    return fetch(
        "http://localhost:4001/api/projects/add",
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
        "http://localhost:4001/api/projects/all"
    ).then(response => response.json())
        .then(data => {
            return data;
        });
}



export default { dataApi, listProjectsApi };