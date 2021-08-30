import React from 'react'
import CreatableSelect from 'react-select/creatable';

export default function Promo2x1({dias,date}) {
    return (
        <div>
            <h2>Producto gratis por candidad de compra</h2>
            <div>
                <h3>Duracion</h3>
                <p>Selecciona la fecha de inicio</p>
                <input type='date' require min={date} name='inicio'/>
                <p>Selecciona la fecha de Fin</p>
                <input type='date' min={date} require name='fin'/>                
            </div>
            <div>
                <h3>Reglas</h3>
                <p>A partir de que cantidas de productos</p>
                <input type='number' require name='items'/>
                <p>Cuantos productos gratis</p>
                <input type='number' name='gratis' />    
                <p>Dias de Promocion</p>
                <CreatableSelect
                    options={dias}
                    placeholder="Seleccionar..."
                    isMulti
                    onChange={(e)=>{}}
                />        
            </div>
        </div>
    )
}
