export async function deletePerfil (id){
     var deletePrfoile= await fetch (`http://localhost:4020/auth/delete/${id}`);
    return deletePrfoile
};