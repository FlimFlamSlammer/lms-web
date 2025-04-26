import { useContext } from "react";
import { Button, ButtonProps } from "./button";
import { FormContext } from "./form";

export const FormButton = (props: ButtonProps) => {
    const { isSubmitting } = useContext(FormContext);

    return (
        <Button {...props} disabled={props.disabled || isSubmitting}></Button>
    );
};
