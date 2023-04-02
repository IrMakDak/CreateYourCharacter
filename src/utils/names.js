export const upSkillIcon = {
  src: "https://static.thenounproject.com/png/2916370-200.png",
  alt: "up-skill",
};
export const requestOptions = {
  baseUrl: "http://localhost:3001/heroes",
  postMethod: "POST",
  deleteMethod: "DELETE",
  putMethod: "PUT",
  getMethod: "GET",
};

export const heroParams = {
  force: "force",
  agility: "agility",
  intelligence: "intelligence",
  charisma: "charisma",
};

export function translateParam(paramName) {
  switch (paramName) {
    case "attack":
      return "Атака";
      break;
    case "stealth":
      return "Стелс";
      break;
    case "archery":
      return "Стрельба из лука";
      break;
    case "learnability":
      return "Обучаемость";
      break;
    case "survival":
      return "Выживание";
      break;
    case "medicine":
      return "Медицина";
      break;
    case "intimidation":
      return "Запугивание";
      break;
    case "insight":
      return "Проницательность";
      break;
    case "appearance":
      return "Внешний вид";
      break;
    case "manipulation":
      return "Манипулирование";
      break;
    case "force":
      return "Сила";
      break;
    case "agility":
      return "Ловкость";
      break;
    case "intelligence":
      return "Интелект";
      break;
    case "charisma":
      return "Харизма";
      break;
    default:
      return "Новый скилл";
      break;
  }
}

export function getSkillClassName(skill) {
  switch (skill) {
    case heroParams.force:
      return "collapsible bg-danger";
      break;
    case heroParams.agility:
      return "collapsible bg-warning";
      break;
    case heroParams.intelligence:
      return "collapsible bg-info";
      break;
    case heroParams.charisma:
      return "collapsible bg-success";
      break;
    default:
      return "collapsible bg-secondary";
      break;
  }
}
