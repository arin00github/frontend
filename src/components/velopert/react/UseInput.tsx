import { useCallback, useState } from "react";

export type UserInputsProps = {
  username: string;
  email: string;
};

export function useInputs(
  initialForm: UserInputsProps
): (UserInputsProps | ((e: any) => void))[] {
  const [form, setForm] = useState<UserInputsProps>(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  const value = [form, onChange, reset];

  return value;
}
