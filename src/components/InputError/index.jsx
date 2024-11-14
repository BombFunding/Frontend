import styles from "./InputError.module.scss";

function InputError({ errors, name }) {
	console.log("errors: ", errors);
	return (
		<>
			{
				<>
					<p className={styles.error}>Errors</p>
					{errors?.includes(name) && <>niggaaaaaaaaaaaaaaaa</>}
				</>
			}
			{/* { errors ? 
				errors.map((error) => {
					if (error.path == name) {
						return (
							<p className={styles.error_label} key={name}>
								{error.message}
							</p>
						);
						// return <p className={styles.error_label}>{error}</p>;
					}
				}) :
                "error"
            } */}
		</>
	);
}

export default InputError;
