import React from "react";
import {
  Grid,
  Paper,
  Container,
  InputBase,
  IconButton,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
// import SelectCategory from "./SelectCategory";
import { commerce } from "../../lib/commerce";
import Product from "../Product";
import "./style.css";

// const defaultCategory = { id: 0, name: "All" };


const FilterProduct = ({
  categories,
  setSearchResult,
  searchResult,
  addProduct
}) => {
  const [keyword, setKeyword] = React.useState("");
  const [resultMessage, setResultMessage] = React.useState("");
  // const [selectedCategory, setSelectedCategory] =
  //   React.useState(defaultCategory);

  const handleInputChange = (event) => {
    if (!keyword || !event.target.value) {
      setResultMessage("");
      setSearchResult([]);
      // setSelectedCategory(defaultCategory);
    }
    setKeyword(event.target.value);
  };

  // const handleSelectChange = (event) => {
  //   const { value } = event.target;
  //   const category = categories.find((cat) => cat.id === value);
  //   if (value === 0) {
  //     setSelectedCategory(defaultCategory);
  //   } else {
  //     setSelectedCategory(category);
  //   }
  // };

  const onSubmoit = async (e,product) => {
    e.preventDefault();
    if (!keyword) {
      setResultMessage("You have to enter a product name");
    }
    if (keyword) {
      try {
        // const categoryId = categories.id
        //   ? { category_id: selectedCategory.id }
        //   : {};
        // const { data } = await commerce.products.list({
        //   query: keyword,
        //   ...categoryId
          
        // });
        const data = []
  await commerce.products.list({
          query: keyword,
          keyword
        }).then(response => response.data)
        .then(data1 => data.push(data1) )
      console.log(data)
        // eslint-disable-next-line no-undef
        if (data.length === 0) {
          setResultMessage("No result match");
          // setSearchResult([]);
          return;
        }
        setResultMessage("");
        setSearchResult(data);
      } catch (error) {
        setSearchResult([]);
      }
    }
  };

  return (
    <div className="filter-bar" >
      <Container>
        <Paper component="form" className="root" onSubmit={onSubmoit}>
          {/* <SelectCategory
            categories={[defaultCategory, ...categories]}
            selectedCategory={selectedCategory}
            onChange={handleSelectChange}
          /> */}
          <InputBase
            className="input"
            onChange={handleInputChange}
            placeholder="Search for a product"
            inputProps={{ "aria-label": "Search for a product" }}
          />
          <IconButton type="submit" aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        {resultMessage && <p className="result-message">{resultMessage}</p>}
        );
        {searchResult.length && (
          <div>
            <Grid container spacing={4}>
              {searchResult.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <Product product={product} addProduct={addProduct} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FilterProduct;