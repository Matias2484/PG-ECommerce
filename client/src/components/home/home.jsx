import './home.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBooks } from '../../Actions';
import Filter from '../filter/filter';

export function Home () {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllBooks())
    },[dispatch])

    return (
        <div className='home'>
                <Filter/>
            <Link to='/details' >
                <button>Detalles</button>
            </Link>
        </div>
    )
}

export default Home;