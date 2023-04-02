import {
  getSkillClassName,
  translateParam,
  upSkillIcon,
} from "../../utils/names";

function returnSkillStars(skillLevel) {
  const star = <p className="skills-level-stars"></p>;
  const resultStars = [];

  const pushStar = (counter) => {
    while (counter > 0) {
      resultStars.push(star);
      counter -= 1;
    }
    return resultStars;
  };

  if (skillLevel < 5) {
    pushStar(1);
  }
  if (skillLevel >= 5 && skillLevel < 10) {
    pushStar(2);
  }
  if (skillLevel >= 10 && skillLevel < 15) {
    pushStar(3);
  }
  if (skillLevel >= 15 && skillLevel < 20) {
    pushStar(4);
  }
  if (skillLevel >= 20 && skillLevel < 25) {
    pushStar(5);
  }
  if (skillLevel >= 25) {
    pushStar(6);
  }
  return <div className="skill-level">{resultStars}</div>;
}

export function returnSkillsBlock(heroParam, options) {
  const generateSkills = (heroParam, skills) => {
    let result = [];
    for (let skillName in skills) {
      result.push(
        <div className="skill" key={skillName} id={heroParam}>
          <img
            src={upSkillIcon.src}
            alt={upSkillIcon.alt}
            className="up-skill-img"
            id={skillName}
          ></img>
          <p>
            {translateParam(skillName)} = {skills[skillName]}
          </p>
          {returnSkillStars(skills[skillName])}
        </div>
      );
    }
    return result;
  };

  return (
    <li className={getSkillClassName(heroParam)}>
      {translateParam(heroParam)}: {options.paramValue}
      <div className="content-skills hide">
        {generateSkills(heroParam, options.skills)}
      </div>
    </li>
  );
}
