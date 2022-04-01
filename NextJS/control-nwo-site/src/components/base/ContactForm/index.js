import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Button from 'baseComponents/Button'
import Form from 'baseComponents/Form'
import FormField from 'baseComponents/FormField'
import FormFeedback from 'baseComponents/FormFeedback'
import styles from './ContactForm.module.scss'

const ContactForm= () => {
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async values => {
    const { name, email, company, position, message } = values
    setSubmitting(true)
    setSubmitMessage('')
    const submitData = {
      name, email, company, position, message
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/demoRequest`, submitData)
      setSubmitMessage('Thank you for sending your request. We will be in touch shortly')
    } catch (error) {
      setSubmitMessage(`Sorry, we couldn't send your message.`)
    } finally {
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        company: '',
        position: '',
        message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name'),
      email: Yup.string().email('valid email').required('valid email'),
      company: Yup.string().required('company name'),
      position: Yup.string().required('position'),
      message: Yup.string().required('message'),
    }),
    onSubmit: handleSubmit,
  })


  const consolidate = (error) => {
    const errors = []

    Object.keys(error).map((k) => {
      errors.push(error[k])
    })

    if (errors.length === 0) return

    if (errors.length === 1) return `A ${errors[0]} is required`

    let message = ''
    const lastError = errors.pop()

    message = `A ${errors.join(', ')} and ${lastError} are required`

    return message
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className={styles.formRow}>

        <FormField
          disabled={submitting}
          placeholder="Name"
          type="text"
          touched={formik.touched.name}
          error={formik.errors.name}
          {...formik.getFieldProps('name')}
        />

        <FormField
          disabled={submitting}
          placeholder="E-mail"
          type="email"
          touched={formik.touched.email}
          error={formik.errors.email}
          {...formik.getFieldProps('email')}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          disabled={submitting}
          placeholder="Company"
          type="text"
          touched={formik.touched.company}
          error={formik.errors.company}
          {...formik.getFieldProps('company')}
        />

        <FormField
          disabled={submitting}
          placeholder="Position"
          type="text"
          touched={formik.touched.position}
          error={formik.errors.position}
          {...formik.getFieldProps('position')}
        />
      </div>
      <FormField
        inputClassName={styles.textarea}
        disabled={submitting}
        placeholder="Message"
        type="textarea"
        touched={formik.touched.message}
        error={formik.errors.message}
        {...formik.getFieldProps('message')}
      />


      <FormFeedback className={styles.formFeedback} errors={consolidate(formik.errors)}/>

      <FormFeedback className={styles.formFeedback} errors={submitMessage}/>

      <Button tag="button" color="blue" className={styles.submitButton} type="submit">{submitting ? 'Sending...' : 'Send'}</Button>

    </Form>
  )
}

export default ContactForm
