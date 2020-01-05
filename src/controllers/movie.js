// import {merge} from 'lodash';
import FilmCardComponent from './../components/film-card';
import FilmDetailsComponent from './../components/film-details';
import MovieModel from '../models/movie';
import {RenderPosition, render, replace, remove} from './../utils/render';


export const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

// const parseFormData = (formData) => {
//   const isChecked = (name) => formData.get(name) === `on`;

//   return {
//     userRating: +formData.get(`score`),
//     isInWatchlist: isChecked(`watchlist`),
//     isWatched: isChecked(`watched`),
//     isFavorite: isChecked(`favorite`),
//   };
// };

// const parseFormData = (formData) => {
//   const isChecked = (name) => formData.get(name) === `on`;

//   return new MovieModel({
//     userRating: +formData.get(`score`),
//     isInWatchlist: isChecked(`watchlist`),
//     isWatched: isChecked(`watched`),
//     isFavorite: isChecked(`favorite`),
//   });
// };

export default class MovieController {
  constructor(cardContainer, detailsContainer, onDataChange, onViewChange) {
    this._cardContainer = cardContainer;
    this._detailsContainer = detailsContainer;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._movieCardComponent = null;
    this._movieDetailsComponent = null;
  }

  render(movie) {
    const oldMovieCardComponent = this._movieCardComponent;
    const oldMovieDetailsComponent = this._movieDetailsComponent;

    this._movieCardComponent = new FilmCardComponent(movie);
    this._movieDetailsComponent = new FilmDetailsComponent(movie);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        closeMovieDetails(evt);
      }
    };

    const openMovieDetails = (evt) => {
      evt.preventDefault();
      this._onViewChange();

      render(this._detailsContainer, this._movieDetailsComponent, RenderPosition.BEFOREEND);

      this._mode = Mode.DETAILS;

      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closeMovieDetails = (evt) => {
      evt.preventDefault();

      const data = this._movieDetailsComponent.getData();
      this._onDataChange(this, movie, Object.assign({}, movie, data));

      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    this._movieCardComponent.setFilmPosterClickHandler(openMovieDetails);
    this._movieCardComponent.setFilmTitleClickHandler(openMovieDetails);
    this._movieCardComponent.setFilmCommentsClickHandler(openMovieDetails);

    this._movieCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isInWatchlist = !newMovie.isInWatchlist;

      this._onDataChange(this, movie, newMovie);
    });

    this._movieCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;
      newMovie.watchingDate = newMovie.isWatched ? new Date() : null;

      this._onDataChange(this, movie, newMovie);
    });

    this._movieCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isFavorite = !newMovie.isFavorite;

      this._onDataChange(this, movie, newMovie);
    });

    this._movieDetailsComponent.setSubmitHandler(closeMovieDetails);


    // switch (mode) {
    // case Mode.DEFAULT:
    if (oldMovieCardComponent && oldMovieDetailsComponent) {
      replace(this._movieCardComponent, oldMovieCardComponent);
      replace(this._movieDetailsComponent, oldMovieDetailsComponent);
      this._removeDetailsWithoutSaving();
    } else {
      render(this._cardContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
    }
    // break;
    // }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeDetailsWithoutSaving();
    }
  }

  // destroy() {
  //   remove(this._movieDetailsComponent);
  //   remove(this._movieCardComponent);
  //   document.removeEventListener(`keydown`, this._onEscKeyDown);
  // }

  _removeDetailsWithoutSaving() {
    this._movieDetailsComponent.reset();

    remove(this._movieDetailsComponent);

    this._movieDetailsComponent.recoveryListeners();
    this._mode = Mode.DEFAULT;
  }
}
