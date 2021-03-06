import {StatsPeriod} from '../const';


const initialDateByPeriods = [
  {
    period: StatsPeriod.ALL_TIME,
    getInitialDate: () => null,
  },
  {
    period: StatsPeriod.TODAY,
    getInitialDate: () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
  },
  {
    period: StatsPeriod.WEEK,
    getInitialDate: () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    }
  },
  {
    period: StatsPeriod.MONTH,
    getInitialDate: () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    }
  },
  {
    period: StatsPeriod.YEAR,
    getInitialDate: () => {
      const now = new Date();
      return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    }
  },
];

const getWatchedMoviesByPeriod = (movies, activePeriod) => {
  const {getInitialDate} = initialDateByPeriods.find(({period}) => period === activePeriod);
  return movies.filter(({watchingDate}) => watchingDate >= getInitialDate());
};

const countMoviesByGenre = (movies, selectedGenre) => {
  const moviesByGenre = movies.filter((movie) => {
    return movie.filmInfo.genres.some((genre) => genre === selectedGenre);
  });

  return moviesByGenre.length;
};

const countGenres = (movies) => {
  const allGenres = movies.reduce((acc, movie) => [...acc, ...movie.filmInfo.genres], []);
  const unicGenres = [...new Set(allGenres)];
  const countedGenres = unicGenres.reduce((acc, genre) => {
    return Object.assign(acc, {[genre]: countMoviesByGenre(movies, genre)});
  }, {});

  return countedGenres;
};

const getSortedGenres = (movies) => {
  const countedGenres = countGenres(movies);
  const sorterGenres = Object.entries(countedGenres).sort((a, b) => b[1] - a[1]);
  return sorterGenres;
};


export {getWatchedMoviesByPeriod, getSortedGenres};
