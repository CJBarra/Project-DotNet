import React, { Fragment, useContext, useEffect } from "react";
import {
  Segment,
  Header,
  Form,
  Button,
  Comment,
  Container
} from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

const ActivityDetailChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity
  } = rootStore.activityStore;

  useEffect(() => {
    createHubConnection(activity!.id);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Container style={{ overflow: "auto", maxHeight: "20em" }}>
            {activity &&
              activity.comments &&
              activity.comments.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar src={comment.image || "/assets/user.png"} />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profile/${comment.username}`}
                    >
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistance(comment.createdAt, new Date())}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.body}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
          </Container>
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Add a comment.."
                  primary
                  loading={submitting}
                />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};
export default observer(ActivityDetailChat);
