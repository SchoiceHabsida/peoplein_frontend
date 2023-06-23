import * as yup from "yup"
import { IApplicant } from "../components/models/applicants.model"

export const schema = yup.object<IApplicant>().shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    email: yup.string().required('This field is required').email('This field must be valid email'),
  })

export const skillSchema = yup.object().shape({
    additionalSkills: yup.array()
    .of(yup.object().shape({
        skillName: yup.string()
        .ensure().required('Name is required')
    })),
    additionalLanguages: yup.array()
    .of(yup.object().shape({
        languageName: yup.string()
        .ensure().required('Name is required')
    }))
})