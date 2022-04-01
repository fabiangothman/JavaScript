import axios from 'axios'
import { Col, Row } from 'components/grid'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import Form from '../Form'
import FormFeedback from '../FormFeedback'
import FormField from '../FormField'
import styles from './ContactForm.module.scss'

export const YupFormat = Yup.object({
  firstName: Yup.string().required('Please provide your first name'),
  lastName: Yup.string().required('Please provide your last name'),
  email: Yup.string()
    .email('Please provide a valid email address')
    .required('Please provide a valid email address'),
  message: Yup.string().required('Please fill in the message box')
})

const ContactForm = ({ title, subtitle, noTopBorder, noDefaultHeadline }) => {
  const [submitting, setSubmitting] = useState(false)
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true)

    try {
      await axios.post('/api/contact', values)
      setHasBeenSubmited(true)
      setTimeout(() => {
        setHasBeenSubmited(false)
      }, 3000)
      resetForm()
      setSubmitMessage('')
    } catch (error) {
      console.log('err', error)
      setSubmitMessage(`Sorry, we couldn't send your request.`)
    } finally {
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    },
    validationSchema: YupFormat,
    onSubmit: handleSubmit
  })

  return (
    <div className={styles.component}>
      <div className="large-container-with-left-pad">
        <Row>
          <Col xs={12} lg={6}>
            <h1 className={`${noDefaultHeadline ? styles.headline : styles.defaultHeadline}`}>
              {title}
            </h1>
            <p className={styles.text}>{subtitle}</p>
            <Form onSubmit={formik.handleSubmit} className={styles.contactForm}>
              <FormField
                className={styles.field}
                disabled={submitting}
                label="First name"
                type="text"
                error={formik.errors.firstName}
                {...formik.getFieldProps('firstName')}
              />

              <FormField
                className={styles.field}
                disabled={submitting}
                label="Last name"
                type="text"
                error={formik.errors.lastName}
                {...formik.getFieldProps('lastName')}
              />

              <FormField
                className={styles.field}
                disabled={submitting}
                label="Email Address"
                type="email"
                error={formik.errors.email}
                {...formik.getFieldProps('email')}
              />

              <FormField
                className={styles.field}
                disabled={submitting}
                label="Your Message"
                type="textarea"
                error={formik.errors.message}
                {...formik.getFieldProps('message')}
              />

              <button
                disabled={submitting}
                tag="button"
                className={styles.submitButton}
                type="submit"
              >
                {submitting ? 'Submitting' : 'Submit'}
              </button>
              {hasBeenSubmited && (
                <p className={styles.feedback}>Your message has been submitted. Thank you.</p>
              )}
              <FormFeedback className={styles.formFeedback} errors={submitMessage} />
            </Form>
          </Col>
          <Col xs={12} lg={6}>
            <div className={`${styles.borderTop} ${noTopBorder ? styles.displayNone : ''}`} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ContactForm
