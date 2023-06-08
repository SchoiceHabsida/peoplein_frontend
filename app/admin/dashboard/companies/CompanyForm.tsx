'use client'
import { TextFieldController } from "@/common/components/inputs/text-filed-controller";
import { useForm } from "react-hook-form";
import { UploadIcon } from "@/common/icons/UploadIcon";

import './add/styles.css'

export const CompanyForm = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            regNumber: ''
        }
    });
    const onSubmit = (values: any) => {
        console.log(values)
    }
    return <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper mb-2">
            <div className="form-fields rounded">
                <div className="upload-actions flex">
                    <div className="user-photo h-full flex items-center justify-center cursor-pointer">
                        <UploadIcon />
                    </div>
                    <div className="user-logo h-full flex items-center justify-center cursor-pointer flex-grow">
                        <UploadIcon />
                    </div>
                </div>
                
                <div className="flex flex-col gap-4 mt-2">

                    <div className="w-1/2">
                        <TextFieldController
                            name="companyName"
                            control={control}
                            placeholder="Company name"
                            label="Company name"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="regNumber"
                            control={control}
                            placeholder="Сompany registration number"
                            label="Сompany registration number"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="abilities"
                            control={control}
                            placeholder="What abilities are needed"
                            label="What abilities are needed"
                        ></TextFieldController>
                    </div>

                    <div className="w-1/2">
                        <TextFieldController
                            name="country"
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

                    <div className="w-1/2">
                        <TextFieldController
                            name="web_site"
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
                            name="name"
                            control={control}
                            placeholder="Name"
                            label="Name"
                        ></TextFieldController>
                    </div>

                    <div className="upload-resume">Upload Resume</div>
                </div>
            </div>
            <div className="form-actions w-full flex items-center mt-8 gap-4 justify-center">
                <button className="form-btn form-btn--1">Cancel</button>
                <button type="submit" className="form-btn form-btn--2">Save</button>
            </div>
        </form>
    </div>
}