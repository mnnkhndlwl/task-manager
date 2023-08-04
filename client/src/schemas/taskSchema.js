import * as Yup from 'yup'

export const TaskSchema = Yup.object({
    title: Yup.string().required('Please enter your title'),
    desc: Yup.string().required('Please enter your description')
})

export const TaskInitialValues = {
    title: '',
    desc: ''
}