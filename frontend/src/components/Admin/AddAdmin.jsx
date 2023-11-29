import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import Spinner from "../GeneralComponents/Spinner.jsx";

const defaultTheme = createTheme();

export default function AddAdmin() {
	const navigate = useNavigate();
	const [formData, setFormData] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const [error, setError] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleCreateAdmin = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`http://localhost:4000/admin/create-admin`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 201) {
				setError(null);
				alert(
					"Admin Created Successfully!" +
						"\nUsername: " +
						response.data.username +
						"\nPassword: " +
						response.data.password
				);
				localStorage.clear();
				navigate("/admin/login");
			}
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleCreateAdmin();
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<Box
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Create Admin
							</Typography>
							<Box
								component='form'
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 3 }}
							>
								{error && (
									<div
										style={{
											color: "red",
											marginBottom: "1rem",
											textAlign: "center",
											fontWeight: "bold",
										}}
									>
										{error}
									</div>
								)}
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											name='firstName'
											required
											fullWidth
											id='firstName'
											value={formData.firstName}
											onChange={handleInputChange}
											label='First Name'
											autoFocus
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											id='lastName'
											label='Last Name'
											value={formData.lastName}
											onChange={handleInputChange}
											name='lastName'
											autoComplete='family-name'
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											id='email'
											value={formData.email}
											onChange={handleInputChange}
											label='Email Address'
											name='email'
											autoComplete='email'
										/>
									</Grid>
								</Grid>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}
								>
									Create
								</Button>
							</Box>
						</Box>
					</>
				)}
			</Container>
		</ThemeProvider>
	);
}
