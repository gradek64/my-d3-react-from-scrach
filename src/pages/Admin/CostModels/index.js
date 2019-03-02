import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ModalCustom from '../../../customized-vendors/modalVendor';
import SimpleTable from '../../../components/SimpleTable';
import costModelService from '../../../services/cost-model-mock';
import CreateCostModel from './CreateCostModelForm/createCostModelForm';
import UpdateCostModel from './UpdateCostModelForm/UpdateCostModelForm';
import events from '../../../utils/events';
import './costModelPage.scss';

class CostModel extends React.Component {
  constructor(props) {
    super(props);
    costModelService.getAll().then((response) => {
      const { data } = response;
      const selectDropdownData = data.map(this.buildSelectItem);
      this.setState({
        data,
        selectDropdownData,
        breadcrumbsLinks: [
          {
            href: '/admin/cost-models',
            label: 'Cost Models',
          },
        ],
      });
    });
  }

  state = {
    data: null,
    selectedCostPot: null,
    selectedCostPotID: null,
    selectDropdownData: null,
    breadcrumbsLinks: [],
  }


  onDataChanged = (cbUpdateData, cbPageUpdatePagination, page, rowsPerPage) => {
    // this.assigned gets callback from DataTableWithPagination
    this.assigned = cbUpdateData;
    this.paginationUpdate = cbPageUpdatePagination;
    this.page = page;
    this.rowsPerPage = rowsPerPage;
    this.lastPage = Math.floor(this.state.data.length / rowsPerPage);
  }


  onDelete = async (costPotID) => {
  // find array index from costPots array;
    const arrayIndex = this.state.data.findIndex(arrEl => arrEl.id === costPotID);
    // update state
    this.setState(prevState => ({
      data: [...prevState.data.slice(0, arrayIndex), ...prevState.data.slice(arrayIndex + 1)],
    }), () => {
    // update database with override
      this.overrideDataBase(this.state.data);
      // update table pagination;
      this.assigned(this.page, this.rowsPerPage);
    });
    // close modal
    events.emit('CLOSE_MODAL');
  }

onCreate = (item) => {
  // update data in state; (recommeded way of update)
  this.setState(
    { data: [...this.state.data, item] }
    // callback from state
    , () => {
      this.overrideDataBase(this.state.data);
      // jump to the last page in pagination;
      this.assigned(this.lastPage, this.rowsPerPage);
      // update pagination as last page;
      this.paginationUpdate(null, this.lastPage);
      // close Modal
      events.emit('CLOSE_MODAL');
    },
  );
}

onUpdate = (costPotID, { name }) => {
  let updateObject;
  const updateModelArr = this.state.data.map((costModel) => {
    if (costModel.id === costPotID) {
      updateObject = { ...costModel, name };
      return updateObject;
    }
    return costModel;
  });
  this.setState(() => ({
    data: [...updateModelArr],
  }), () => {
    // update database;
    const dataArrIndex = this.state.data.findIndex(el => el.id === costPotID);
    this.updateDatabaseOnUpdate(dataArrIndex, updateObject);
    // update view
    this.assigned(this.page, this.rowsPerPage);
    // close modal
    events.emit('CLOSE_MODAL');
  });
}

getCostPotName = ({ name, costPotId }) => {
  this.setState(() => ({
    selectedCostPot: name,
    selectedCostPotID: costPotId,
  }));
}

updateDatabaseOnUpdate = async (id, item) => {
  await costModelService.update(id, item);
}

overrideDataBase = async (data) => {
  await costModelService.override(data);
}

buildSelectItem = ({ name, type, configurationNumber }) => ({
  value: configurationNumber,
  optionName: name,
  type,
})

render() {
  const { breadcrumbsLinks, selectedCostPot } = this.state;

  return (
    <div className="costModelPage">
      <AppBar position="static" color="default" className="breadcrumbsLinks">
        <div >
          <Typography component="h6" variant="subtitle1" gutterBottom>
            {
            /* avoid using <a> tags cause they reload entire page causing lag use NavLink instead */

              breadcrumbsLinks.map(({ href, label }, id) =>
                (
                  <a href={href} key={`bread${id}`} >{label}
                    {(id !== breadcrumbsLinks.length - 1) ? '>' : null}
                  </a>
                ))
            }
          </Typography>
        </div>
      </AppBar>

      {/* pae title and button for creating costmodel */}
      <div className="pageTop">
        <Typography component="h4" variant="h4" gutterBottom>
                  Costpots
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { events.emit('OPEN_MODAL'); }}
        >Create CostModel
        </Button>
      </div>

      {/* display table here */}
      {this.state.data ? this.state.data.length : null}
      {this.state.data ?
        <div>
          <SimpleTable data={this.state.data} updateData={this.onDataChanged} pageTableOn="costModels" />
          <div>
            <ModalCustom isOpen={false} >
              <CreateCostModel
                selectDropdownData={this.state.selectDropdownData}
                onSubmit={this.onCreate}
              />
            </ModalCustom>
            <ModalCustom isOpen={false} eventToTrigger="OPEN_MODAL_SECOND" receiveEventPayload={this.getCostPotName}>
              <UpdateCostModel
                selectDropdownDataFixed={selectedCostPot}
                onSubmit={(namePass) => { this.onUpdate(this.state.selectedCostPotID, namePass); }}
              />
            </ModalCustom>
            <ModalCustom isOpen={false} eventToTrigger="OPEN_MODAL_THIRD" receiveEventPayload={this.getCostPotName}>
              <Typography component="h3" variant="h3" gutterBottom style={{ textAlign: 'center' }}>
                  are you sure U want to delete { selectedCostPot }?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="buttonConfirm"
                onClick={() => { this.onDelete(this.state.selectedCostPotID); }}
              >
              Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="buttonCancel"
                onClick={() => { events.emit('CLOSE_MODAL'); }}
              >Cancel
              </Button>
            </ModalCustom>

          </div>
        </div>
        : '....preloading'}

    </div>
  );
}
}
export default CostModel;
