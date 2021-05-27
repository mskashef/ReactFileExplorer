import axios from "axios";

export const getDir = dir => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8000/?path=${dir}`)
            .then(res => {
                let newPaths = res.data.result;
                resolve(newPaths)
            })
            .catch(err => reject(err))
    })
}