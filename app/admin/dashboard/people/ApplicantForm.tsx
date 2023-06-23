'use client'
import { TextFieldController } from "@/common/components/inputs/text-filed-controller";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UploadIcon } from "@/common/icons/UploadIcon";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { ROUTE_ADMIN, ROUTE_DASHBOARD, ROUTE_PEOPLE } from "@/common/constants";
import { CustomDatePicker } from "@/common/components/inputs/date-picker/DatePicker";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { IApplicant, ILanguage, ISkills, SkillTypesEnum } from "@/common/components/models/applicants.model";
import { CustomSelect } from "@/common/components/inputs/custom-select";
import { genders, specialization } from "@/common/constants/applicant.constants";
import { FC, useEffect, useState } from "react";
import { removeTypename, replaceEmptyStringWithUndefined } from "@/common/components/utils/function";
import { yupResolver } from "@hookform/resolvers/yup"
import { schema, skillSchema } from "@/common/schemas/applicantschemas";
import './add/styles.css'
import { DeleteIcon } from "@/common/icons/DeleteIcon";
import { AddIcon } from "@/common/icons/AddIcon";
import { GET_APPLICANT_BY_ID } from "@/app/applicants/[applicantPage]/[id]/query";

const createMutationByType = (type: string, id?: string) => {
    return gql`
    mutation ($input: ApplicantInput, ${id ? '$id: ID!' : ''}) {
      ${type}(input: $input,  ${id ? 'id: $id' : ''}) {
        id
      }
    }
  `;
}

export const LANGUAGES_QUERY = gql`
    query languages {
        getAllLanguages {
            languageName
          }
    } 
`

export const SKILLS_QUERY = gql`
    query skills {
        getAllSkills {
            skillName
            skillType
        }
    }
`

export const VISAS_QUERY = gql`
    query visas {
        getAllVisas
    }
`

export const ApplicantForm: FC<{ id?: string }> = () => {
    const { id } = useParams();
    const router = useRouter();
    const [profilePicture, setProfilePicture] = useState<any>();
    const [resume, setResume] = useState<any>();
    const [applicantMutation, { loading: mutationLoading }] = useMutation(createMutationByType(id ? 'updateApplicantById' : 'createApplicant', id));
    const { data: languages } = useQuery<Record<'getAllLanguages', ILanguage[]>>(LANGUAGES_QUERY)
    const { data: skills } = useQuery<Record<'getAllSkills', ISkills[]>>(SKILLS_QUERY)
    const { data: visas } = useQuery<Record<'getAllVisas', string[]>>(VISAS_QUERY)
    const { data: applicant } = useQuery<Record<'getApplicantById', IApplicant>>(GET_APPLICANT_BY_ID, {
        variables: { id: id },
        skip: !id,
        fetchPolicy: 'no-cache'
    })

    const { control, handleSubmit, register, setValue, watch, reset, formState: { errors } } = useForm<IApplicant>({
        defaultValues: {
            firstName: '',
            lastName: '',
            country: '',
            degree: '',
            resumeGoogleDrivePath: '',
            gender: '',
            description: '',
            email: '',
            experience: [{ company: '', startOfWork: '' }],
            certificates: [{ acquisitionDate: '', certificateName: '' }]
        },
        resolver: yupResolver(schema as any),
        mode: 'onBlur'
    });

    const { fields, append, remove } = useFieldArray({ name: 'experience', control })
    const { fields: certificate_fields, append: append_certificate, remove: remove_certificate } =
        useFieldArray({ name: 'certificates', control })

    const { control: additionalFieldsControl, setValue: setAdditionalFieldsValue, watch: watchAdditionalFields, getValues } =
        useForm<{ additionalSkills: ISkills[], additionalLanguages: ILanguage[] }>({
            defaultValues: {
                additionalSkills: [], additionalLanguages: []
            },
            mode: 'onBlur',
            resolver: yupResolver(skillSchema) as any
        });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } =
        useFieldArray({
            name: 'additionalSkills',
            control: additionalFieldsControl,
        });

    const { fields: skillFLanguage, append: appendLanguage, remove: removeLanguage } =
        useFieldArray({
            name: 'additionalLanguages',
            control: additionalFieldsControl
        });

    const checkArrayLength = (arr?: any) => {
        return Array.isArray(arr) && arr.length ? arr : []
    }
    const onSubmit = (values: IApplicant) => {
        console.log('values', values);
        const additionalValues = getValues();
        delete values.experience[0]?.endOfWOrk;
        delete values.experience[0]?.id;
        delete values.certificates[0]?.id;
        delete values.id;
        delete values.profilePicture;
        values.skills = [...checkArrayLength(values?.skills), ...additionalValues.additionalSkills];
        values.languages = [...checkArrayLength(values?.languages), ...additionalValues.additionalLanguages]
        applicantMutation({
            variables:
            {
                input: {
                    ...replaceEmptyStringWithUndefined(removeTypename({ ...values })),
                    profilePicture: profilePicture || undefined,
                    resume: resume || undefined
                }, id: id
            }
        })
            .then(res => router.push(`${ROUTE_ADMIN}${ROUTE_DASHBOARD}/${ROUTE_PEOPLE}`))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (applicant?.getApplicantById && id) {
            reset(applicant.getApplicantById)
        }
    }, [applicant])

    return <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper mb-2">
            <div className="form-fields rounded">
                <div className="upload-actions flex">
                    <div className="user-photo h-full">
                        <ImageUploader
                            onChange={(file: File) => setProfilePicture(file)}
                            imagePath={applicant?.getApplicantById.profilePicture?.path} />
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
                                onChange={(date: Date) => {
                                    setValue('dateOfBirth', date.toLocaleString())
                                }}
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
                                value={genders.find(gender => gender.value === watch().gender) || ''}
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
                                value={visas?.getAllVisas.map(visa => ({ value: visa, label: visa })).find(visa => visa.value === watch().visa) || ''}
                                options={visas?.getAllVisas.map(visa => ({ value: visa, label: visa })) || []}
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

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-end justify-between gap-2">
                            <div className="flex-grow">
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
                            <div>
                                <button type="button"
                                    onClick={() => appendSkill({ skillName: '', skillType: SkillTypesEnum.FRONTEND })}
                                    className="add-btn p-2  text-sm"><AddIcon /></button>
                            </div>
                        </div>
                        {skillFields?.length !== 0 && skillFields
                            .map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-end">
                                    <div className="grow flex gap-2">
                                        <div className="w-1/2">
                                            <CustomSelect
                                                label={'Type'}
                                                multiple={false}
                                                value={{
                                                    label: watchAdditionalFields().additionalSkills[index].skillType,
                                                    value: watchAdditionalFields().additionalSkills[index].skillType,
                                                }}
                                                options={specialization}
                                                onChange={(values) => {
                                                    setAdditionalFieldsValue(`additionalSkills.${index}.skillType`, values.value)
                                                }} />
                                        </div>
                                        <div className="w-1/2">
                                            <TextFieldController
                                                label="Name"
                                                control={additionalFieldsControl}
                                                name={`additionalSkills.${index}.skillName`}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" className="remove-btn p-2 "
                                        onClick={() => removeSkill(index)}><DeleteIcon /></button>
                                </div>))}
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-end justify-between gap-2">
                            <div className="flex-grow">
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
                            <div>
                                <button type="button"
                                    onClick={() => appendLanguage({ languageName: '' })}
                                    className="add-btn p-2 text-sm"><AddIcon /></button>
                            </div>
                        </div>
                        {skillFLanguage?.length !== 0 &&
                            skillFLanguage.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-end">
                                    <div className="grow flex gap-2">
                                        <div className="w-full">
                                            <TextFieldController
                                                label="Name"
                                                control={additionalFieldsControl}
                                                name={`additionalLanguages.${index}.languageName`}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" className="remove-btn p-2"
                                        onClick={() => removeLanguage(index)}><DeleteIcon /></button>
                                </div>))}
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="font-medium">Experience</div>
                        <div><button type="button"
                            onClick={() => append({ company: '', startOfWork: '' })}
                            className="add-btn p-2"><AddIcon /></button></div>
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

                                        <button type="button" className="remove-btn p-2" onClick={() => remove(index)}><DeleteIcon /></button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="font-medium">Certificates</div>
                        <div>
                            <button type="button"
                                onClick={() => append_certificate({ certificateName: '' })}
                                className="add-btn p-2"><AddIcon /></button>
                        </div>
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
                                        onClick={() => remove_certificate(index)}><DeleteIcon /></button>
                                </div>


                            </div>
                        })}
                    </div>

                    <div className="w-full">
                        <label className="font-medium inline-block" style={{ marginBottom: '6px' }}>Description</label>
                        <textarea {...register("description")} rows={5} name="description" className="textarea-input rounded w-full bordered p-4"></textarea>
                    </div>

                    <div className="upload-resume relative">
                        <div>
                            <input
                                className="w-full absolute opacity-0 cursor-pointer"
                                type="file"
                                onChange={(e) => setResume(e.target.files?.[0] || null)}></input>
                        </div>
                        <div className="flex gap-4">
                            {resume ?
                                <div className="max-w-lg overflow-hidden h-6">
                                    {resume.name}
                                </div> :
                                <span>
                                    Upload Resume
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-actions w-full flex items-center mt-8 gap-4 justify-center">
                <button type="button" onClick={() => router.back()} className="form-btn form-btn--1">Cancel</button>
                <button type="submit" className="form-btn form-btn--2" disabled={mutationLoading}>Save</button>
            </div>
        </form>
    </div>
}