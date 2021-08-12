import './home.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllBooks } from '../../actions';

export function Home (props) {

    useEffect(() => {
        props.getAllBooks()
    },[])

    return (
        <div className='home'>
            <Link to='/details' >
                <button>Detalles</button>
            </Link>
        </div>
    )
}

export default connect(null, { getAllBooks } )(Home);