export class Task {
  constructor(
    public id: number,
    public title: string,
    public isImportant: boolean,
    public isCompleted: boolean,
    public creationDate: Date | string,
    public endDate?: Date | string
  ) {
    if (typeof this.creationDate === "string") {
      this.creationDate = new Date(this.creationDate);
    }
    if (typeof this.endDate === "string") {
      this.endDate = new Date(this.endDate);
    }
  }
}
