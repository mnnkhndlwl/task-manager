import * as Yup from 'yup'

export const TaskSchema = Yup.object({
    title: Yup.string().required('Please enter your username'),
    desc: Yup.string().min(6).required('Please enter your password')
})

export const TaskInitialValues = {
    title: '',
    desc: ''
}