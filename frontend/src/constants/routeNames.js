const routeNames = {
	ROOT: {
		path: "/",
	},

	LOGIN: {
		name: "login",
		path: "/login",
	},

	REGISTER: {
		name: "register",
		path: "/register",
	},

	HOME: {
		name: "home",
		path: "/",
	},

	COMPANY: {
		name: "company",
		path: "/company",
		CHILDS: {
			CREATE_JOB: {
				name: "create-job",
				path: "/company/create-job",
			},
		},
	},

	VERIFY: {
		name: "verify",
		path: "/verify",
	},
};

export default routeNames;
