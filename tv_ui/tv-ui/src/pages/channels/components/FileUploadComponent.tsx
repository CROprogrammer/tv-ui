import React, { DetailedHTMLProps, HTMLAttributes, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { makeToast } from "../../../utils/makeToast";

type FileUploadComponentProps = {
  setContent: (values: string) => void;
  readAs: "text" | "url";
  maxFileSize: number;
  acceptContentType?: string;
  setFileName?: (values: string) => void;
  setErrorMessage?: (values: string) => void;
  setConfirmMessage?: (values: string) => void;
  children?: React.ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function FileUploadComponent({
  setContent,
  acceptContentType,
  children,
  readAs,
  maxFileSize,
  setErrorMessage,
  setConfirmMessage,
  setFileName,
  ...props
}: FileUploadComponentProps) {
  const onDropRejected = useCallback(
    (rejectedFiles: Array<FileRejection>) => {
      if (rejectedFiles.length > 1) {
        makeToast("Unesen je preveliki broj datoteka.");
        return;
      }
      if (
        rejectedFiles.some(
          (file) => !acceptContentType?.split(", ").includes(file.file.type)
        )
      ) {
        makeToast("Datoteka nije u dozvoljenom formatu.");
        return;
      }

      makeToast(
        `Datoteka je prevelika, maksimalno ograničenje je ${
          maxFileSize / 1000000
        } MB.`
      );
    },
    [maxFileSize]
  );

  const onDropAccepted = useCallback(
    (acceptedFiles: Array<File>) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onabort = () => makeToast("Učitavanje prekinuto.");
        reader.onerror = () => makeToast("Neuspjelo učitavanje.");
        reader.onload = () => {
          const binaryStr = reader.result as string;
          setContent(binaryStr);
        };
        if (readAs === "text") {
          reader.readAsText(file);
        } else {
          reader.readAsDataURL(file);
        }
        // Inside file now are files content and metadata
        setFileName?.(file.name);
      });
    },
    [setFileName, readAs, setContent, setErrorMessage, setConfirmMessage]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: acceptContentType,
    maxFiles: 1,
    maxSize: maxFileSize,
  });

  return (
    <div {...props}>
      <div {...getRootProps()}>
        {children}
        <input {...getInputProps()} />
      </div>
    </div>
  );
}
