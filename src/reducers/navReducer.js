//import  { AppNavigation }  from "../navigation/AppNavigation";

// let Navigator = AppNavigation;
//
// if (!AppNavigation) {
//     Navigator = {
//         router: {
//             getStateForAction: () => {
//                 index: 0,
//                     routes: [{ key: 'Home', routeName: 'Home' }];
//             },
//             getActionForPathAndParams: () => null,
//         },
//     };
// }


// const initialState = AppNavigation.router.getStateForAction(AppNavigation.router.getActionForPathAndParams("Login"));
//
// export const navReducer = (state=initialState, action) => {
//   const newState = AppNavigation.router.getStateForAction(action, state);
//   return newState || state;
// };
