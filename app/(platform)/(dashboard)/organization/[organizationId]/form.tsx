"use client";

import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { FormInput } from "./form-input";
import { FormButton } from "./FormButton";

export const Form = () => {
    const initialState= {errors:{}, message: ""};

    const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <FormInput errors={state?.errors}/>
      <FormButton/>
    </form>
  );
};
