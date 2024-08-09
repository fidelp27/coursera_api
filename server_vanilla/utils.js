// Objetivo: obtener los datos de una petición POST
const getRequestData =(req)=>{
    // devuelve una promesa
    return new Promise((resolve, reject)=>{
        try{
            let body = "";
            // escuchar el evento data
            req.on('data', (chunk)=>{
                body += chunk.toString();
            })
            // escuchar el evento end y resolver la promesa
            req.on('end', ()=>{
                resolve(body)
            })
        }catch(error){
            reject(error)
    }
})}
module.exports = getRequestData;