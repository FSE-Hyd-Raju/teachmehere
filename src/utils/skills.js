export const skillKeyExtractor = skill => skill.id.toString();

export const parseSkillsArray = skills =>
  skills.filter(skill => isEnoughInfo(skill)).map(skill => parseSkill(skill));

export const filterDuplicateSkills = skills =>
  skills.filter(
    (skill, index) =>
      index ===
      skills.findIndex(m => skillKeyExtractor(m) === skillKeyExtractor(skill)),
  );

// Local functions
const parseSkill = skill => ({
  ...skill,
  year: skill.release_date.substr(0, 4),
});

const skillRequiredProps = [
  'release_date',
  'title',
  'poster_path',
  'backdrop_path',
  'overview',
];
const isEnoughInfo = skill => {
  let isCorrect = true;
  skillRequiredProps.forEach(prop => {
    if (!skill[prop]) {
      isCorrect = false;
      return;
    }
  });
  return isCorrect;
};
