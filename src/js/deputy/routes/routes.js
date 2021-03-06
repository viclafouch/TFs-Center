import React from 'react'
import { Switch, Route } from 'react-router'
import Page from '../components/Page/Page'
import Analytics from '../containers/Analytics/Analytics'
import Targets from '../containers/Targets/Targets'
import Templates from '../containers/Templates/Templates'
import Searches from '../containers/Searches/Searches'
import TemplateInfo from '@deputy/containers/Templates/TemplateInfo'
import Flagger from '@deputy/containers/Flagger/Flagger'
import Home from '@deputy/containers/Home/Home'
import UrlsReport from '@deputy/containers/UrlsReport/UrlsReport'

function transformLocation(inputLocation) {
  const parsedQuery = new URLSearchParams(inputLocation.search)
  let contextQuery = parsedQuery.get('context')

  if (contextQuery === undefined || contextQuery === null) return inputLocation

  if (contextQuery === 'templates' && parsedQuery.get('id')) {
    contextQuery = `${contextQuery}/${parsedQuery.get('id')}`
  }

  return {
    ...inputLocation,
    pathname: '/' + contextQuery
  }
}

function Routes() {
  return (
    <Route
      render={routeProps => (
        <Switch location={transformLocation(routeProps.location)}>
          <Page path="/deputy" exact component={Flagger} />
          <Page path="/dashboard" component={Home} />
          <Page path="/deputy/url_report" exact component={UrlsReport} />
          <Page path="/analytics" exact component={Analytics} />
          <Page path="/targets" exact component={Targets} />
          <Page path="/templates" exact component={Templates} />
          <Page path="/templates/:id" component={TemplateInfo} />
          <Page path="/searches" exact component={Searches} />
          <Route path="*">404</Route>
        </Switch>
      )}
    />
  )
}

export default Routes
