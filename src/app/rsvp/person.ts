export class Person {
	firstName: string;
	lastName: string;
	personToken: string;
	attending: any;
	dinnerOption: string;
	rsvpCode: string;
	plusOne: boolean;

	rsvp: Rsvp;
}

export class Rsvp {
	rsvpCode: string;
	lastUpdated: string;
}
