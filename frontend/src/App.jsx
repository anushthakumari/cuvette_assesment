import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "./components/Button";
import routeNames from "./constants/routeNames";
import { getJobs } from "./apis/job.apis";

function App() {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await getJobs();
				setJobs(response);
				setLoading(false);
			} catch (err) {
				setError("Failed to load jobs");
				setLoading(false);
			}
		};

		fetchJobs();
	}, []);

	return (
		<div>
			<Button className="w-40">
				<Link to={routeNames.COMPANY.CHILDS.CREATE_JOB.path}>
					Create Interview
				</Link>
			</Button>

			<div className="mt-8">
				{error && <p className="text-red-500">{error}</p>}

				{!loading && jobs.length > 0 && (
					<ul>
						{jobs.map((job) => (
							<li key={job.id} className="border-b py-4">
								<h3 className="font-bold">{job.jobTitle}</h3>
								<p>{job.jobDescription}</p>
								<p className="text-gray-500">
									Experience: {job.experienceLevel}
								</p>
								<p className="text-gray-500">End Date: {job.endDate}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
