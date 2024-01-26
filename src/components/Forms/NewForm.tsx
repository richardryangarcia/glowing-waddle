"use client";

import { createUser } from "@/services";
import { ChangeEvent, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { TextInput } from "./TextInput";

const initialState = {
  message: "",
};

type FormValues = {
  email: { type: string; required: boolean; blurred: boolean; error: string };
};

const initState = {
  email: { type: "string", required: true, blurred: false, error: "" },
};

export const NewForm = () => {
  const { pending } = useFormStatus();
  console.log(pending);
  const handleClient = async (prevState: any, formData: FormData) => {
    console.log("handling");
    console.log(formData.get("email"));
    await new Promise(resolve => setTimeout(resolve, 5000));
    return { message: "" };
  };
  const [state, formAction] = useFormState(handleClient, initialState);
  const [errors, setErrors] = useState({ email: "" });
  const ready = useMemo<boolean>(() => {
    return false;
  }, [errors]);

  const [showError, setShowError] = useState({ email: false });
  const validateEmail = (value: string) => {
    if (value)
      setErrors({
        ...errors,
        email: "Something went wrongdfasdfasdfas adsfasdfk adfasdfkj dfasdf",
      });
  };

  // check required
  // on blur, validate value
  // make sure no errors

  return (
    <form action={formAction}>
      <TextInput
        label="Email"
        name="email"
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          validateEmail(e.target.value);
        }}
        handleBlur={() => {
          setShowError({ ...showError, email: true });
        }}
        error={errors["email"]}
        showError={showError["email"]}
      />

      <button disabled={false}>Sign up</button>
    </form>
  );
};
