import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormikHelpers } from "formik";

import * as Yup from "yup";
import * as categoriesApi from "../../api/categories";

import ContentWrapper from "../../wrappers/ContentWrapper";
import { RootState } from "../../store/reducer";
import FormLayout from "../../components/FormLayout";
import Button from "../../components/Button";
import { makeToast } from "../../utils/makeToast";
import { NewCategoryFormData } from "./models/category";
import { categoriesAction } from "./store/CategorySlice";
import EditCategoryRow from "./components/EditCategoryRow";

const editCategoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Upisani naziv je predugačak")
    .required("Potrebno je upisati naziv kategorije"),
  description: Yup.string().required("Potrebno je upisati opis kategorije"),
});

export default function EditCategoryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const category = useSelector((state: RootState) => state.category.category);
  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    // @ts-ignore
    dispatch(categoriesAction.getCategoryById(id));
  }, [dispatch, id]);

  const onSubmitEditCategory = async (
    editCategoryData: NewCategoryFormData,
    formikHelpers: FormikHelpers<NewCategoryFormData>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await categoriesApi.patchCategory(editCategoryData, id);
    if (response.status === 200) {
      makeToast("Uspješno ažuriranje kategorije.");
    }
    formikHelpers.setSubmitting(false);
  };
  const getBackToCategories = () => {
    history.push("/categories");
  };

  return (
    <ContentWrapper>
      <Button
        className="m-2 bg-sky-500 rounded-md"
        onClick={getBackToCategories}
      >
        Povratak
      </Button>
      <div className="py-4 px-24">
        <FormLayout
          initialValues={
            {
              name: category.name,
              description: category.description,
            } as NewCategoryFormData
          }
          onSubmit={(values: NewCategoryFormData, formikHelpers) =>
            onSubmitEditCategory(values, formikHelpers)
          }
          validationSchema={editCategoryValidationSchema}
        >
          <EditCategoryRow category={category} />
        </FormLayout>
      </div>
    </ContentWrapper>
  );
}
