import { useState, useCallback } from "react";
import { FormState } from "@/app/types";

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, string | number | boolean>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: true,
    isSubmitting: false,
  });

  const handleChange = useCallback(
    (name: keyof T) => (value: T[keyof T]) => {
      setState((prev) => {
        const newValues = { ...prev.values, [name]: value };
        const newErrors = validate ? validate(newValues) : {};
        return {
          ...prev,
          values: newValues,
          errors: newErrors,
          touched: { ...prev.touched, [name]: true },
          isValid: Object.keys(newErrors).length === 0,
        };
      });
    },
    [validate]
  );

  const handleBlur = useCallback((name: keyof T) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (validate) {
        const errors = validate(state.values);
        setState((prev) => ({
          ...prev,
          errors,
          touched: Object.keys(prev.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          ),
          isValid: Object.keys(errors).length === 0,
        }));

        if (Object.keys(errors).length > 0) {
          return;
        }
      }

      setState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        await onSubmit(state.values);
        setState((prev) => ({ ...prev, isSubmitting: false }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          errors: {
            ...prev.errors,
            submit:
              error instanceof Error ? error.message : "An error occurred",
          },
        }));
      }
    },
    [state.values, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: true,
      isSubmitting: false,
    });
  }, [initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
