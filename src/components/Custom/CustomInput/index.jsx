import { Input } from "../../ui/input";
import styles from "./CustomInput.module.scss";

function CustomInput({
  placeholder,
  autofocus,
  type,
  onKey,
  className,
  errors,
  name,
  value,
  onChange,
}) {
  // console.log(errors);
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        onKeyDown={(e) => onKey(e)}
        className={`${styles.custom_input_structure} font-roboto ${className}`}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {
        errors &&
          errors.map((error) => {
            if (error.path == name) {
              return <p className={styles.error_label}>{error.message}</p>;
              // return <p className={styles.error_label}>{error}</p>;
            }
          })

        // <p className={styles.error_label}>{errors[name]}</p>
      }
    </>
  );
}

export default CustomInput;
