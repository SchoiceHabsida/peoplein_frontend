'use client'
import { TextFieldController } from "@/common/components/inputs/text-filed-controller";
import { useForm } from "react-hook-form";
import { UploadIcon } from "@/common/icons/UploadIcon";

import './add/styles.css'
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { gql, useMutation } from "@apollo/client";

const ADD_APPLICANT_MUTATION = gql`
  mutation ($input: ApplicantInput) {
    createApplicant(input: $input,) {
      id
    }
  }
`;

export const ApplicantForm = () => {
    const [applicantMutation, { loading: mutationLoading }] = useMutation(ADD_APPLICANT_MUTATION);
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            country: '',
            visa: '',
            specialization: '',
        }
    });

    const onSubmit = (values: any) => {
        console.log(values)
        applicantMutation({variables: {input: values}})
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }

    return <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper mb-2">
            <div className="form-fields rounded">
                <div className="upload-actions flex">
                    <div className="user-photo h-full flex items-center justify-center relative">
                        <ImageUploader onChange={(file: File) => console.log(file)} />
                        <UploadIcon />
                    </div>
                    <div className="user-logo h-full flex-grow"></div>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                    <div className="w-1/2 flex gap-4 items-end">
                        <div className="w-1/2">
                            <TextFieldController
                                name="firstName"
                                control={control}
                                placeholder="First name"
                                label="Full name"
                            ></TextFieldController>
                        </div>
                        <div className="w-1/2">
                            <TextFieldController
                                name="lastName"
                                control={control}
                                placeholder="Last name"
                            ></TextFieldController>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <TextFieldController
                            name="specialization"
                            control={control}
                            placeholder="Specialization"
                            label="Specialization"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="country"
                            control={control}
                            placeholder="Nationality"
                            label="Nationality"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="visa"
                            control={control}
                            placeholder="Visa"
                            label="Visa"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="email"
                            control={control}
                            placeholder="email"
                            label="Email address"
                        ></TextFieldController>
                    </div>

                    <div className="w-full">
                        <label className="font-medium inline-block" style={{ marginBottom: '6px' }}>Description</label>
                        <textarea rows={5} name="description" className="textarea-input rounded w-full bordered p-4"></textarea>
                    </div>

                    <div className="upload-resume">Upload Resume</div>
                </div>
            </div>
            <div className="form-actions w-full flex items-center mt-8 gap-4 justify-center">
                <button className="form-btn form-btn--1">Cancel</button>
                <button type="submit" className="form-btn form-btn--2" disabled={mutationLoading}>Save</button>
            </div>
        </form>
    </div>
}