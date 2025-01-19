export class Task {
  constructor(
    public id: number,
    public title: string,
    public isImportant: boolean,
    public isCompleted: boolean,
    public endDate?: string
  ) {}
}
