import {APP_NAME} from "../consts/config";
import {useEffect, useState} from "react";

export function Navbar({setAddress}) {

	const handleSearch = (e) => {
		setAddress(document.getElementById("address-input").value)
		console.log("Set address: " + e.target.value)
	};

	return (
		<>
			<nav className="navbar bg-light">
				<div className="container">

					<a href="#" className="navbar-brand">
						{APP_NAME}
					</a>
					<div className="input-group" style={{width: 400}}>
						<input
							id={"address-input"}
							type="text"
							className="form-control"
							placeholder={"0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
						/>
						<button className="btn btn-dark" onClick={handleSearch}>
							Search
						</button>
					</div>
				</div>
			</nav>
		</>
	);
}
