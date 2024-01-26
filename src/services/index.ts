"use server";

export const createUser = (prevState: any, formData: FormData) => {
  console.log(prevState);
  console.log(formData);
  return { message: "Enter a valid email" };
};
