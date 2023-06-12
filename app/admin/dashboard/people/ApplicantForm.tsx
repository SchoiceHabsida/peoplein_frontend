'use client'
import { TextFieldController } from "@/common/components/inputs/text-filed-controller";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UploadIcon } from "@/common/icons/UploadIcon";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ROUTE_ADMIN, ROUTE_DASHBOARD, ROUTE_PEOPLE } from "@/common/constants";
import { CustomDatePicker } from "@/common/components/inputs/date-picker/DatePicker";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { IApplicant, ILanguage, ISkills } from "@/common/components/models/applicants.model";
import { CustomSelect } from "@/common/components/inputs/custom-select";
import { genders, specialization, visaTypes } from "@/common/constants/applicant.constants";
import './add/styles.css'

const ADD_APPLICANT_MUTATION = gql`
  mutation ($input: ApplicantInput) {
    createApplicant(input: $input,) {
      id
    }
  }
`;

const LANGUAGES_QUERY = gql`
    query languages {
        getAllLanguages {
            languageName
          }
    } 
`

const SKILLS_QUERY = gql`
    query skills {
        getAllSkills {
            skillName
            skillType
        }
    }
`

export const ApplicantForm = () => {
    const router = useRouter();
    const [applicantMutation, { loading: mutationLoading }] = useMutation(ADD_APPLICANT_MUTATION);
    const { data: languages } = useQuery<Record<'getAllLanguages', ILanguage[]>>(LANGUAGES_QUERY)
    const { data: skills } = useQuery<Record<'getAllSkills', ISkills[]>>(SKILLS_QUERY)

    const { control, handleSubmit, register, setValue, getValues, watch } = useForm<IApplicant>({
        defaultValues: {
            firstName: '',
            lastName: '',
            country: '',
            visa: '',
            degree: '',
            resumeGoogleDrivePath: '',
            gender: '',
            dateOfBirth: '',
            description: '',
            email: '',
            experience: [{ company: '', startOfWork: '' }],
            certificates: [{ acquisitionDate: '', certificateName: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({ name: 'experience', control })
    const { fields: certificate_fields, append: append_certificate, remove: remove_certificate } =
        useFieldArray({ name: 'certificates', control })


    const onSubmit = (values: any) => {
        delete values.experience[0].endOfWOrk
        console.log(values);

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
                            <CustomSelect
                                label={'Gender'}
                                value={genders.find(visa => visa.value === watch().gender) || ''}
                                options={genders}
                                onChange={(values) =>
                                    setValue('gender', values.value)} />
                        </div>
                        <div className="w-1/2">
                            <TextFieldController
                                name="email"
                                control={control}
                                placeholder="Email"
                                label="Email address"
                            ></TextFieldController>
                        </div>
                    </div>

                    <div className="w-full flex items-center gap-4">
                        <div className="w-1/2">
                            <CustomSelect
                                label={'Specialization'}
                                multiple={true}
                                value={watch().specialization?.map(item =>
                                    specialization.find(spec => spec.value === item)) || []}
                                options={specialization}
                                onChange={(values) =>
                                    setValue('specialization', values.map((selected: any) => selected.value))} />
                        </div>

                        <div className="w-1/2">
                            <CustomSelect
                                label={'Visa'}
                                value={visaTypes.find(visa => visa.value === watch().visa) || ''}
                                options={visaTypes}
                                onChange={(values) =>
                                    setValue('visa', values.value)} />
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
                            <CustomSelect
                                label={'Skills'}
                                multiple={true}
                                value={watch().skills?.map(skill => ({ label: skill.skillName, value: skill.skillName })) || ''}
                                options={skills?.getAllSkills?.map(skill => ({ label: skill.skillName, value: skill.skillName })) || []}
                                onChange={(values) => {
                                    setValue('skills', values.map((item: any) => ({
                                        ...skills?.getAllSkills
                                            .find(skill => skill.skillName === item.value), __typename: undefined
                                    })))
                                }} />
                        </div>

                        <div className="w-1/2">
                            <CustomSelect
                                label={'Languages'}
                                multiple={true}
                                value={watch().languages?.map(skill => ({ label: skill.languageName, value: skill.languageName })) || ''}
                                options={languages?.getAllLanguages?.map(skill => ({ label: skill.languageName, value: skill.languageName })) || []}
                                onChange={(values) => {
                                    setValue('languages', values.map((item: any) => ({
                                        ...languages?.getAllLanguages
                                            .find(skill => skill.languageName === item.value), __typename: undefined
                                    })))
                                }} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium">Experience</div>
                        <div><button type="button"
                            onClick={() => append({ company: '', startOfWork: '' })}
                            className="add-btn p-2">Add</button></div>
                    </div>
                    <div className="w-full flex flex-col items-center gap-4">
                        {fields.map((field, index) => {
                            return <div key={field.id}>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/3">
                                        <TextFieldController
                                            label="Company"
                                            control={control}
                                            name={`experience.${index}.company`} />
                                    </div>
                                    <div className="w-1/3">
                                        <TextFieldController
                                            label="Start of work"
                                            control={control}
                                            name={`experience.${index}.startOfWork`} />
                                    </div>
                                    <div className="w-1/3">
                                        <TextFieldController
                                            label="End of work"
                                            control={control}
                                            name={`experience.${index}.endOfWOrk`} />
                                    </div>
                                </div>
                                <div className="flex items-end gap-4">
                                    <div className="w-1/3">
                                        <TextFieldController
                                            label="Years worked"
                                            control={control}
                                            name={`experience.${index}.yearsWorked`} />
                                    </div>
                                    <div className="w-2/3 flex items-end gap-4">
                                        <div className="grow">
                                            <TextFieldController
                                                label="Details"
                                                control={control}
                                                name={`experience.${index}.details`} />
                                        </div>

                                        <button type="button" className="remove-btn p-2" onClick={() => remove(index)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium">Certificates</div>
                        <div><button type="button"
                            onClick={() => append_certificate({ certificateName: '' })}
                            className="add-btn p-2">Add</button></div>
                    </div>
                    <div className="w-full flex flex-col items-center gap-4">
                        {certificate_fields.map((field, index) => {
                            return <div key={field.id}>
                                <div className="flex items-end gap-4">
                                    <div className="w-1/3">
                                        <TextFieldController
                                            label="Name"
                                            control={control}
                                            name={`certificates.${index}.certificateName`} />
                                    </div>

                                    <div className="w-1/3">
                                        <TextFieldController
                                            label="Acquisition Date"
                                            control={control}
                                            name={`certificates.${index}.acquisitionDate`} />
                                    </div>

                                    <div className="w-1/3">
                                        <TextFieldController
                                            label="Expiry Date"
                                            control={control}
                                            name={`certificates.${index}.expiryDate`} />
                                    </div>

                                    <button className="remove-btn p-2" type="button"
                                        onClick={() => remove_certificate(index)}>Delete</button>
                                </div>


                            </div>
                        })}
                    </div>

                    <div className="w-full">
                        <label className="font-medium inline-block" style={{ marginBottom: '6px' }}>Description</label>
                        <textarea {...register("description")} rows={5} name="description" className="textarea-input rounded w-full bordered p-4"></textarea>
                    </div>

                    {/* <div className="upload-resume">Upload Resume</div> */}
                </div>
            </div>
            <div className="form-actions w-full flex items-center mt-8 gap-4 justify-center">
                <button type="button" onClick={() => router.back()} className="form-btn form-btn--1">Cancel</button>
                <button type="submit" className="form-btn form-btn--2" disabled={mutationLoading}>Save</button>
            </div>
        </form>
    </div>
}