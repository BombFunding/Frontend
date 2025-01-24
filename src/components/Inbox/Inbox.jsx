// import React from 'react';
// import styles from './Inbox.module.scss'; // Importing the SCSS module

// const NotificationMenu = () => {
//   return (
//     <>
//       <nav>
//         <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['left']}`}>menu</i>

//         <span></span> {/* Replaced <spacer> with <span> */}

//         <div className={`${styles['notification-icon']} ${styles['right']}`}>
//           <i className={`${styles['material-icons']} ${styles['dp48']}`}>email</i>
//           <span className={styles['num-count']}>2</span>
//         </div>

//         <div className={`${styles['notification-icon']} ${styles['right']}`}>
//           <i className={`${styles['material-icons']} ${styles['dp48']}`}>notifications</i>
//           <span className={styles['num-count']}>13</span>
//         </div>

//         <div className={styles['profile']}>
//           <span className={styles['user-photo']}></span>
//           <span className={`${styles['first-name']} ${styles['right']}`}>Kate Kim</span>
//         </div>
//       </nav>

//       <main>
//         <div className={styles['notification-container']}>
//           <h3>
//             Notifications
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['right']}`}>settings</i>
//           </h3>

//           <input className={styles['checkbox']} type="checkbox" id="size_1" value="small" checked />
//           <label className={`${styles['notification']} ${styles['new']}`} htmlFor="size_1">
//             <em>1</em> new <a href="">guest account(s)</a> have been created.
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['right']}`}>clear</i>
//           </label>

//           <input className={styles['checkbox']} type="checkbox" id="size_2" value="small" checked />
//           <label className={`${styles['notification']} ${styles['new']}`} htmlFor="size_2">
//             <em>3</em> new <a href="">lead(s)</a> are available in the system.
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['right']}`}>clear</i>
//           </label>

//           <input className={styles['checkbox']} type="checkbox" id="size_3" value="small" checked />
//           <label className={styles['notification']} htmlFor="size_3">
//             <em>5</em> new <a href="">task(s)</a>.
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['right']}`}>clear</i>
//           </label>

//           <input className={styles['checkbox']} type="checkbox" id="size_4" value="small" checked />
//           <label className={styles['notification']} htmlFor="size_4">
//             <em>9</em> new <a href="">calendar event(s)</a> are scheduled for today.
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['right']}`}>clear</i>
//           </label>

//           <input className={styles['checkbox']} type="checkbox" id="size_5" value="small" checked />
//           <label className={styles['notification']} htmlFor="size_5">
//             <em>1</em> blog post <a href="">comment(s)</a> need approval.
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['right']}`}>clear</i>
//           </label>
//         </div>

//         <div className={styles['profile-container']}>
//           <a className={styles['right']}>
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['right']}`}>settings</i>
//           </a>

//           <span className={`${styles['user-photo']} ${styles['left']}`}></span>

//           <h1 className={styles['user-name']}>
//             <a>Kate Kim</a>
//           </h1>
//           <span className={styles['user-email']}>ahdjdhajdjnfej@gmail.com</span>

//           <div className={styles['switch']}>
//             <input
//               id="language-toggle"
//               className={`${styles['check-toggle']} ${styles['check-toggle-round-flat']}`}
//               type="checkbox"
//             />
//             <label htmlFor="language-toggle"></label>

//             <span className={styles['on']}>EN</span>
//             <span className={styles['off']}>FR</span>
//           </div>

//           <hr />
//           <button className={`${styles['button']} ${styles['secondary-button']} ${styles['left']}`}>
//             Switch User
//           </button>
//           <button className={`${styles['button']} ${styles['primary-button']} ${styles['right']}`}>
//             Sign Out
//           </button>
//         </div>

//         <ul className={styles['menu']}>
//           <li>
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['gray']} ${styles['left']}`}>
//               dashboard
//             </i>
//             News Feed
//           </li>
//           <li>
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['gray']} ${styles['left']}`}>
//               home
//             </i>
//             Properties
//           </li>

//           <li className={`${styles['dropdown']} ${styles['active']}`}>
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['teal']} ${styles['left']}`}>
//               supervisor_account
//             </i>
//             Client Relations
//             <i className={`${styles['material-icons']} ${styles['dp48']}`}>expand_more</i>
//             <ul className={styles['active']}>
//               <li className={styles['active']}>
//                 Tasks & Activities <span className={`${styles['num-count']} ${styles['gray-bg']}`}>13</span>
//               </li>
//               <li>Contacts</li>
//               <li>Marketing</li>
//               <li>Action Plans</li>
//               <li>Calendar</li>
//               <li>Guest Accounts</li>
//             </ul>
//           </li>

//           <li className={styles['dropdown']}>
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['gray']} ${styles['left']}`}>
//               timeline
//             </i>
//             Reporting
//             <i className={`${styles['material-icons']} ${styles['dp48']}`}>expand_more</i>
//           </li>
//           <li className={styles['dropdown']}>
//             <i className={`${styles['material-icons']} ${styles['dp48']} ${styles['gray']} ${styles['left']}`}>
//               face
//             </i>
//             Users
//             <i className={`${styles['material-icons']} ${styles['dp48']}`}>expand_more</i>
//           </li>
//         </ul>

//         <div className={styles['content']}></div>
//       </main>
//     </>
//   );
// };

// export default NotificationMenu;
