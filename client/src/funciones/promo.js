export async function createPromo (promo,token){
    var promoCreate= await fetch (`http://localhost:4000/promo`, {
        method: 'post',
        headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo)
    });
    promoCreate= await promoCreate.json()

    return promoCreate
}

