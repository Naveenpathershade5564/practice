import React from 'react'

function Filters({setSearch ,price, setPrice,setSelectedCategory,categories}) {
    const handlePriceRangeChange =(e)=>{
const value =parseInt(e.target.value) 
setPrice([0,value])

    }
  return (
    <div>
        <input type='search' placeholder='search for products
        ' onChange={(e)=>setSearch(e.target.value)}/>
        <br/>
        <br/>
        <br/>
        <label htmlFor="priceRange">Price range:</label>
      <input
        type="range"
        id="priceRange"
        min="0"
      max='1000'
        step="1"
        value={price[1]}
        onChange={handlePriceRangeChange}
      />
      <span>{`$0 - $${price[1]}`}</span>
      <div style={{paddingTop:'20px',paddingBottom:'20px '}}>
        <select onChange={(e)=>setSelectedCategory(e.target.value)}>
          <option value=''>All Categories</option>
        {categories.map((category ,ind)=>{
          return <option key={ind}>{category}</option> 
        })}
          
        </select>
      </div>
    </div>
  )
}

export default Filters