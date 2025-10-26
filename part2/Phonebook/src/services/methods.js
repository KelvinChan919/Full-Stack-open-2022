import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getall = ()=>{
    const request = axios.get(baseurl)
    return request
}

const create =(newObject) => {
    const request = axios.post(baseurl,newObject)
    return request
}

const update = (id,newObject) => {
    const request = axios.put(`${baseurl}/${id}`, newObject)
    return request
}

export default { getall, create, update }