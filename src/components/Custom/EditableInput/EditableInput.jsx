import { Label } from "@/components/ui/label";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Input } from "@/components/ui/input";
import styles from "./EditableInput.module.scss";
import { Textarea } from "@/components/ui/textarea";

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
          {!edit ? (
            <div
              className={`transition-all duration-300 ease-in-out transform hover:opacity-80 hover:scale-110 bg-slate-50 shadow-md rounded-lg px-1`}
              onClick={(edit) => setEdit(true)}
            >
              <Label className="text-[14px] text-gray-500 ml-1">Edit</Label>
              <EditIcon sx={{ fontSize: 16, color: "gray" }} />
            </div>
          ) : (
            <div
              className={`transition-all duration-300 ease-in-out transform hover:opacity-80 hover:scale-110 bg-slate-50 shadow-md rounded-lg px-1`}
              onClick={(edit) => setEdit(false)}
            >
              <Label className="text-[14px] text-bomborange ml-1">Saved</Label>
              <SaveAsIcon sx={{ fontSize: 16, color: "orange" }} />
            </div>
          )}
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
