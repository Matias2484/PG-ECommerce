import swal from 'sweetalert';

export function logaut(){
    swal({
        title: "¡Hasta pronto!",
        text: "Logueado!",
        icon: "success",
        });
    window.localStorage.removeItem("token")
}