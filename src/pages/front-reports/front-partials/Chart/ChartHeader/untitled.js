import React from 'react';
import './ChartHeader.scss';

const ChartHeader = () => {

  return (
    <div data-ng-if="!opts.disableToolbar" className="col s12 chart-toolbar">
      {/*<!-- Left controls -->*/}
      <div className="left">
        {/*<!-- type toggle -->*/}
        <div data-ng-if="types && gt1(types.length)">
          <a className="btn dropdown-button waves-effect waves-light" href="#" data-dropdown="{activates: 'cat' + $id}"
            className="{disabled: opts.shrunk}">
            <i className="material-icons">{'to be change'}</i>
            <i className="material-icons">expand_more</i>
          </a>
          <ul className="dropdown-content" id="cat{{$id}}">
            <li data-ng-repeat="type in types track by $index" data-ng-hide="value(type) === value(selected(types))"
              data-ng-click="changeType(type, $index)">
              <a><i className="material-icons">{'to be changed'}}</i>{'to be changed'}</a>
            </li>
          </ul>
        </div>

        <a data-ng-if="opts.shrunk" className="btn" data-ng-click="exit()"><i className="material-icons">close</i></a>
      </div>

      {/*<!-- Right controls -->*/}
      <div className="right chart-controls right-align">
        <div className="filters">

        </div>

        <div>
          <a data-ng-if="chartClass === 'treemap'" className="btn waves-effect waves-light" className="{'disabled': !treemapZoomItems.length}"
            data-ng-click="zoomOut()">
            <i className="material-icons">undo</i>
          </a>
          <a data-ng-if="chartClass === 'table'" className="btn waves-effect waves-light" data-ng-click="download()">
            <i className="material-icons">file_download</i>
          </a>
        </div>
      </div>

      {/*<!-- Middle toolbar -->*/}
      <div className="center-align">
        <div data-button-group data-items="opts.groupByButtons" data-opts="{type: opts.groupByType}"
          data-callback="onGroupByClick()"></div>
      </div>

    </div>
  );

};

export default ChartHeader;