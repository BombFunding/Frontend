import { Label } from "@/components/ui/label";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Input } from "@/components/ui/input";
import styles from "./EditableInput.module.scss";
import { Textarea } from "@/components/ui/textarea";
import EditButton from "../EditButton/EditButton";
import CloseIcon from "@mui/icons-material/Close";

const EditableInput = ({
  name,
  value,
  editable,
  icon,
  type = "text",
  isTextArea = false,
}) => {
  const [edit, setEdit] = React.useState(false);

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
              disabled={!edit}
              className={styles.input_field}
              type={type}
              placeholder={name}
              id={name}
            />
          ) : (
            <Input
              disabled={!edit}
              className={styles.input_field}
              type={type}
              placeholder={name}
              id={name}
              value={value}
            />
          )
        ) : edit ? (
          <Textarea
            className={styles.input_text_field}
            type={type}
            placeholder={name}
            id={name}
          />
        ) : (
          <Textarea
            disabled={!edit}
            className={styles.input_text_field}
            value={value}
            placeholder={name}
            id={name}
          />
        )}
        {icon}
      </div>
    </div>
  );
};

export default EditableInput;
