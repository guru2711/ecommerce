import { Grid, Container } from "@material-ui/core";
import Product from "../Product";
import Spinner from "../Spinner";
import Banner from "../Banner";
import FilterProduct from "../FilterProduct"
import "./style.css";
import { useState } from "react";

const Products = ({ products, addProduct }) => {
  const [searchResult, setSearchResult] = useState([])
  if (!products.length) return <Spinner />;


  return (
    <div>
      <FilterProduct
      addProduct={addProduct}
       searchResult={searchResult}
       setSearchResult={setSearchResult}
       />
      {!searchResult.length &&    
       <><Banner /><Container id="products">
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <Product product={product} addProduct={addProduct} />
              </Grid>
            ))}
          </Grid>
        </Container></>}
  
    </div>
  );
};

export default Products;
