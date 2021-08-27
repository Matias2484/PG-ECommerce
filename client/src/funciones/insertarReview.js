export async function insertaReview(review, token) {

    var a = await fetch (`http://localhost:4000/productos/review`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(review)
    })
   var res = await a.json()
    return res;


};