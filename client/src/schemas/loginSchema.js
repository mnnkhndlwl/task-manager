import * as Yup from 'yup'

export const LoginSchema = Yup.object({
    name: Yup.string().required('Please enter your username'),
    password: Yup.string().min(6).required('Please enter your password')
})

export const LoginInitialValues = {
    name: '',
    password: ''
}