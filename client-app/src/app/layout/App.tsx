import React, { useEffect, Fragment, useContext } from "react";
import ActivityStore from "../stores/activityStore";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { LoadingComponent } from "./LoadingComponent";
import { observer } from "mobx-react-lite";

const App = () => {
  const activitiyStore = useContext(ActivityStore);

  //-------- REACT Hook
  // Access api agent file for requests objects '../api/agent.ts'
  useEffect(() => {
    activitiyStore.loadActivities();
  }, [activitiyStore]);

  if (activitiyStore.loadingInitial)
    return <LoadingComponent content="Loading activities.." />;

  // Pass activities as a prop to ActivityDashboard
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "5em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
