import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Input } from "@/components/ui/input";
import styles from "./EditableInput.module.scss";
import { Textarea } from "@/components/ui/textarea";
import EditButton from "../EditButton/EditButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";

const EditableInput = ({
  name,
  value,
  fieldName,
  icon,
  type = "text",
  isTextArea = false,
  register,
  setFocus,
  setValue,
}) => {
  const inputRef = useRef(null);
  const [edit, setEdit] = React.useState(false);

  useEffect(() => {
    // console.log("edit", edit);
    if (edit) {
      setFocus(name);
    } else {
      setValue(name, value, { shouldValidate: false });
    }
  }, [edit]);

  return (
    <div className={styles.input_block}>
      <div className="flex justify-between items-center gap-2 mx-3">
        <Label className={styles.input_label} htmlFor="email">
          {name}
        </Label>
        <div className="flex items-center gap-[3px]">
          <EditButton
            name1={"تغییر"}
            name2={"کنسل"}
            icon1={<EditIcon />}
            icon2={<CloseIcon />}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-1">
        {!isTextArea ? (
          edit ? (
            <Input
              ref={inputRef}
              disabled={!edit}
              className={styles.input_field}
              type={type}
              {...register(fieldName)}
            />
          ) : (
            <Input
              ref={inputRef}
              disabled={!edit}
              className={styles.input_field}
              type={type}
              {...register(fieldName)}
            />
          )
        ) : edit ? (
          <Textarea
            ref={inputRef}
            className={styles.input_text_field}
            type={type}
            {...register(fieldName)}
          />
        ) : (
          <Textarea
            ref={inputRef}
            disabled={!edit}
            className={styles.input_text_field}
            {...register(fieldName)}
          />
        )}
        {icon}
      </div>
    </div>
  );
};

export default EditableInput;
