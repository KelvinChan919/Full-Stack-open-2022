import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getall = ()=>{
    const request = axios.get(baseurl)
    return request.then(response => {return response})
}

const create =(newObject) => {
    const request = axios.post(baseurl,newObject)
    return request.then(response => {return response})
}

const update = (id,newObject) => {
    const request = axios.put(`${baseurl}/${id}`, newObject)
    return request.then(response => {return response}) 
}

export default { getall, create, update }