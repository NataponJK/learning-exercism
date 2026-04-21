export class GradeSchool {
  private _studentData: Map<number, string[]> = new Map()

  add(name: string, grade: number): void {
    this.removeStudent(name)
    const students = this._studentData.get(grade) || []
    this._studentData.set(grade, [...students, name].sort())
  }

  roster() {
    const sortedStudent: Record<number, string[]> = {}
    const sortedGrades = [...this._studentData.keys()].sort((a, b) => a - b)
    for (const g of sortedGrades) {
      sortedStudent[g] = [...(this._studentData.get(g) || [])]
    }
    return sortedStudent
  }

  grade(gradeStudent: number): string[] {
    return [...(this._studentData.get(gradeStudent) || [])]
  }

  private removeStudent(name: string): void {
    for (const [grade, students] of this._studentData.entries()) {
      if (students.includes(name)) {
        this._studentData.set(grade, students.filter(s => s !== name))
      }
    }
  }
}
