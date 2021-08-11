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

        </div>
    )
}

export default connect(null, { getAllBooks } )(Home);