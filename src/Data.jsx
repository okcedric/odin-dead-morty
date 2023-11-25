import React, { useState, useEffect } from "react";


    const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/?name=morty&status=dead")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [])

if (data) {
 // get "Morty Smith" from Remplacement Dimension 
data = data.results.map((morty)=>{ 
 return morty.name === 'Morty Smith' ? {... morty, name : "Morty (Replacement Dimension)" } : morty 
}); 
}


export default data