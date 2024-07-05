import React from 'react';
import './Products.css'


function ProductsList({ data }) {
  function truncatetext(text ,nums){
    let words = text.split(' ');
    if(words.length<=nums){
     return text
    }else{
      return words.slice(0 ,nums ).join(' ') +'....'
    }
  }
  return (
    <div>
   <div className="grid-container">
    {
      data.map((item)=>{
        return <div className="grid-item">
          <div>
            <img src= {item.image} alt = {item.id} style={{width:'130px'}} />
         <p> {item.title}</p>
         <p>{item.price}</p>
         <p>{truncatetext(item.description ,5)}</p>

          </div>
          
        </div>
      })
    }
 
    
</div>
    </div>
  );
}

export default ProductsList;
