import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import DropZone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  profilePic: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialRegValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  profilePic: "",
};

const initialLoginValues = {
  username: "",
  password: "",
};

function Form() {
  const [errorMsg, setErrorMsg] = useState("");
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("profilePic", values.profilePic.name);
    axios
      .post("http://localhost:3001/auth/register", formData)
      .then((response) => {
        onSubmitProps.resetForm();
        console.log(values);
        setPageType("login");
      })
      .catch((error) => {
        setErrorMsg("User with the given email or username already exists");
      });
  };

  const login = async (values, onSubmitProps) => {
    axios
      .post("http://localhost:3001/auth/login", values)
      .then((response) => {
        onSubmitProps.resetForm();
        console.log(values);
        const user = response.data.userReq;
        if (user) {
          dispatch(
            setLogin({
              user,
              token: response.data.token,
            })
          );
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMsg("Invalid username or password");
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) {
      await register(values, onSubmitProps);
    }
    if (isLogin) await login(values, onSubmitProps);
  };

  return (
    <>
      {errorMsg && (
        <Box
          color="red"
          textAlign="center"
          sx={{
            p: "0.5rem",
            m: "0.5rem 0",
            fontSize: "1rem",
          }}
        >
          <p>{errorMsg}</p>
        </Box>
      )}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialLoginValues : initialRegValues}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNotMobile ? undefined : "span 1" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    label="Email Id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Box
                    gridColumn="span 2"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <DropZone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("profilePic", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="0rem 0.5rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.profilePic ? (
                            <p style={{ margin: "12px 6px" }}>
                              Add Profile Picture here
                            </p>
                          ) : (
                            <FlexBetween m="12px 6px">
                              <Typography>{values.profilePic.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </DropZone>
                  </Box>
                </>
              )}

              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
                type="password"
              />
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: palette.primary.light,
                  color: palette.primary.dark,
                  marginTop: "2rem",
                  p: "1rem",
                  "&:hover": {
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                  },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  errorMsg && setErrorMsg("");
                  resetForm();
                }}
                marginTop="0.5rem"
                sx={{
                  color: palette.primary.main,
                  textDecoration: "underline",
                  cursor: "pointer",
                  width: "max-content",
                }}
              >
                {isLogin
                  ? "New to Sociopedia? Create an Account"
                  : "Already have an account? Login here"}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Form;
