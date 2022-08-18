import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
//import {loginAction} from "../../../redux/actions/loginAction"
import {loginAction} from "../../../redux/actions/loginAction"
import {useSelector,useDispatch} from "react-redux";
import Collapse from "@mui/material/Collapse";
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const userLogin=useSelector(state=>state.userLogin)
  const [open, setOpen] = useState(true);


  const handleClose=()=>{
        setOpen(false)
      }
  const [showPassword, setShowPassword] = useState(false);
 
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    console.log("values:",values)
    await dispatch(loginAction(values,navigate))
  };

  return (
    
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    {
      !userLogin.error? null:
       <Collapse in={open}>
       <Alert
       severity="error"
         action={
           <IconButton
             aria-label="close"
             color="inherit"
             size="small"
             onClick={handleClose}
            //  onClick={() => {
            //    setOpen(false);
            //  }}
           >
             <CloseIcon fontSize="inherit" />
           </IconButton>
         }
         sx={{ mb: 0.2 }}
       >
        {userLogin.error}
       </Alert>
     </Collapse>
    }    
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
         <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
    
  );
}
