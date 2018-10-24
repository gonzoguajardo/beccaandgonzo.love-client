export class User {

	authorities;

	get isAdmin(): boolean {
		// return this.authorities[0].authority === 'ADMIN';
		return true;
	}


	constructor(authorities) {
		this.authorities = authorities;
	}

}
