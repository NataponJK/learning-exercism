interface Data{
  [key: string]: string[]
};
interface NewData{
  [key: string]: number;
}
export function transform(data: Data): NewData {
  const newData: NewData = {};
  for (const [score, letters] of Object.entries(data)){
    for (const letter of letters){
      newData[letter.toLowerCase()] = Number(score);
    }
  }
  return newData;
}
