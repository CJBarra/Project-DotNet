import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const activitiyStore = useContext(ActivityStore);

  //-------- REACT Hook
  // Access api agent file for requests objects '../api/agent.ts'
  useEffect(() => {
    activitiyStore.loadActivities();
  }, [activitiyStore]);

  if (activitiyStore.loadingInitial)
    return <LoadingComponent content="Loading activities.." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>filters</h3>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
