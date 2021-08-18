import Swal from 'sweetalert2';

function userLoginForm(){
    const { value: formValues } =  Swal.fire({
    title: 'User login!',
    html:
        
        '<h1> USUARIO </h1>'+
        '<input id="swal-input1" placeholder="USUARIO" class="swal2-input">' +
        '<h1> CONTRASEÑA </h1>'+
        '<input id="swal-input2" placeholder="CONTRASEÑA" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
        return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value
        ]
    }
    })

    if (formValues) {
    Swal.fire(JSON.stringify(formValues))
    }else{
        return null
    } 
    }



export { userLoginForm}