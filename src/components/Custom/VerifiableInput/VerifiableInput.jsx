import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import styles from "./VerifiableInput.module.scss";

const VerifiableInput = ({
  name,
  value,
  isVerified = false,
  type = "text",
  editable = false,
  register,
  fieldName,
}) => {
  return (
    <div className={styles.input_block}>
      <div className="flex justify-between items-center gap-2">
        <Label className={styles.input_label} htmlFor="email">
          {name}
        </Label>
        <div className="flex items-center gap-1">
          {isVerified ? (
            <>
              <Label className="text-[14px] text-green-700">تایید شده</Label>
              <VerifiedUserIcon sx={{ fontSize: 16, color: "green" }} />
            </>
          ) : (
            <>
              <Label className="text-[14px] text-red-700">تایید نشده</Label>
              <VerifiedUserIcon sx={{ fontSize: 16, color: "red" }} />
            </>
          )}
        </div>
      </div>
      <Input
        disabled={!editable}
        className={styles.input_field}
        type={type}
        id={name}
        placeholder={name}
        {...register(fieldName)}
      />
    </div>
  );
};

export default VerifiableInput;
