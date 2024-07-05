import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import ProductsList from "./ProductsList";

function MainProduct() {
  const [data, setData] = useState([]);
  const [filterdProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCatogery, setSelectedCategory] = useState("");
  const [price, setPrice] = useState([0, 1000]);

  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setData(data);
    setFilteredProducts(data);
  };
  const fetchcategory = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
    setCategories(categories);
  };
  useEffect(() => {
    fetchData();
    fetchcategory();
  }, []);
  useEffect(() => {
    filteredData();
    console.log(search);
  }, [search]);

  useEffect(() => {
    rangedata();
    categry();
  }, [price, selectedCatogery]);

  //    for filetred products we call the function

  const filteredData = () => {
    let filtered = data;
    //for search operation
    if (search) {
      let filteredsearchdata = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filteredsearchdata);
    }
    //for price range
  };
  const rangedata = () => {
    let rdata = data;
    if (price) {
      let priceData = rdata.filter(
        (product) => product.price >= price[0] && product.price <= price[1]
      );

      setFilteredProducts(priceData);
    }
  };
  const categry = () => {
    let categorydata = data;
    if (selectedCatogery) {
      let finaldata = categorydata.filter(
        (item) => item.category === selectedCatogery
      );  
      setFilteredProducts(finaldata);
    }
  };
  return (
    <div style={{ marginTop: "100px" ,paddingLeft:'30px',paddingRight:'30px'}}>
      <Filters
        setSearch={setSearch}
        price={price}
        setPrice={setPrice}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductsList data={filterdProducts} />
    </div>
  );
}

export default MainProduct;
