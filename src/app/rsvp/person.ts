export class Person {
	firstName: string;
	lastName: string;
	rsvpCode: string;
	personToken: string;

	attending: boolean;

	setAttending(attending: boolean) {
		this.attending = attending;
	}
}
