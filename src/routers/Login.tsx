import {gql, useMutation} from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Seperator from "../components/auth/Seperator";
import PageTitle from "../components/PageTitle";

//todo https://github.com/nomadcoders/instaclone-web/blob/master/src/screens/Login.js

interface IForm {
  nickname: string
  password: string
}

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($nickname: String!, $password: String!){
    login(nickname: $nickname, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login () {
  const location = useLocation();
  console.log(location)
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      nickname: location?.state?.nickname || "",
      password: location?.state?.password || "",
    }
  });
  // const [login, {loading}] = useMutation(LOGIN_MUTATION, {
  //   onCompleted
  // });
  // const onCompleted = data => {
    // console.log(data);
    // //todo onCompleted
    // const {
    //   login: {ok, error, token}
    // } = data;
    // if (!ok) {
    //   return setError("result", {
    //     message: error
    //   });
    // }
  // };
  //todo useMutation
  const onSubmitValid: SubmitHandler<IForm> = data => {
    console.log(data);
    const {nickname, password} = data;
  };
  return (
    <AuthLayout>
      <PageTitle title="Login"/>
      <FormBox>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("nickname", {
              required: "nickname is required",
              minLength: {
                value: 5,
                message: "nickname should be longer than 5 chars.",
              },
            })}
            type="text"
            placeholder="nickname"
            hasError={Boolean(errors?.nickname?.message)}
          />
          <FormError message={errors?.nickname?.message}/>
          <Input 
            {...register("password", {
              required: "password is required"
            })}
            type="password"
            placeholder="password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message}/>
          {/* todo loading */}
          <Button
            type="submit"
            value="log in"
            disabled={false}
          />
          <FormError message={errors?.result?.message}/>
        </form>
        <Seperator />
      </FormBox>
      <BottomBox 
        cta="Don't have an account?"
        linkText="Sign up"
        link={"/sign-up"}
      />
    </AuthLayout>
  )
}

export default Login;