import React from 'react'
import CreatableSelect from 'react-select/creatable';

export default function PromoGenero({dias,opcionGenero, date}) {

    return (
        <div>
            <h2>Descuento por Categoria</h2>
            <div>
                <h3>Duracion</h3>
                <p>Selecciona la fecha de inicio</p>
                <input type='date' min={date} require name='inicio'/>
                <p>Selecciona la fecha de Fin</p>
                <input type='date' min={date} require name='fin'/>                
            </div>
            <div>
                <h3>Reglas</h3>
                <p>Dias de Promocion</p>
                <CreatableSelect
                    options={dias}
                    placeholder="Seleccionar..."
                    isMulti
                    onChange={(e)=>{}}
                />  
                <p>Genero en Promocion</p>
                <CreatableSelect
                    options={opcionGenero}
                    placeholder="Seleccionar..."
                    isMulti
                    onChange={(e)=>{}}
                />   
                <p>Porcentaje de descuento</p>
                <input type='range' name='porcentaje' />    

            </div>
        </div>
    )
}
