export async function deletePerfil (id,token){
    var deletePrfoile= await fetch (`https://pg-henry-ecommerce.herokuapp.com/auth/delete/${id}`,{
        method:'DELETE',
        headers:{
          'x-token':token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    });
    deletePrfoile= await deletePrfoile.json()
    return deletePrfoile
};

export async function deleteGenero(genero,token) {
  var deleteGenero= await fetch (`https://pg-henry-ecommerce.herokuapp.com/generos/delete?genero=${genero}`,{
      method:'DELETE',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  });
  deleteGenero= await deleteGenero.json()
  return deleteGenero
};

export async function deleteBook (id,token){
  var deleteBooks= await fetch (`https://pg-henry-ecommerce.herokuapp.com/productos/delete/${id}`,{
      method:'DELETE',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  });
  deleteBooks= await deleteBooks.json()
  return deleteBooks
};


export async function deletePromo (id,token){
  var deleteBooks= await fetch (`https://pg-henry-ecommerce.herokuapp.com/promo/delete/${id}`,{
      method:'DELETE',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  });
  deleteBooks= await deleteBooks.json()
  return deleteBooks
};