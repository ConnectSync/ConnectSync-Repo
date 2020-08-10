// import React from 'react';
// import { connect } from 'react-redux';

// import WorkplacePopup from "../../../components/Popup/WorkplacePopup"

// import { getAllPublicWorkplaces } from "../../../redux/action/workplaces"

// const NoWorkplace = ({ openChangePopup, getAllPublicWorkplaces, popup }) => {
//   const popupOpenModal = (view) => {
//     openChangePopup(view);

//     getAllPublicWorkplaces();
//   };

//   const handleChange = (fieldName) => (event) => {
//     setWorkPlaceDetails({
//       ...worlplaceDetails,
//       [fieldName]: event.target.value,
//     });
//   };
//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center col-lg-6 px-5">
//       <div>
//         <h3 className="text-center mb-5">
//           You do not have any Workplace setup, Create or Join a Workplace to
//           continue
//         </h3>
//       </div>

//       <div>
//         <button
//           onClick={() => popupOpenModal('CREATE_WORKPLACE')}
//           className="btn btn-style btn-primary bg-primary px-5"
//         >
//           Create
//         </button>
//         <button
//           onClick={() => popupOpenModal('JOIN__WORKPLACE')}
//           className="btn btn-style btn-primary bg-warning px-5 mx-2"
//         >
//           Join
//         </button>
//       </div>

//       {popup.activePopup == 'CREATE_WORKPLACE' ||
//         (popup.activePopup == 'JOIN__WORKPLACE' && (
//           <WorkplacePopup type={popup.activePopup} data={popup.data} />
//         ))}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   popup: state.popup,
// });

// export default connect(mapStateToProps, {
//   getAllPublicWorkplaces,
//   openChangePopup,
// })(NoWorkplace);
