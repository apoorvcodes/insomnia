import React, { Fragment, FunctionComponent, ReactNode, useCallback } from 'react';
import { ACTIVITY_HOME, GlobalActivity } from '../../common/constants';
import coreLogo from '../images/insomnia-core-logo.png';
import { strings } from '../../common/strings';
import WorkspaceDropdown from './dropdowns/workspace-dropdown';
import ActivityToggle from './activity-toggle';
import type { WrapperProps } from './wrapper';
import { Header, Breadcrumb } from 'insomnia-components';
import AccountDropdown from './dropdowns/account-dropdown';
import SettingsButton from './buttons/settings-button';
import { isCollection, isDesign } from '../../models/workspace';

interface Props {
  wrapperProps: WrapperProps;
  handleActivityChange: (workspaceId: string, activity: GlobalActivity) => Promise<void>;
  gridRight: ReactNode;
}

const WorkspacePageHeader: FunctionComponent<Props> = ({
  gridRight,
  handleActivityChange,
  wrapperProps: {
    activeApiSpec,
    activeWorkspace,
    activeEnvironment,
    settings,
    activity,
    isLoading,
  },
}) => {
  const collection = isCollection(activeWorkspace);
  const design = isDesign(activeWorkspace);
  const homeCallback = useCallback(
    () => handleActivityChange(activeWorkspace._id, ACTIVITY_HOME),
    [activeWorkspace._id, handleActivityChange],
  );

  const workspace = (
    <WorkspaceDropdown
      displayName={collection ? activeWorkspace.name : activeApiSpec.fileName}
      activeEnvironment={activeEnvironment}
      activeWorkspace={activeWorkspace}
      activeApiSpec={activeApiSpec}
      hotKeyRegistry={settings.hotKeyRegistry}
      isLoading={isLoading}
    />
  );

  return (
    <Header
      className="app-header theme--app-header"
      gridLeft={
        <Fragment>
          <img src={coreLogo} alt="Insomnia" width="24" height="24" />
          <Breadcrumb
            crumbs={[{ id: 'home', node: strings.home.singular, onClick: homeCallback },
              { id: 'workspace', node: <Fragment key="workspace-dd">{workspace}</Fragment> }]}/>
        </Fragment>
      }
      gridCenter={
        design && (
          <ActivityToggle
            activity={activity}
            handleActivityChange={handleActivityChange}
            workspace={activeWorkspace}
          />
        )
      }
      gridRight={
        <>
          {gridRight}
          <SettingsButton className="margin-left" />
          <AccountDropdown className="margin-left" />
        </>
      }
    />
  );
};

export default WorkspacePageHeader;
