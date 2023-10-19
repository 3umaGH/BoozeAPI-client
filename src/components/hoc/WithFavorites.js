import React from "react";

const withFavorites = (WrappedComponent) => {
  class HOC extends React.Component {
    componentDidMount() {
      this.localStorageInit();
    }

    localStorageInit = () => {
      // Check if storage has favoriteCocktails key, init empty array if not.
      if (localStorage.getItem("favoriteDrinks") === null)
        localStorage.setItem("favoriteDrinks", JSON.stringify([]));
    };

    toggleFavorite = (drinkId) => {
      const prevDrinks = JSON.parse(localStorage.getItem("favoriteDrinks"));

      if (this.isInFavorites(drinkId)) {
        localStorage.setItem(
          "favoriteDrinks",
          JSON.stringify(
            prevDrinks.filter((drink) => {
              return drink !== drinkId;
            })
          )
        );
      } else {
        localStorage.setItem(
          "favoriteDrinks",
          JSON.stringify([...prevDrinks, drinkId])
        );
      }
    };

    getFavoritesList = () => {
      return JSON.parse(localStorage.getItem("favoriteDrinks"));
    };

    isInFavorites = (drinkId) => {
      return this.getFavoritesList().includes(drinkId);
    };

    render() {
      return (
        <WrappedComponent
          toggleFavorite={this.toggleFavorite}
          isInFavorites={this.isInFavorites}
          {...this.props}
        />
      );
    }
  }

  return HOC;
};

export default withFavorites;
