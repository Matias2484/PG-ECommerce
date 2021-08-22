

export default function validarEmail() {
    return async function ({email}){
    if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3,4})+$/.test(email)){
    alert("La dirección de email " +  email   + " es correcta!.");
    } else {
        alert("La dirección de email es incorrecta!.");
    }
}
}