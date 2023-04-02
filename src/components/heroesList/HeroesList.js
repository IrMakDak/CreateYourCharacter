import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { requestOptions } from "../../utils/names";

import {
  heroDeleted,
  heroUpdate,
  fetchHeroes,
  heroesSelector,
} from "./heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "./heroesList.scss";

const HeroesList = () => {
  const loadedHeroes = useSelector(heroesSelector);
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  const onUpdate = useCallback((id, changedData) => {
    dispatch(heroUpdate({ id: id, changes: changedData }));
    request(
      `${requestOptions.baseUrl}/${id}`,
      requestOptions.putMethod,
      JSON.stringify(changedData)
    );
  });
  const onDelete = useCallback(
    (id) => {
      request(`${requestOptions.baseUrl}/${id}`, requestOptions.deleteMethod)
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );
  const onHit = useCallback(
    (id) => {
      request(`${requestOptions.baseUrl}/${id}`, requestOptions.getMethod)
        .then((data) => {
          if (data.options.lifes > 0) {
            data.options.lifes -= 1;
            onUpdate(id, data);
          }
        })
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );
  const onUpSkill = useCallback(
    (id, skillCategory, skillName) => {
      request(`${requestOptions.baseUrl}/${id}`, requestOptions.getMethod)
        .then((data) => {
          if (
            data.options[skillCategory].skills[skillName] <
            data.options[skillCategory].paramValue
          ) {
            data.options[skillCategory].skills[skillName] += 1;
            onUpdate(id, data);
          }
        })
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );
  const onNameChange = useCallback(
    (id, newName) => {
      request(`${requestOptions.baseUrl}/${id}`, requestOptions.getMethod)
        .then((data) => {
          data.name = newName;
          onUpdate(id, data);
        })
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );
  const onOptionsChange = useCallback(
    (id, newOptions) => {
      request(`${requestOptions.baseUrl}/${id}`, requestOptions.getMethod)
        .then((data) => {
          data.options = newOptions;
          onUpdate(id, data);
        })
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="hero">
          <HeroesListItem
            {...props}
            onUpdate={() => onUpdate(id)}
            onDelete={() => onDelete(id)}
            onHit={() => onHit(id)}
            onUpSkill={(skillCategory, skillName) =>
              onUpSkill(id, skillCategory, skillName)
            }
            onNameChange={(name) => onNameChange(id, name)}
            onOptionsChange={(newOptions) => onOptionsChange(id, newOptions)}
          />
        </CSSTransition>
      );
    });
  };
  const elements = renderHeroesList(loadedHeroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
