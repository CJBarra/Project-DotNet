import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial} = rootStore.activityStore;

  //-------- REACT Hooks
  // Access api agent file for requests objects '../api/agent.ts'
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activities.." />;

  return (
    <Grid stackable columns={1}>
      <Grid.Column>
        <ActivityList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
