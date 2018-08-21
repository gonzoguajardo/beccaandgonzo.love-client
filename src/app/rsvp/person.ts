export class Person {
	firstName: string;
	lastName: string;
	personToken: string;
	attending: boolean;
	dinnerOption: string;
	rsvp: Rsvp;
}

export class Rsvp {
	rsvpCode: string;
	lastUpdated: string;
}
