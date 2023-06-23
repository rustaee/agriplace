import styled from "styled-components";
import Layout from "../../layouts/main/main.layout";
import { Link } from "react-router-dom";
import { useGetFruitsQuery } from "app/api";
import { Fruit } from "types/Fruit";
import { useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { addToCart, removeFromCart } from "../../store/cartSlice";

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
  const addedFruits = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleAddToCart = (fruit: Fruit) => {
    dispatch(addToCart(fruit));
  };

  const handleRemoveFromCart = (fruit: Fruit) => {
    dispatch(removeFromCart(fruit.id));
  };

  const isFruitInCart = (fruit: Fruit) => {
    return addedFruits.find((f) => f.id === fruit.id);
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
            {isFruitInCart(selectedFruit) ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveFromCart(selectedFruit)}
              >
                remove
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(selectedFruit)}
              >
                Add to cart
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="cart">
        <h1>Cart</h1>
        {addedFruits.map((fruit) => (
          <div key={fruit.id}>
            <h3 style={{ display: "inline-block" }}>{fruit.name} </h3>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveFromCart(fruit)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
      <div className="recent-products"></div>
    </App>
  );
};
