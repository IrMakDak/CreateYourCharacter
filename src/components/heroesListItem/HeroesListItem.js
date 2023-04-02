import "./heroesListItem.scss";
import { heroParams, translateParam } from "../../utils/names";
import { returnSkillsBlock } from "./HeroesSkillsItem";
import { useRef, useState } from "react";
import { toggleVisibleClass } from "../../utils/utilsFuncs";

const HeroesListItem = ({
  name,
  options,
  onNameChange,
  onOptionsChange,
  onDelete,
  onHit,
  onUpSkill,
}) => {
  const refUl = useRef(null);
  const [newHeroName, setNewHeroName] = useState(null);
  const [newHeroOptions, setNewHeroOptions] = useState(options);

  const [heroNameEditProcess, setHeroNameEditProcess] = useState(false);
  const [heroOptionsEditProcess, setHeroOptionsEditProcess] = useState(false);

  const upSkill = (event) => {
    if (event.target.getAttribute("alt") === "up-skill") {
      const skillName = event.target.id;
      const heroParam = event.target.closest(".skill").id;

      onUpSkill(heroParam, skillName);
    }
    if (event.target.classList.contains("collapsible")) {
      toggleVisibleClass(event.target);
    }
  };

  const onSubmitNameHandler = (e) => {
    e.preventDefault();

    onNameChange(newHeroName);
    setHeroNameEditProcess(false);
    setNewHeroName("");
  };
  const onSubmitOptionsHandler = (e) => {
    e.preventDefault();

    onOptionsChange(newHeroOptions);
    setHeroOptionsEditProcess(false);
    setNewHeroOptions(newHeroOptions);
  };

  const editHeroName = () => {
    return (
      <form
        className="border p-4 shadow-lg rounded"
        onSubmit={onSubmitNameHandler}
      >
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          className="form-control"
          required
          type="text"
          id="newName"
          placeholder="Как меня зовут?"
          value={newHeroName}
          onChange={(e) => setNewHeroName(e.target.value)}
        ></input>
        <button type="submit" className="btn btn-primary w-50 mt-2">
          Изменить имя
        </button>
      </form>
    );
  };
  const editHeroOptions = (optionToChange) => {
    return (
      <>
        <label htmlFor={optionToChange} className="form-label fs-4">
          Новое значение {translateParam(optionToChange)}
        </label>
        <input
          className="form-control"
          required
          type="number"
          id={"new" + optionToChange}
          value={newHeroOptions[optionToChange].paramValue}
          onChange={(e) =>
            setNewHeroOptions({
              ...newHeroOptions,
              [optionToChange]: {
                paramValue: +e.target.value,
                skills: newHeroOptions[optionToChange].skills,
              },
            })
          }
        ></input>
      </>
    );
  };
  const editHeroOptionsForm = () => {
    const optionInputsArray = [];
    let mainOptions = Object.keys(options);
    mainOptions = mainOptions.filter(
      (option) =>
        option === heroParams.force ||
        option === heroParams.agility ||
        option === heroParams.intelligence ||
        option === heroParams.charisma
    );
    mainOptions.forEach((option) => {
      optionInputsArray.push(editHeroOptions(option));
    });
    return (
      <form
        className="border p-4 shadow-lg rounded"
        onSubmit={onSubmitOptionsHandler}
      >
        {optionInputsArray}
        <button type="submit" className="btn btn-primary w-50 mt-2">
          Изменить
        </button>
      </form>
    );
  };

  return (
    <>
      <li className={`card flex-row shadow-lg text-white w-100`}>
        <div className="card-body-left">
          <h3 className="card-title">Имя: {name}</h3>
          <span className="badge border rounded-pill bg-light">
            <button
              type="button"
              className="btn-edit-right"
              aria-label="Edit"
              onClick={() => setHeroNameEditProcess(true)}
            ></button>
          </span>
          {heroNameEditProcess ? editHeroName() : null}
          <div className="columns">
            <div className="column">
              <p className="card-options">Базовые параметры: </p>
              <span className="badge border rounded-pill bg-light">
                <button
                  type="button"
                  className="btn-edit"
                  aria-label="Edit"
                  onClick={() => setHeroOptionsEditProcess(true)}
                ></button>
              </span>
              {heroOptionsEditProcess ? editHeroOptionsForm() : null}
              <ul
                className="w-100 mt-2"
                ref={refUl}
                onClick={(e) => upSkill(e)}
              >
                {returnSkillsBlock(heroParams.force, options.force)}
                {returnSkillsBlock(heroParams.agility, options.agility)}
                {returnSkillsBlock(
                  heroParams.intelligence,
                  options.intelligence
                )}
                {returnSkillsBlock(heroParams.charisma, options.charisma)}
              </ul>
            </div>
            <div className="column">
              <p className="card-options">Дополнительные параметры: </p>

              <ul>
                <li>Жизненная сила: {options.lifes}</li>
                <li>Уклонение: {options.evasion}</li>
                <li>Энергичность: {options.energy}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border rounded-pill bg-light char-actions">
          <span
            onClick={onDelete}
            className="badge border rounded-pill bg-light"
          >
            <button
              type="button"
              className="btn-close btn-close"
              aria-label="Close"
            ></button>
          </span>
        </div>
      </li>
      <div className="btn-container w-100 mb-5">
        <button className="btn btn-danger h-100 w-100 " onClick={onHit}>
          Нанести урон
        </button>
      </div>
    </>
  );
};

export default HeroesListItem;
