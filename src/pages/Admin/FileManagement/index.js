import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import costpotsMockService from '../../../services/costpots-mock';
import SimpleTable from '../../../components/SimpleTable';
import ModalCustom from '../../../customized-vendors/modalVendor';
import fileTypesMockService from '../../../services/filetypes-mock';
import filesMockService from '../../../services/files-mock';
// import costModelService from '../../../services/cost-model-mock';
// import DropDownSelect from '../../../components/selectDropdown';
import UploadFileForm from './fileUploadForm/uploadFileForm';
import events from '../../../utils/events';
import './fileManagement.scss';

class FileManagement extends React.Component {
  constructor(props) {
    super(props);
    // get costpots
    costpotsMockService.getAll(props.costModelId)
      .then(res => res.data)
      .then(costPots => costPots.find(current => current.id === Number(props.costPotId)))
      .then((currentCostPot) => {
      // set costPot Name;
        this.setState({ costPotName: currentCostPot.name });
        return currentCostPot;
      })
      .then(currentCostPot => fileTypesMockService.getAll(currentCostPot.resourceTypeId))
      .then(fileTypesData => fileTypesData.data)
      .then(fileService => filesMockService.getAll(fileService))
      .then(fileData => fileData.data)
      .then((files) => {
      // final files
        this.setState({ data: files });
      });
  }

state = {
  data: null,
}

async componentDidMount() {
  const { costModelId, costPotId } = this.props;

  this.breadcrumbsLinks = [
    {
      href: '/admin/cost-models',
      label: 'Cost Models',
    },
    {
      href: `/admin/cost-models/${costModelId}/costpots`,
      label: 'Model Config',
    },
    {
      href:
              `/admin/cost-models/${
                costModelId
              }/costpots/${
                costPotId
              }/file-management`,
      label: 'File Management',
    },
  ];
}
breadcrumbsLinks = [];

render() {
  const { costPotName, data } = this.state;

  return (
    <div className="fileManagement">
      <AppBar position="static" color="default" className="breadcrumbsLinks">

        <div >
          <Typography component="h6" variant="subtitle1" gutterBottom>
            {
              /* avoid using <a> tags cause they reload entire
              page causing lag use NavLink instead */
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
      <div className="pageTop">
        <Typography component="h4" variant="h4" gutterBottom>
                  File Management for {costPotName || '...loading'}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => { events.emit('OPEN_MODAL'); }} >Upload file</Button>
      </div>
      {data ? <SimpleTable data={data} pageTableOn="fileManagement" /> : '....preloading' }
      {/* end of files  table data */}

      {/* upload File Modal */}
      <div>
        <ModalCustom isOpen={false} >
          <UploadFileForm />
        </ModalCustom>
      </div>
      {/* end of upload File Modal */}

    </div>
  );
}
}

FileManagement.propTypes = {
  costModelId: PropTypes.string.isRequired,
  costPotId: PropTypes.string.isRequired,
};
export default withRouter(FileManagement);
