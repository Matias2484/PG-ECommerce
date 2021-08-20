

export async function generarPago (payload){
    
    let r;
      await fetch ('http://localhost:4000/orden', {
        method: 'POST',
        header:{'x-token': []},
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }).then(res => res.json())
      .then(data => r = data)
      ;
      
      console.log(r)
  };

  