import './comentarios.css';
import React from 'react';

export function Comentarios(){

    /* const dispatch = useDispatch()
    const filteredAllBooks = useSelector((state) => state.filteredAllBooks.reverse());

    useEffect(() => {
        dispatch(getAllBooks())
        
    },[dispatch]) */

    return(
        <label className='labelForm' htmlFor="comentario">
            <span className='nombre'>Comentario</span>
            <textarea className='comentario' id='comentario' name='comentario'></textarea>
        </label>
    )
}

export default Comentarios;