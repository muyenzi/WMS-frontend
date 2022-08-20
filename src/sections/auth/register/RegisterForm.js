import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { signupAction } from '../../../redux/actions/signupAction';
import {useSelector,useDispatch} from "react-redux";

import Collapse from "@mui/material/Collapse";
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
const dispatch=useDispatch();
const signup=useSelector(state=>state.signup);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(true);
  const RegisterSchema = Yup.object().shape({
    authCode: Yup.string().required('Authentication Code n required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    authCode: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const handleClose=()=>{
    setOpen(false)
  }
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    await dispatch(signupAction(values,navigate))
    if(signup.error){
      setOpen(true)
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    {
      !signup.error? null:
       <Collapse in={open}>
       <Alert
       severity="error"
         action={
           <IconButton
             aria-label="close"
             color="inherit"
             size="small"
             onClick={handleClose}
           
           >
             <CloseIcon fontSize="inherit" />
           </IconButton>
         }
         sx={{ mb: 0.2 }}
       >
        {signup.error}
       </Alert>
     </Collapse>
    }    
      <Stack spacing={3}>
        <Stack spacing={2}>
          <RHFTextField name="authCode" label="Authentication Code " />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
