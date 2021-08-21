import './comentarios.css';
import React from 'react';

export function Comentarios(){

    /* const dispatch = useDispatch()
    const filteredAllBooks = useSelector((state) => state.filteredAllBooks.reverse());

    useEffect(() => {
        dispatch(getAllBooks())
        
    },[dispatch]) */

    return(
        <div className="contenedor_comentarios">
        <div>
        <span className='nombre'>Valoramos tu opinión sobre este libro</span>
        </div>
         
        <label className='labelForm' htmlFor="comentario">
            <textarea className='comentario' id='comentario' name='comentario'></textarea>
        </label>
        </div>
    )
}

export default Comentarios;