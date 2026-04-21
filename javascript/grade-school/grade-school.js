//
// This is only a SKELETON file for the 'Grade School' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class GradeSchool {
  constructor(){
    this._data = {};
  }
  roster() {
    return Object.keys(this._data).sort((a, b) => {
      if (this._data[a] === this._data[b]) return a.localeCompare(b);
      return this._data[a] - this._data[b];
    });
  }

  add(name, grade) {
    if (name in this._data) return false;
    this._data[name] = grade;
    return true;
  }

  grade(grade) {
    return Object.entries(this._data)
                 .filter(([_, studentGrade]) => studentGrade === grade)
                 .map(([name, _]) => name).sort();
  }
}