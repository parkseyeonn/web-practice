import {gql, useMutation} from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { MutationLoginArgs } from "../gql/graphql"; 
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Seperator from "../components/auth/Seperator";
import PageTitle from "../components/PageTitle";
import { logUserIn } from "../reactiveVar";

interface IForm {
  nickname: String
  password: String
  result?: String
}

const Notification = styled.div`
  color: #2ecc71;
`;

const SForm = styled.form`
  width: 100%;
`;

const LOGIN_MUTATION = gql`
  mutation login($nickname: String!, $password: String!) {
    login(nickname: $nickname, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login () {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      nickname: location?.state?.nickname || "",
      password: location?.state?.password || "",
      result: "",
    }
  });
  const navigate = useNavigate();
  const onCompleted = (data: any) => {
    const {
      login: {ok, error, token}
    } = data; 
    if (!ok) {
      return setError("result", {
        message: error
      });
    }
    if(token) {
      logUserIn(token);
      navigate("/", {replace: true});
    }
  };
  const [login, {loading}] = useMutation<MutationLoginArgs>(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid: SubmitHandler<IForm> = data => {
    if(loading) {
      return;
    }
    const {nickname, password} = data;
    login({
      variables: { nickname, password },
    });
  };
  const clearResultError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login"/>
      <FormBox>
        <Notification>{location?.state?.message}</Notification>
        <SForm onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("nickname", {
              required: "nickname is required",
              minLength: {
                value: 3,
                message: "nickname should be longer than 3 chars.",
              },
            })}
            onFocus={clearResultError}
            type="text"
            placeholder="nickname"
            hasError={Boolean(errors?.nickname?.message)}
          />
          <FormError message={errors?.nickname?.message}/>
          <Input 
            {...register("password", {
              required: "password is required"
            })}
            onFocus={clearResultError}
            type="password"
            placeholder="password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message}/>
          <Button
            type="submit"
            disabled={!isValid || loading}
          >{loading ? "Loading..." : "Log in"}</Button>
          <FormError message={errors?.result?.message}/>
        </SForm>
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