import React, { useState } from "react";
import axios from "axios";

import { Button, TextField, Grid } from "@mui/material";

import { linkFam } from "../services/api";

const LinkFamMember = () => {
	const id = "6526d30a0f83f5e462288354"; // Extract 'patientId' from useParams or use the default value

	const [family, setFamily] = useState({
		name: "",
		nationalID: "",
		age: "",
		gender: "",
		relation: "",
	});

	const handleChange = (field, value) => {
		setFamily((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};
	const getID = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/Patient/myInfo",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				return response.data._id;
			}
		} catch (error) {}
	};

	const handleLink = async () => {
		try {
			await linkFam(id, [family]);
			setFamily({
				name: "",
				nationalID: "",
				age: "",
				gender: "",
				relation: "",
			});
		} catch (error) {
			console.error("Error linking family member:", error);
		}
	};

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						label='Name'
						value={family.name}
						onChange={(e) => handleChange("name", e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='National ID'
						value={family.nationalID}
						onChange={(e) => handleChange("nationalID", e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='Age'
						value={family.age}
						onChange={(e) => handleChange("age", e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='Gender'
						value={family.gender}
						onChange={(e) => handleChange("gender", e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='Relation'
						value={family.relation}
						onChange={(e) => handleChange("relation", e.target.value)}
					/>
				</Grid>
			</Grid>

			<Button variant='contained' onClick={handleLink}>
				Link
			</Button>
		</div>
	);
};

export default LinkFamMember;
