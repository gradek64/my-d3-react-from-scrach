import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
// import ModalCustom from '../../../components/modal';
// import resourceTypeMockService from '../../../services/resource-types-mock';

import CostPotBox from './costPotBox';
import levelsMockService from '../../../services/levels-mock';
import costpotsMockService from '../../../services/costpots-mock';
import ModalCustom from '../../../customized-vendors/modalVendor';

import _ from '../../../utils/misc';
import events from '../../../utils/events';
import './scss/costpots.scss';

/* const buildResourceTypeItem = e => ({
  label: e.label,
  value: { type: e.label, id: e.value.id },
});
const buildInfrastructureLevelItem = e => ({
  label: e.name,
  value: {
    id: e.id,
    classification: 'INFRASTRUCTURE',
    parentId: null,
  },
}); */

class CostPots extends React.Component {
  constructor(props) {
    super(props);
    // levels
    this.getLevels()
      .then(res => res.data)
      .then(levels => levels.sort(_.compareFactory('order', false, true)))
      .then((allLevels) => {
        // costPots;
        this.getCostPots()
          .then(res => res.data)
          .then((allCostPosts) => {
            this.setState({
              allLevels,
              allCostPosts,
            });
          });
      });
  }

  state = {
    allLevels: null,
    allCostPosts: null,
  }

  componentDidMount() {
    const { costModelId } = this.props;

    this.breadcrumbsLinks = [
      {
        href: '/admin/cost-models',
        label: 'Cost Models',
      },
      {
        href: `/admin/cost-models/${costModelId}/costpots`,
        label: 'Model Config',
      },
    ];
  }

getLevels = () => levelsMockService.getAll()
getCostPots = () => costpotsMockService.getAll(this.props.costModelId)

breadcrumbsLinks = [];

deleteCostPot(costPotName) {
  this.setState({ costPotToDelete: costPotName });
  events.emit('OPEN_MODAL');
}

render() {
  const { allLevels, allCostPosts } = this.state;

  // list of hero icons here temporary before U make some configuration file
  const heroIcons = {
    36: 'code',
    37: 'backup',
    38: 'backup',
    39: 'backup',
    40: 'backup',
    41: 'backup',
    42: 'backup',
    43: 'backup',
    44: 'backup',
    45: 'backup',
    46: 'build',
    47: 'backup',
    48: 'card_travel',

  };

  if (allLevels) {
    return (
      <div className="costpots">
        <AppBar position="static" color="default" className="breadcrumbsLinks">

          <div >
            <Typography component="h6" variant="subtitle1" gutterBottom>
              {
                /* avoid using <a> tags cause they reload
                entire page causing lag use NavLink instead */

                this.breadcrumbsLinks.map(({ href, label }, id) =>
                  (
                    <NavLink to={href} key={`bread${id}`}>
                      {label}
                      {(id !== this.breadcrumbsLinks.length - 1) ? ' > ' : null}
                    </NavLink>
                  ))
              }
            </Typography>
          </div>
        </AppBar>
        <div className="section graph">

          {
            allLevels.map((levelProps, id) => (
              <div className="row" key={`level${id}`}>
                <div className="levelCostPots" key={`costpot${id}`}>
                  {allCostPosts ?
                    allCostPosts.map((attrs, index) => {
                      if (levelProps.id === attrs.levelId) {
                        const { configurationId: costModelId, id: costPotId } = attrs;
                        return (
                          <CostPotBox
                            key={`costpotBox${index}`}
                            name={attrs.name}
                            heroIcon={heroIcons[36 + id]}
                            actionIcons={{
                              delete: { icon: 'delete', action: () => { this.deleteCostPot(attrs.name); }, linkParams: null },
                              android: {
                                icon: 'androidIcon',
                                action: null,
                                linkParams: { costModelId, costPotId },
                              },
                              assignment_turned_in: {
                                icon: 'assignment_turned_inIcon',
                                action: null,
                                linkParams: { costModelId, costPotId },
                              },
                            }}
                            hideDelete={levelProps.domainId !== 3}
                            hideAndroid={levelProps.domainId !== 3}
                          />
                        );
                      }
                      return null;
                    })
                    : null}
                </div>
                <h6 className={`level-name domain-${levelProps.domainId}`} >{levelProps.name}</h6>
              </div>
            ))
          }


        </div>
        {/* deleteCostPot Modal */}
        <div>
          <ModalCustom isOpen={false} >
            <Typography component="h3" variant="h3" gutterBottom style={{ textAlign: 'center' }}>
                  are you sure U want to delete {this.state.costPotToDelete}?
            </Typography>
            <Button variant="contained" color="primary" className="buttonConfirm" onClick={() => { events.emit('CLOSE_MODAL'); }}>Delete</Button>
            <Button variant="contained" color="primary" className="buttonCancel" onClick={() => { events.emit('CLOSE_MODAL'); }}>Cancel</Button>
          </ModalCustom>
        </div>
      </div>
    );
  }
  return '....preloading';
}
}

CostPots.propTypes = {
  costModelId: PropTypes.string.isRequired,
};

// add router to this component for getting currenct route params;
// it will be attached to the props as props.location for location;
export default withRouter(CostPots);

