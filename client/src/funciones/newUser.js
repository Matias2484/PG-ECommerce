export default async function newUser(data){
    
    
    var user = await fetch('http://localhost:4000/auth',{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    const res = await user.json();
    
    console.log(res);
    /* window.localStorage.setItem("token",res.token) */
    return res
    
}//guardar en la carpeta nueva