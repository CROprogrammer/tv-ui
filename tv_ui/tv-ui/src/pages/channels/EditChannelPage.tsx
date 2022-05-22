import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FormikHelpers } from "formik";

import * as Yup from "yup";
import * as channelApi from "../../api/channels";

import ContentWrapper from "../../wrappers/ContentWrapper";
import { RootState } from "../../store/reducer";
import { channelAction } from "./store/ChannelSlice";
import { NewChannelFormData } from "./models/channel/channel";
import FormLayout from "../../components/FormLayout";
import Button from "../../components/Button";
import { makeToast } from "../../utils/makeToast";
import { Content } from "./models/channel/content";
import EditContentTableRow from "./components/EditContentTableRow";
import NewContentForm from "./components/NewContentForm";
import EditChannelForm from "./components/EditChannelForm";

const editChannelValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Upisani naziv je predugačak")
    .required("Potrebno je upisati naziv kanala"),
  description: Yup.string().required("Potrebno je upisati opis kanala"),
});

export default function EditChannelPage() {
  const [newContentFormOpened, setNewContentFormOpened] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const channel = useSelector((state: RootState) => state.channel.channel);
  const [numOfContent, setNumOfContent] = useState<number>(
    channel.contentList != null ? channel.contentList.length : 0
  );
  // @ts-ignore
  const { id } = useParams();
  const [logo, setLogo] = useState<string>("");

  useEffect(() => {
    // @ts-ignore
    dispatch(channelAction.getChannelById(id));
  }, [dispatch, id, numOfContent]);

  const onSubmitEditChannel = async (
    editChannelData: NewChannelFormData,
    formikHelpers: FormikHelpers<NewChannelFormData>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await channelApi.patchChannel(editChannelData, id);
    if (response.status === 200) {
      makeToast("Uspješno ažuriranje kanala.");
    }
    formikHelpers.setSubmitting(false);
  };

  const uploadImage = (contentString: string) => {
    const logoString = contentString.substr(contentString.indexOf(",") + 1);
    setLogo(logoString);
  };

  const showNewContentForm = () => {
    setNewContentFormOpened(!newContentFormOpened);
  };

  const getBackToChannels = () => {
    history.push("/channels");
  };

  return (
    <ContentWrapper>
      <Button className="m-2 bg-sky-500 rounded-md" onClick={getBackToChannels}>
        Povratak
      </Button>
      {/* master edit from */}
      <div className="py-4 px-24">
        <FormLayout
          initialValues={
            {
              logo: channel.logo,
              name: channel.name,
              description: channel.description,
            } as NewChannelFormData
          }
          onSubmit={(values: NewChannelFormData, formikHelpers) => {
            values.logo = logo;
            onSubmitEditChannel(values, formikHelpers);
          }}
          validationSchema={editChannelValidationSchema}
        >
          <EditChannelForm channel={channel} uploadImage={uploadImage} />
        </FormLayout>
      </div>

      {/* details edit from */}
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-sky-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Naziv
              </th>
              <th scope="col" className="px-6 py-3">
                Opis
              </th>
              <th scope="col" className="px-6 py-3">
                Kategorija
              </th>
              <th scope="col" className="px-6 py-3">
                Vrijeme početka
              </th>
              <th scope="col" className="px-6 py-3">
                Vrijeme završetka
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Cancel</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
        </table>
        <div className="py-2 pl-8">
          {channel.contentList != null &&
            channel.contentList.map((content: Content, index: number) => (
              <EditContentTableRow
                key={index}
                contentId={content.id}
                name={content.name}
                description={content.description}
                category={content.category}
                startTime={content.startTime}
                endTime={content.endTime}
                numOfContent={numOfContent}
                setNumOfContent={setNumOfContent}
              />
            ))}
        </div>

        <div className="ml-24">
          {newContentFormOpened ? (
            <NewContentForm
              channelId={id}
              hideNewContentForm={showNewContentForm}
              numOfContent={numOfContent}
              setNumOfContent={setNumOfContent}
            />
          ) : (
            <div className="px-4 py-2">
              <Button
                className="bg-sky-500 rounded-md"
                onClick={showNewContentForm}
              >
                Dodavanje novog sadržaja
              </Button>
            </div>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
}
