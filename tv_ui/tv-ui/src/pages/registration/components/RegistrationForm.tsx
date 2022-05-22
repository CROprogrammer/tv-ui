import { LockClosedIcon } from "@heroicons/react/solid";
import FormLayout from "../../../components/FormLayout";

import * as Yup from "yup";
import * as accountApi from "../../../api/account";

import { RegistrationRequest } from "../../login/models/account/registration";
import { FormikHelpers, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeToast } from "../../../utils/makeToast";

type RegistrationFormProps = {
  email: string;
  password: string;
  repeatedPassword: string;
};

const registrationValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Upisana email adresa nije ispravna")
    .max(255, "Upisana email adresa je predugačka")
    .required("Potrebno je upisati email adresu"),
  password: Yup.string()
    .min(8, "Lozinka mora sadržavati minimalno 8 znakova")
    .max(64, "Lozinka mora sadržavati maksimalno 64 znakova")
    .required("Potrebno je upisati lozinku"),
  repeatedPassword: Yup.string()
    .required("Potrebno je upisati ponovljenu lozinku")
    .oneOf(
      [Yup.ref("password"), null],
      "Ponovljena lozinka mora odgovarati već unesenoj lozinki"
    ),
});

export default function RegistrationForm() {
  const [registrationError, setRegistrationError] = useState<string>("");
  const history = useHistory();

  const onSubmitRegister = async (
    registrationRequest: RegistrationRequest,
    formikHelpers: FormikHelpers<RegistrationFormProps>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await accountApi.register(registrationRequest);
    if (response.status !== 201) {
      setRegistrationError(
        "Neuspješna registracija. Već postoji korisnik s upisanom email adresom."
      );
    } else {
      makeToast("Uspješna registracija. Možete se prijaviti u aplikaciju.");
      setRegistrationError("");
      history.push("/");
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <>
      <FormLayout
        initialValues={
          {
            email: "",
            password: "",
            repeatedPassword: "",
          } as RegistrationFormProps
        }
        onSubmit={(values: RegistrationRequest, formikHelpers) =>
          onSubmitRegister(values, formikHelpers)
        }
        validationSchema={registrationValidationSchema}
      >
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col">
              <div className="mx-auto h-12 w-auto text-5xl text-sky-500 font-extrabold justify-self-center self-center">
                TV
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Registracija
              </h2>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email adresa
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Email adresa"
                />
                <div className="text-red-600">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Lozinka
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Lozinka"
                />
                <div className="text-red-600">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div>
                <label htmlFor="repeatedPassword" className="sr-only">
                  Lozinka
                </label>
                <Field
                  id="repeatedPassword"
                  name="repeatedPassword"
                  type="password"
                  autoComplete="repeatedPassword"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Ponovljena lozinka"
                />
                <div className="text-red-600">
                  <ErrorMessage name="repeatedPassword" />
                </div>
              </div>
            </div>
            <div className="text-red-600">{registrationError ?? ""}</div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-sky-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-sky-400 group-hover:text-sky-500"
                    aria-hidden="true"
                  />
                </span>
                Registriraj se
              </button>
            </div>
          </div>
        </div>
      </FormLayout>
    </>
  );
}
