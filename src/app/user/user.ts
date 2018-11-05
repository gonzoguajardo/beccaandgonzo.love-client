export class User {

	authorities;

	get isAdmin(): boolean {
		return this.authorities === '[{"authority":"ROLE_ADMIN"}]';
	}


	constructor(authorities) {
		this.authorities = authorities;
	}

}
