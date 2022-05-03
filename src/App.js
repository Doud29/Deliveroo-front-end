/* ----------------------------------------------------------------------------- */
/*-----------------------// Import packages/composant //------------------------*/
/* ---------------------------------------------------------------------------- */

import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./composent/Header";
import Footer from "./composent/Footer";
import bigmac from "./composent/bigmac.jpg";

function App() {
  /* ----------------------------------------------------------------------------- */
  /*-----------------------------------// States //--------------------------------*/
  /* ---------------------------------------------------------------------------- */
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setcounter] = useState(0);
  const [counterCommande, setcounterCommande] = useState([0]);
  const [Descriptif, setDescriptif] = useState([
    { title: "Brunch authenthique 1 personne", price: 25 },
  ]);

  /* ---------------------------------------------------------------------------- */
  /* ----------------------------------/ USe effect  /--------------------------- */
  /* ---------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3200/");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  /* ---------------------------------------------------------------------------- */
  /* ------------------/ déclarations des fonctions /----------------------------- */
  /* ---------------------------------------------------------------------------- */

  /* ------------------/ récupréations du prix au clik /----------------------------- */

  const Handleprice = (price) => {
    const value = Number(price);
    try {
      setcounter(counter + value);
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ----------/ récupréations du titre et du prix du restaurant au Click /---------- */

  const HandleDescription = (title, price) => {
    const newTab = [...Descriptif];
    newTab.push({ title: title, price: price });
    setDescriptif(newTab);
  };

  /* ----------/ Ternaire pour éviter les problèmes lors du render/--------------- */

  return isLoading ? (
    <h1>En cours de chargement...</h1>
  ) : (
    <div className="App">
      <Header />
      {/* ---------------------------------------------------------------------------- */}
      {/* ------------------------/ Restaurant Montorgeuil /------------------------- */}
      {/* ---------------------------------------------------------------------------- */}

      <div className="bloc1">
        <div className="introduction">
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <div className="repas">
          <img src={data.restaurant.picture} alt="photo" />
        </div>
      </div>

      {/* ---------------------------------------------------------------------------- */}
      {/* --------------------------------/ Bloc repas /------------------------------ */}
      {/* ---------------------------------------------------------------------------- */}

      <div className="category">
        <div className="category-1">
          {data.categories.map((item, index) => {
            return (
              <div>
                <h2 key={index}>{item.name}</h2>
                <div className="description">
                  {item.meals.map((item1, index2) => {
                    return (
                      <div
                        key={index2}
                        className="box"
                        onClick={() => {
                          Handleprice(item1.price, index2);
                          HandleDescription(item1.title, item1.price);
                          const newTab = [...counterCommande];
                          newTab.push(0);
                          setcounterCommande(newTab);
                        }}
                      >
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
          })}
        </div>

        {/* ; */}

        {/* ---------------------------------------------------------------------------- */
        /* --------------------------------/ Paiement /------------------------------- */
        /* ---------------------------------------------------------------------------- */}

        <div className="paiement">
          <button className="bouton-paiement">Valider mon panier</button>
          <div className="commandes">
            {Descriptif.map((Descriptif, index3) => {
              return (
                <div className="descriptif-commande" key={index3}>
                  {counterCommande.map((item, index4) => {
                    return (
                      <div className="counter">
                        <button
                          className="moins"
                          onClick={() => {
                            const newTab = [...counterCommande];
                            newTab[index4] -= 1;
                            setcounterCommande(newTab);
                          }}
                        >
                          -
                        </button>
                        <div>{item}</div>
                        <button
                          className="plus"
                          onClick={() => {
                            const newTab = [...counterCommande];
                            newTab[index4] += 1;
                            setcounterCommande(newTab);
                          }}
                        >
                          +
                        </button>
                      </div>
                    );
                  })}

                  <span key={index3}>
                    {Descriptif.title} {Descriptif.price} €
                  </span>
                </div>
              );
            })}
          </div>
          <div className="total">
            <div>Sous-total</div>
            <div>{counter}€</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
