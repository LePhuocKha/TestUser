import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { swalToast } from "../../component/swal-notification";
import { login } from "../../api/user/login";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email.")
        .required("Required to enter email."),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required to enter password."),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true)
        const data = await login(values?.email, values?.password)
       
        Cookies.set('access_token', data?.data?.access_token)
        Cookies.set('expires', data?.data?.expires)
        Cookies.set('refresh_token', data?.data?.refresh_token)
        Cookies.set('user', JSON.stringify({
          email:values?.email,
          user:values?.email
        }))

         formik?.setFieldValue('email', '')
         formik?.setFieldValue('password', '')
          navigate('/')
            swalToast.fire({
                icon: 'success',
                title: `login successfully`,
            })
      } catch (error) {        
             swalToast.fire({
                icon: 'error',
                title: `Your email or password is incorrect.`,
            })
      }finally{
        setLoading(false)
      }
    },

  });

  return (
    <main className="flex items-center justify-center w-full px-4 h-screen bg-linear-to-t from-sky-500 -14 bg-linear-65 from-purple-500 to-pink-500">
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col max-w-96 bg-white p-[30px] rounded-xs "
      >
        <h2 className="text-4xl font-medium text-gray-900">Sign in</h2>

        <p className="mt-4 text-base text-gray-500/90">
          Please enter email and password to access.
        </p>

        <div className="mt-10">
          <label className="font-medium">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Please enter your email"
            className="mt-2 rounded-md ring ring-gray-200 px-3 py-3 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className="mt-6">
          <label className="font-medium">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Please enter your password"
            className="mt-2 rounded-md ring ring-gray-200 px-3 py-3 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!!(formik.touched.password && formik.errors.password)  || !!(formik.touched.email && formik.errors.email)}
          className={`mt-8 py-3 w-full rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-[0.6] ${loading? 'opacity-[0.6]' : 'opacity-[1]'}`}
        >
          {loading? 'Loading...' : 'Login'}
        </button>
      </form>
    </main>
  );
};

export default Login;