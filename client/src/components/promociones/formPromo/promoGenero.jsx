import React from 'react'
import CreatableSelect from 'react-select/creatable';

export default function PromoGenero({dias, date, state, generos, diasPromo, opcionGenero, handleSubmit, handleDias, handleGenders, handleChange}) {

    return (
        <form>
            <h2>Descuento por Categoria</h2>
            <div>
                <h3>Duracion</h3>
                <p>Selecciona la fecha de inicio</p>
                <input type='date' name='fechaInicio' value={state.fechaInicio} min={date} require onChange={(e)=>handleChange(e)} />
                <p>Selecciona la fecha de Fin</p>
                <input type='date' min={state.fechaInicio} name='fechaFinal' value={state.fechaFinal} require onChange={(e)=>handleChange(e)} />                
            </div>
            <div>
                <h3>Reglas</h3>
                <p>Dias de Promocion</p>
                <CreatableSelect
                    options={dias}
                    placeholder="Seleccionar..."
                    isMulti
                    onChange={(e)=>handleDias(e)}
                />  
                <p>Genero en Promocion</p>
                <CreatableSelect
                    options={opcionGenero}
                    placeholder="Seleccionar..."
                    isMulti
                    onChange={(e)=>handleGenders(e)}
                />   
                <p>Porcentaje de descuento</p>
                <p><input type='range' name='porcentaje' value={state.porcentaje} require onChange={(e)=>handleChange(e)} /> <label>{state.porcentaje}%</label></p>
                {state.fechaInicio && state.fechaFinal && diasPromo.length>0 && generos.length>0 && <button onClick={(e)=>handleSubmit(e)}>Crear</button>}
            </div>
        </form>
    )
}
