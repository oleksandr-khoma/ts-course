class School {
  _areas: string[] = [];
  _lecturers: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string;
  }[] = [];

  get areas(): string[] {
    return this._areas;
  }

  get lecturers(): {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string;
  }[] {
    return this._lecturers;
  }

  addArea(area: string): void {
    this._areas.push(area);
  }

  removeArea(area: string): void {
    const index = this._areas.indexOf(area);
    if (index > -1) {
      this._areas.splice(index, 1);
    }
  }

  addLecturer(lecturer: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string;
  }): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string;
  }): void {
    const index = this._lecturers.indexOf(lecturer);
    if (index > -1) {
      this._lecturers.splice(index, 1);
    }
  }
}

class Area {
  _levels: string[] = [];
  _name: string;
  constructor(name: string) {
    this._name = name;
  }

  get levels(): string[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: string): void {
    this._levels.push(level);
  }

  removeLevel(level: string): void {
    const index = this._levels.indexOf(level);
    if (index > -1) {
      this._levels.splice(index, 1);
    }
  }
}

class Level {
  _groups: string[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get groups(): string[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addGroup(group: string): void {
    this._groups.push(group);
  }

  removeGroup(group: string): void {
    const index = this._groups.indexOf(group);
    if (index > -1) {
      this._groups.splice(index, 1);
    }
  }
}

class Group {
  _area: string;
  _status: string;
  _students: { name: string; performanceRating: number }[] = [];
  _directionName: string;
  _levelName: string;

  constructor(directionName: string, levelName: string) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  get area(): string {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  get students(): { name: string; performanceRating: number }[] {
    return this._students;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  addStudent(student: { name: string; performanceRating: number }): void {
    this._students.push(student);
  }

  removeStudent(student: { name: string; performanceRating: number }): void {
    const index = this._students.indexOf(student);
    if (index > -1) {
      this._students.splice(index, 1);
    }
  }

  setStatus(status: string): void {
    this._status = status;
  }

  showPerformance(): { name: string; performanceRating: number }[] {
    const sortedStudents = this._students.sort(
      (a, b) => b.performanceRating - a.performanceRating
    );
    return sortedStudents;
  }
}

class Student {
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { workName: string; mark: number }[] = [];
  _visits: { lesson: string; present: boolean }[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(grade: { workName: string; mark: number }): void {
    this._grades.push(grade);
  }

  setVisit(visit: { lesson: string; present: boolean }): void {
    this._visits.push(visit);
  }

  getPerformanceRating(): number {
    const gradeValues = this._grades.map((grade) => grade.mark);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (this._visits.filter((visit) => visit.present).length /
        this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
