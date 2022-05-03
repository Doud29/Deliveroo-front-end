import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./composent/Header";
import Footer from "./composent/Footer";
import bigmac from "./composent/bigmac.jpg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Use Effect");

    const fetchData = async () => {
      const response = await axios.get("http://localhost:3200/");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <h1>En cours de chargement...</h1>
  ) : (
    <div className="App">
      <Header />
      <div className="bloc1">
        <div className="introduction">
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <div className="repas">
          <img src={data.restaurant.picture} alt="photo" />
        </div>
      </div>
      <div className="category">
        <div className="category-1">
          {data.categories.map((item, index) => {
            return (
              <div>
                <h2 key={index}>{item.name}</h2>
                <div className="description">
                  {item.meals.map((item1, index2) => {
                    return (
                      <div className="box">
                        <div className="infos-repas">
                          <h3>{item1.title}</h3>
                          <div className="text">
                            <p>{item1.description}</p>
                            <p>{item1.price} €</p>
                          </div>
                        </div>

                        <div className="image-repas">
                          {item1.picture ? (
                            <img src={item1.picture} alt="photo" />
                          ) : (
                            <img src={bigmac} alt="photo" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );

            console.log(item.name);
          })}
        </div>
        <div className="paiement">
          <button className="bouton-paiement">Valider mon panier</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
