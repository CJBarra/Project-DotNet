import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { Form, Button, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/User";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(err => ({
          [FORM_ERROR]: err
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        pristine,
        dirtyFieldsSinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" content="Login" color="blue" textAlign="center" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtyFieldsSinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text="Invalid email or password"
            />
          )}
          <br />
          <Button
            loading={submitting}
            color="instagram"
            content="Login"
            disabled={pristine}
            fluid
          />

          {/* <pre>{JSON.stringify(form.getState(), null, 2)} </pre> */}
        </Form>
      )}
    />
  );
};
export default LoginForm;
