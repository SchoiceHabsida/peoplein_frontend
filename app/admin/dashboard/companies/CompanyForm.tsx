'use client'
import { TextFieldController } from "@/common/components/inputs/text-filed-controller";
import { useForm } from "react-hook-form";

import './add/styles.css'
import { ICompany } from "@/common/components/models/companies.model";
import { useParams, useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import { removeTypename } from "@/common/components/utils/function";
import { ROUTE_ADMIN, ROUTE_COMPANIES, ROUTE_DASHBOARD } from "@/common/constants";
import { ISkills } from "@/common/components/models/applicants.model";
import { SKILLS_QUERY, VISAS_QUERY } from "../people/ApplicantForm";
import { CustomSelect } from "@/common/components/inputs/custom-select";
import { useEffect, useState } from "react";
import { CustomDatePicker } from "@/common/components/inputs/date-picker/DatePicker";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { GET_COMPANY_QUERY } from "@/components/company-details/CompanyDetails";

const createMutationByType = (type: string, id?: string) => {
    return gql`
    mutation (${!id ? '$company: CompanyInput, $input: UserInput!' : '$input: CompanyInput'}, ${id ? '$id: ID!' : ''}) {
      ${type}(${!id ? 'input: $input, company: $company' : 'input: $input,'},  ${id ? 'id: $id' : ''}) {
        id
      }
    }
  `;
}

export const CompanyForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const [logo, setLogo] = useState<any>();
    const [banner, setBanner] = useState<any>();
    const { data: skills } = useQuery<Record<'getAllSkills', ISkills[]>>(SKILLS_QUERY)
    const { data: visas } = useQuery<Record<'getAllVisas', string[]>>(VISAS_QUERY);
    const { data: company } = useQuery<Record<'getCompanyById', ICompany>>(GET_COMPANY_QUERY, {
        variables: { id: id },
        skip: !id,
        fetchPolicy: 'no-cache'
    })

    const [companyMutation, { loading: mutationLoading }] =
        useMutation(createMutationByType(id ? 'updateCompany' : 'registrationCompany', id));

    const { control, handleSubmit, setValue, watch, reset } = useForm<ICompany>({
        defaultValues: {
            name: '',
            address: '',
            phoneNumber: '',
            hrManager: '',
            registrationNumber: '',
            email: '',
            foundedAt: '',
            website: '',
            preferredVisas: [],
            requiredSkills: [],
        }
    });

    useEffect(() => {
        if (company?.getCompanyById && id) {
            reset(company.getCompanyById)
        }
    }, [company])

    const { control: controlUser, getValues } = useForm<{ username: string, password: string }>({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    const onSubmit = (values: any) => {
        console.log(values)
        const userData = getValues();
        delete values.id
        delete values.favoriteApplicants
        companyMutation({
            variables: {
                input: userData.password && userData.username && !id ? userData : undefined,
                [id ? 'input' : 'company']: {
                    ...removeTypename({ ...values }),
                    logo: logo || undefined,
                    banner: banner || banner
                },
                id: id,
            }
        })
            .then(res => router.push(`${ROUTE_ADMIN}${ROUTE_DASHBOARD}/${ROUTE_COMPANIES}`))
            .catch(error => console.log(error))
    }

    return <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper mb-2">
            <div className="form-fields rounded">
                <div className="upload-actions flex">
                    <div className="user-photo h-full cursor-pointer">
                        <ImageUploader
                            onChange={(file: File) => setLogo(file)}
                            imagePath={company?.getCompanyById.logo?.path} />
                    </div>
                    <div className="user-logo h-full cursor-pointer flex-grow">
                        <ImageUploader
                            aspect={523 / 205}
                            onChange={(file: File) => setBanner(file)}
                            imagePath={company?.getCompanyById.banner?.path} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-2">

                    <div className="w-1/2">
                        <TextFieldController
                            name="name"
                            control={control}
                            placeholder="Company name"
                            label="Company name"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="registrationNumber"
                            control={control}
                            placeholder="Сompany registration number"
                            label="Сompany registration number"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="hrManager"
                            control={control}
                            placeholder="Hr manager"
                            label="Hr manager"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="address"
                            control={control}
                            placeholder="Address"
                            label="Address"
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

                    <div className="w-1/2">
                        <TextFieldController
                            name="website"
                            control={control}
                            placeholder="Website"
                            label="Website"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="phoneNumber"
                            control={control}
                            placeholder="phone"
                            label="Phone number"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="address"
                            control={control}
                            placeholder="Address"
                            label="Address"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <CustomDatePicker
                            label={'Founded date'}
                            onChange={(date: Date) => {
                                setValue('foundedAt', date.toLocaleString())
                            }}
                            value={watch().foundedAt} />
                    </div>

                    {!id && <div className="flex gap-4">
                        <div className="w-1/2">
                            <TextFieldController
                                name="username"
                                control={controlUser}
                                placeholder="Username"
                                label="Username"
                            ></TextFieldController>
                        </div>
                        <div className="w-1/2">
                            <TextFieldController
                                // type="password"
                                name="password"
                                control={controlUser}
                                placeholder="Password"
                                label="Password"
                            ></TextFieldController>
                        </div>

                    </div>}

                    <div className="w-full flex items-center gap-4">
                        <div className="w-1/2">
                            <CustomSelect
                                label={'Skills'}
                                multiple={true}
                                value={watch().requiredSkills?.map(skill => ({ label: skill.skillName, value: skill.skillName })) || ''}
                                options={skills?.getAllSkills?.map(skill => ({ label: skill.skillName, value: skill.skillName })) || []}
                                onChange={(values) => {
                                    setValue('requiredSkills', values.map((item: any) => ({
                                        ...skills?.getAllSkills
                                            .find(skill => skill.skillName === item.value), __typename: undefined
                                    })))
                                }} />
                        </div>

                        <div className="w-1/2">
                            <CustomSelect
                                multiple={true}
                                label={'Visa'}
                                value={watch().preferredVisas?.map(visa => ({ label: visa, value: visa })) || []}
                                options={visas?.getAllVisas.map(visa => ({ value: visa, label: visa })) || []}
                                onChange={(values) => {
                                    setValue('preferredVisas', values.map((value: any) => value.value))
                                }} />
                        </div>
                    </div>

                </div>
            </div>
            <div className="form-actions w-full flex items-center mt-8 gap-4 justify-center">
                <button type="button" onClick={() => router.back()} className="form-btn form-btn--1">Cancel</button>
                <button disabled={mutationLoading} type="submit" className="form-btn form-btn--2">Save</button>
            </div>
        </form>
    </div>
}