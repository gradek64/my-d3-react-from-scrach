import React from 'react';
import modalVendor, {SimpleModal} from '../customized-vendors/modalVendor/';
import events from '../utils/events';
import {CONST_EVENTS as EVENTS } from '../utils/constants';



const withEventsBound = () =>(BaseComponent)=> {

   

    const bind = (fn, toggle) => (name) => {
        console.log('......BIND EVENTS FOR MODAL BY INSIDE MODAL.....');
        console.log(`events[${toggle}](${EVENTS[name]}, ${fn}) \n\n\n\n`);
        if (EVENTS[name]) {
            events[toggle](EVENTS[name], fn);
        } else {
            console.warn(`${name} does not exist in CONSTANTS.EVENTS`);
        }
    };

    const bindStringOrArray = (event, fn, toggle = 'on') => {
        if (Array.isArray(event)) {
            event.map(bind(fn, toggle));
        } else if (typeof event === 'string') {
            bind(fn, toggle)(event);
        }
    };

    const bindEvents = ({opts}) => {

        console.log('modalVendor',modalVendor);

        const onOpen = (fn)=>()=>{ fn(); };
        const onClose = ()=>{  };
        const openForced = () => onOpen;
        const closeForced = () => onClose;

        console.log(onOpen);

        //bindStringOrArray(opts.hideOn, closeForced);
        //bindStringOrArray(opts.shownOn, openForced);

        /* if (modal.closeButton) {
        modal.closeButton.addEventListener('click', onClose);
      }
      if (modal.overlay) {
        modal.overlay.addEventListener('click', onClose);
      }*/

        return {
            onOpen,
            onClose
        };

     
    };


    return (props) => {
        const events = bindEvents(props);
        return <BaseComponent {...props} listeners={events}/>;
    };
};
const customModal = withEventsBound()(modalVendor);

export default customModal;