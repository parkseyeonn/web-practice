import {gql, useMutation} from "@apollo/client";
import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { BoldLink } from "../components/common";
import ROUTE from "../route";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(BoldLink)`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;

interface IForm {
  name: String
  email: String
  nickname: String
  password: String
  passwordCheck: String
}

const CREATE_ACCOUMT_MUTATION = gql`
  mutation createAccount(
    $name: String!,
    $nickname: String!,
    $email: String!
    $password: String!
  ) {
    createAccount(
      name: $name,
      nickname: $nickname,
      email: $email,
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp () {
  const {
    register,
    formState: {errors, isValid},
    handleSubmit
  } = useForm<IForm>({
    mode: "onChange"
  });
  const navigate = useNavigate();
  const onCompleted = (data: any) => {
    const {
      createAccount: {ok, error}
    } = data;
    if(!ok) {
      return;
    }
    navigate(ROUTE.LOGIN, {
      state: {
        message: "Account created. Please log in."
      }
    });
  };
  const [createAccount, {loading}] = useMutation(CREATE_ACCOUMT_MUTATION, {
    onCompleted
  });
  const onSubmitValid: SubmitHandler<IForm> = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      }
    })
  };
  return (
    <AuthLayout>
      <PageTitle title="sign up" />
      <FormBox>
        <HeaderContainer>
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input 
            {...register("name", {
              required: "name is required",
            })}
            type="text"
            placeholder="name"
          />
          <FormError message={errors?.name?.message}/>
          <Input 
            {...register("nickname", {
              required: "nickname is required",
              pattern: { 
                message: "한글, 특수문자를 제외한 2~10자 이내 영문만 사용 가능합니다.",
                value: /^[a-z0-9]{2,10}$/g
              }
            })}
            type="text"
            placeholder="nickname"
          />
          <FormError message={errors?.nickname?.message}/>
          <Input 
            {...register("email", {
              required: "email is required",
            })}
            type="email"
            placeholder="email"
          />
          <FormError message={errors?.email?.message}/>
          <Input 
            {...register("password", {
              required: "password is required",
            })}
            type="password"
            placeholder="password"
          />
          <FormError message={errors?.password?.message}/>
          <Input 
            {...register("passwordCheck", {
              required: "passwordCheck is required",
            })}
            type="password"
            placeholder="password check"
          />
          <FormError message={errors?.passwordCheck?.message}/>
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>      
      <BottomBox cta="Have an account?" linkText="log in" link={"/login"} />
    </AuthLayout>
  )
}

export default SignUp;