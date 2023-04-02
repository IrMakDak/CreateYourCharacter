import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { translateParam, heroParams, requestOptions } from "../../utils/names";

import { heroCreated } from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const forceSkills = {
    attack: 0,
  };
  const agilitySkills = {
    stealth: 0,
    archery: 0,
  };
  const intelligenceSkills = {
    learnability: 0,
    survival: 0,
    medicine: 0,
  };
  const charismaSkills = {
    intimidation: 0,
    insight: 0,
    appearance: 0,
    manipulation: 0,
  };
  const [heroOptions, setHeroOptions] = useState({
    force: {
      paramValue: 0,
      skills: forceSkills,
    },
    agility: {
      paramValue: 0,
      skills: agilitySkills,
    },
    intelligence: {
      paramValue: 0,
      skills: intelligenceSkills,
    },
    charisma: {
      paramValue: 0,
      skills: charismaSkills,
    },
  });
  const [additionalOptions, setAdditionalOptions] = useState({
    lifes: 0,
    evasion: 0,
    energy: 0,
  });

  useEffect(() => {
    setAdditionalOptions({
      lifes: 3 + +heroOptions.force.paramValue,
      evasion: 10 + +heroOptions.agility.paramValue,
      energy:
        +heroOptions.agility.paramValue + +heroOptions.intelligence.paramValue,
    });
  }, [heroOptions]);

  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newHero = {
      id: uuidv4(),
      name: heroName,
      options: { ...heroOptions, ...additionalOptions },
    };

    request(
      requestOptions.baseUrl,
      requestOptions.postMethod,
      JSON.stringify(newHero)
    )
      .then((res) => console.log(res, "Отправка успешна"))
      .then(dispatch(heroCreated(newHero)))
      .catch((err) => console.log(err));

    setHeroName("");
    setHeroOptions({
      force: {
        paramValue: 0,
        skills: forceSkills,
      },
      agility: {
        paramValue: 0,
        skills: agilitySkills,
      },
      intelligence: {
        paramValue: 0,
        skills: intelligenceSkills,
      },
      charisma: {
        paramValue: 0,
        skills: charismaSkills,
      },
    });
    setAdditionalOptions();
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor={heroParams.force} className="form-label fs-4">
          {translateParam(heroParams.force)}
        </label>
        <input
          required
          name={heroParams.force}
          className="form-control"
          id={heroParams.force}
          type={"number"}
          value={heroOptions.force.paramValue}
          onChange={(e) =>
            setHeroOptions({
              ...heroOptions,
              force: {
                paramValue: +e.target.value,
                skills: heroOptions.force.skills,
              },
            })
          }
        />
        <label htmlFor={heroOptions.agility} className="form-label fs-4">
          Ловкость
        </label>
        <input
          required
          name={heroOptions.agility}
          className="form-control"
          id={heroParams.agility}
          type={"number"}
          value={heroOptions.agility.paramValue}
          onChange={(e) =>
            setHeroOptions({
              ...heroOptions,
              agility: {
                paramValue: e.target.value,
                skills: heroOptions.agility.skills,
              },
            })
          }
        />
        <label htmlFor={heroParams.intelligence} className="form-label fs-4">
          Интелект
        </label>
        <input
          required
          name={heroParams.intelligence}
          className="form-control"
          id={heroParams.intelligence}
          type={"number"}
          value={heroOptions.intelligence.paramValue}
          onChange={(e) =>
            setHeroOptions({
              ...heroOptions,
              intelligence: {
                paramValue: e.target.value,
                skills: heroOptions.intelligence.skills,
              },
            })
          }
        />
        <label htmlFor={heroParams.charisma} className="form-label fs-4">
          Харизма
        </label>
        <input
          required
          name={heroParams.charisma}
          className="form-control"
          id={heroParams.charisma}
          type={"number"}
          value={heroOptions.charisma.paramValue}
          onChange={(e) =>
            setHeroOptions({
              ...heroOptions,
              charisma: {
                paramValue: e.target.value,
                skills: heroOptions.charisma.skills,
              },
            })
          }
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
