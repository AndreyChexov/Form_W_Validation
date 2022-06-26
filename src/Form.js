import './appStyle.scss';
import {Formik, Form, Field, ErrorMessage, useField} from "formik";
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return (
            <>
                    <label htmlFor={props.name}>{label}</label>
                    <input {...props} {...field}/>
                    {meta.touched && meta.error ? (
                        <div className='error'>{meta.error}</div>
                    ) : null}
            </>
        )
}

const CustomForm = () => {

    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                phone: '',
                date: '',
                text: '',
                terms: false
        }}

            validationSchema = {Yup.object({
                name: Yup.string()
                    .min(2, 'Поле должно содержать более 2 символов!')
                    .required('Обязательное поле'),
                    email: Yup.string()
                    .email('Введите корректный Email')
                    .required('Обязательное поле'),
                    phone: Yup.number()
                    .required('Введите номер телефона'),
                    date: Yup.date()
                    .required('Укажите дату рождения'),
                    text: Yup.string()
                    .min(3, 'Минимум 3 символа')
                    .max(300, 'Максимум 300 символов'),
                    terms: Yup.boolean()
                    .required('Необходимо согласие')
                    .oneOf([true], 'Необходимо согласие'),

        })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}

        >

                <Form className="form">
                        <h2>Заполните форму</h2>
                        <MyTextInput
                                label='Ваше имя'
                                id="name"
                                name="name"
                                type="text"
                        />

                        <MyTextInput
                                label='Ваша почта'
                                id="email"
                                name="email"
                                type="email"
                        />

                        <label htmlFor="phone">Номер телефона</label>
                        <Field
                            id="phone"
                            name="phone"
                            type="number"
                            placeholder='+7 (ААА) ХХХ-ХХ-ХХ'
                        />
                        <ErrorMessage name='phone' className='error' component='div'/>
                        <label htmlFor="date">Дата рождения</label>
                        <Field
                            id="date"
                            name="date"
                            type='date'
                            >
                        </Field>
                        <ErrorMessage name='currency' className='error' component='div'/>
                        <label htmlFor="text">Ваше сообщение</label>
                        <Field
                            id="text"
                            name="text"
                            as='textarea'
                        />
                        <ErrorMessage name='text' className='error' component='div'/>
                        <label className="checkbox" >
                                <Field name="terms" type="checkbox"/>
                                Соглашаетесь с политикой конфиденциальности?
                        </label>
                        <ErrorMessage name='terms' className='error' component='div'/>
                        <button type="submit">Отправить</button>
                </Form>
        </Formik>
    )
}

export default CustomForm;
