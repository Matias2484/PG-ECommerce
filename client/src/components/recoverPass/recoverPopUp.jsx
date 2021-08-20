import React from 'react'
import ReactCircleModal from 'react-circle-modal'
import   './recoverPopUp.css'


    const RecoverPopUp = () => {
    return (
        <ReactCircleModal 
        backgroundColor="rgb(244, 164, 96)"
        toogleComponent={onClick => (
            <button className="openPop" onClick={onClick}>
            Recuperar contraseña
            </button>
        )}
        offsetX={0}
        offsetY={0}
        >
        {(onClick) => (
            
            <div style={{ backgroundColor: '#fff', padding: '1em'}}>
            <button className="closePop" onClick={onClick}>
                X
            </button>
            <input className="inputMail" type="text" placeholder="Escribe tu email..." />
            <button className="enviaPop">enviar</button>
            </div>
        )}
        </ReactCircleModal>
    )
    }

    export default RecoverPopUp
