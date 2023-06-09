'use client'
import { TextFieldController } from "@/common/components/inputs/text-filed-controller";
import { UploadIcon } from "@/common/icons/UploadIcon";
import { useForm } from "react-hook-form";

import { ROUTE_ADMIN, ROUTE_DASHBOARD, ROUTE_PEOPLE } from "@/common/constants";
import { CustomDatePicker } from "@/common/components/inputs/date-picker/DatePicker";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import './add/styles.css'

const ADD_APPLICANT_MUTATION = gql`
  mutation ($input: ApplicantInput) {
    createApplicant(input: $input,) {
      id
    }
  }
`;

export const ApplicantForm = () => {
    const router = useRouter();
    const [applicantMutation, { loading: mutationLoading }] = useMutation(ADD_APPLICANT_MUTATION);
    const { control, handleSubmit, register, setValue, getValues, watch } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            country: '',
            visa: '',
            specialization: '',
            degree: '',
            yearsOfExperience: '',
            resumeGoogleDrivePath: '',
            gender: '',
            experience: '',
            dateOfBirth: '',
            description: ''
        }
    });

    const onSubmit = (values: any) => {
        applicantMutation({ variables: { input: values } })
            .then(res => router.push(`${ROUTE_ADMIN}${ROUTE_DASHBOARD}/${ROUTE_PEOPLE}`))
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
                    <div className="w-full flex items-center gap-4">
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
                        <div className="w-1/2"></div>
                    </div>

                    <div className="w-full flex items-center gap-4">
                        <div className="w-1/2">
                            <CustomDatePicker
                                label={'Birthday'}
                                onChange={(date) => setValue('dateOfBirth', date)}
                                value={watch().dateOfBirth} />
                        </div>
                        <div className="w-1/2">
                            <TextFieldController
                                name="country"
                                control={control}
                                placeholder="Nationality"
                                label="Nationality"
                            ></TextFieldController>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-4">
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
                                name="visa"
                                control={control}
                                placeholder="Visa"
                                label="Visa"
                            ></TextFieldController>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <div className="w-1/2">
                            <TextFieldController
                                name="email"
                                control={control}
                                placeholder="Email"
                                label="Email address"
                            ></TextFieldController>
                        </div>
                        <div className="w-1/2">
                            <TextFieldController
                                name="resumeGoogleDrivePath"
                                control={control}
                                placeholder="Resume Google Drive"
                                label="Resume path"
                            ></TextFieldController>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <div className="w-1/2">
                            <TextFieldController
                                name="degree"
                                control={control}
                                placeholder="Degree"
                                label="Degree"
                            ></TextFieldController>
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="font-medium inline-block" style={{ marginBottom: '6px' }}>Description</label>
                        <textarea {...register("description")} rows={5} name="description" className="textarea-input rounded w-full bordered p-4"></textarea>
                    </div>

                    {/* <div className="upload-resume">Upload Resume</div> */}
                </div>
            </div>
            <div className="form-actions w-full flex items-center mt-8 gap-4 justify-center">
                <button className="form-btn form-btn--1">Cancel</button>
                <button type="submit" className="form-btn form-btn--2" disabled={mutationLoading}>Save</button>
            </div>
        </form>
    </div>
}