export class TodoModel {
    private _id: number = 0;
    private _title: string = '';
    private _description: string = '';
    private _date: Date = new Date();

    public set id(id: number) {
        this._id = id;
    }

    public get id(): number {
        return this._id;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get title(): string {
        return this._title;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get description(): string {
        return this._description;
    }

    public set date(date: Date) {
        this._date = date;
        this._date.setHours(0,0,0,0);
    }

    public get date(): Date {
        return this._date;
    }
    
}
