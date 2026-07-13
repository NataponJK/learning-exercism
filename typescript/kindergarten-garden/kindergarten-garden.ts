//
// This is only a SKELETON file for the 'Kindergarten Garden' exercise.
// It's been provided as a convenience to get you started writing code faster.
//
type PlantCode = 'G' | 'C' | 'R' | 'V';
type PlantName = 'grass' | 'clover' | 'radishes' | 'violets';

const DEFAULT_STUDENTS: string[] = [
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
]

const PLANT_CODES: Record<PlantCode, PlantName> = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
}

export class Garden {
  private rows: string[];
  private students: string[];

  constructor(diagram: string, students: string[] = DEFAULT_STUDENTS) {
    this.rows = diagram.split('\n');
    this.students = [...students].sort();
  }

  public plants(student: string): PlantName[] {
    const index = this.students.indexOf(student);
    if (index === -1) return [];
    const startPosition = index * 2;
    const studentPlants = [
      this.rows[0][startPosition] as PlantCode,
      this.rows[0][startPosition + 1] as PlantCode,
      this.rows[1][startPosition] as PlantCode,
      this.rows[1][startPosition + 1] as PlantCode,
    ];
    return studentPlants.map(code => PLANT_CODES[code]);
  }
}
