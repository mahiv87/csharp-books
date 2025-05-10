import { BookModel } from './BookModel';

export class UsersCurrentLoans {
	constructor(public book: BookModel, public daysLeft: number) {}
}
