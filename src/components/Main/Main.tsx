import styled from "styled-components";
import Layout from "../../layouts/main/main.layout";
import { Link } from "react-router-dom";
import { useGetFruitsQuery } from "app/api";
import { Fruit } from "types/Fruit";
import { useState } from "react";
import { Button } from "@mui/material";

const App = styled.div`
  display: grid;
  grid-template:
    "products product-view cart" 50%
    "products product-view recent" 50%/ 300px 1fr 300px;
  height: 100vh;

  .products {
    grid-area: products;
    background-color: lightblue;
    padding: 20px;
  }

  .product-view {
    padding: 20px;

    grid-area: product-view;
  }

  .cart {
    padding: 20px;

    grid-area: cart;
    background-color: lightgray;
  }

  .recent-products {
    padding: 20px;

    grid-area: recent;
    background-color: lightgreen;
  }
`;

export const Main = () => {
  const { isError, isLoading, isFetching, data: fruits } = useGetFruitsQuery();
  const [selectedFruit, setSelectedFruit] = useState<Fruit>();

  const addToCart = (fruit: Fruit) => {
    console.log("Added to cart", fruit);
  };

  return (
    <App>
      <div className="products">
        <h1>
          <Link to="/admin" style={{ color: "red" }}>
            Dashboard
          </Link>
        </h1>
        {isLoading && "Loading..."}
        {fruits?.map((fruit) => (
          <div key={fruit.id}>
            <h3
              onClick={() => setSelectedFruit(fruit)}
              style={{ cursor: "pointer" }}
            >
              {fruit.name}
            </h3>
          </div>
        ))}
      </div>
      <div className="product-view">
        {!selectedFruit && <h1>Select a fruit to see the details</h1>}
        {selectedFruit && (
          <div>
            <h1>{selectedFruit.name}</h1>
            <h3>{selectedFruit.description}</h3>
            <strong>Tags: </strong>
            {selectedFruit.tags?.map((tag, index) => (
              <span key={index}>{tag} - </span>
            ))}

            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(selectedFruit)}
            >
              Add to cart
            </Button>
          </div>
        )}
      </div>
      <div className="cart"></div>
      <div className="recent-products"></div>
    </App>
  );
};
