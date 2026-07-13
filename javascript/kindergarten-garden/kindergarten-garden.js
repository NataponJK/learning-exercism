//
// This is only a SKELETON file for the 'Kindergarten Garden' exercise.
// It's been provided as a convenience to get you started writing code faster.
//

const DEFAULT_STUDENTS = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
];

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
};

export class Garden {
  constructor(diagram, students = DEFAULT_STUDENTS) {
    this.rows = diagram.split('\n');
    this.student = [...students].sort();
  }

  plants(student) {
    const index = this.student.indexOf(student);
    if (index === -1) return [];
    const startPosition = index * 2;
    const studentPlants = [
      this.rows[0][startPosition],
      this.rows[0][startPosition + 1],
      this.rows[1][startPosition],
      this.rows[1][startPosition + 1],
    ];
    return studentPlants.map(code => PLANT_CODES[code]);
  }
}
