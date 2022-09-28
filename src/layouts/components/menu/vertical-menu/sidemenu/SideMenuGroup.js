// import React from "react"
// import { Link } from "react-router-dom"
// import { Badge } from "reactstrap"
// import classnames from "classnames"
// import { ChevronRight } from "react-feather"
// import { FormattedMessage } from "react-intl"
// import axios from "axios"
// const baseUrl = process.env.REACT_APP_BASE_URL;

// class SideMenuGroup extends React.Component {
//   constructor(props) {
//     super(props)
//     this.flag = true
//     this.parentArray = []
//     this.childObj = {}
//   }
//   state = {
//     isOpen: false,
//     activeItem: this.props.activePath,
//     student: {
//       active: 0,
//       active_trial: 0,
//       after_school: 0,
//       camp: 0,
//       former: 0,
//       former_trail: 0,
//       leads: 0,
//       total: 0
//     }
//   }

//   handleActiveItem = url => {
//     this.setState({
//       activeItem: url
//     })
//   }

//   async componentDidMount() {
//     let _state = this;
//     let response = await axios.get(`${baseUrl}/api/memeber/std_count/${localStorage.getItem("user_id")}`,
//       {
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("access_token")}`
//         }
//       });
//     if (response.data && response.status === 200) {
//       let data = response.data;
//       _state.setState({ student: data });
//     }
//     return;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.activePath !== this.props.activePath) {
//       if (this.childObj.navLink && this.childObj.collapsed) {
//         this.props.collapsedMenuPaths(this.childObj.navLink)
//       }
//       if (
//         this.props.activePath === this.childObj.navLink &&
//         !this.props.parentArr.includes(this.parentArray[0])
//       ) {
//         this.props.parentArr.splice(0, this.props.parentArr.length)
//         this.props.parentArr.push(this.parentArray)
//       } else if (this.props.parentArr.includes(this.parentArray)) {
//         this.props.parentArr.splice(0, this.props.parentArr.length)
//       }
//     }
//   }

//   handleTitleDisplay(title) {
//     if (title === "Active Students") {
//       return this.state.student.active;
//     } else if (title === "Active Trials") {
//       return this.state.student.active_trial;
//     } else if (title === "Lead") {
//       return this.state.student.leads;
//     } else if (title === "Former Student") {
//       return this.state.student.former;
//     } else if (title === "Former Trial") {
//       return this.state.student.former_trail;
//     } else if (title === "After School") {
//       return this.state.student.after_school;
//     } else if (title === "Camp") {
//       return this.state.student.camp;
//     }
//   }

//   renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
//     return (
//       <ul className="menu-content">
//         {item.children
//           ? item.children.map(child => {
//             const CustomAnchorTag =
//               child.type === "external-link" ? `a` : Link
//             if (!this.parentArray.includes(item.id) && this.flag) {
//               this.parentArray.push(item.id)
//             }

//             if (child.navlink && child.collapsed) {
//               this.props.collapsedMenuPaths(child.navLink)
//             }

//             if (this.props.activeItemState === child.navLink) {
//               this.childObj = child
//               this.props.parentArr.push(this.parentArray)
//               this.flag = false
//             }
//             if (
//               (child.permissions &&
//                 child.permissions.includes(this.props.currentUser)) ||
//               child.permissions === undefined
//             ) {
//               return (
//                 <li
//                   key={child.id}
//                   className={classnames({
//                     hover: this.props.hoverIndex === child.id,
//                     "has-sub": child.type === "collapse",
//                     open:
//                       child.type === "collapse" &&
//                       activeGroup.includes(child.id),
//                     "sidebar-group-active": this.props.currentActiveGroup.includes(
//                       child.id
//                     ),
//                     active:
//                       (this.props.activeItemState === child.navLink &&
//                         child.type === "item") ||
//                       (item.parentOf &&
//                         item.parentOf.includes(this.props.activeItemState)),
//                     disabled: child.disabled
//                   })}
//                   onClick={e => {
//                     e.stopPropagation()
//                     handleGroupClick(child.id, item.id, child.type)
//                     if (child.navLink && child.navLink !== undefined) {
//                       handleActiveItem(child.navLink)
//                     }
//                     if (
//                       this.props.deviceWidth <= 1200 &&
//                       child.type === "item"
//                     ) {
//                       this.props.toggleMenu()
//                     }
//                   }}>
//                   <CustomAnchorTag
//                     className={classnames({
//                       "d-flex justify-content-between":
//                         child.type === "collapse"
//                     })}
//                     to={
//                       child.navLink && child.type === "item"
//                         ? child.navLink
//                         : ""
//                     }
//                     href={child.type === "external-link" ? child.navLink : ""}
//                     onMouseEnter={() => {
//                       this.props.handleSidebarMouseEnter(child.id)
//                     }}
//                     onMouseLeave={() => {
//                       this.props.handleSidebarMouseEnter(child.id)
//                     }}
//                     key={child.id}
//                     onClick={e => {
//                       return child.type === "collapse"
//                         ? e.preventDefault()
//                         : ""
//                     }}
//                     target={child.newTab ? "_blank" : undefined}>
//                     <div className="menu-text d-flex justify-content-start"  >
//                       {child.icon}
//                       <div className="menu-item menu-title" title={child.title}>
//                         <FormattedMessage id={child.title} />
//                       </div>
//                       <Badge
//                           // color={child.badge}
//                         className="float-right" 
//                         style={{marginLeft:'6px',background:'#ebf8fe',color:'#1b60aa',boxShadow:'none'}}
//                         pill>
//                         {this.handleTitleDisplay(child.title)}
//                       </Badge>
//                     </div>
//                     {child.badge ? (
//                       <Badge
//                         color={child.badge}
//                         className="float-right mr-2"
//                         pill>
//                         {child.badgeText}
//                       </Badge>
//                     ) : (
//                       ""
//                     )}
//                     {child.type === "collapse" ? (
//                       <ChevronRight className="menu-toggle-icon" size={13} />
//                     ) : (
//                       ""
//                     )}
//                   </CustomAnchorTag>

//                   {child.children
//                     ? this.renderChild(
//                       child,
//                       activeGroup,
//                       handleGroupClick,
//                       handleActiveItem,
//                       item.id
//                     )
//                     : ""}
//                 </li>
//               )
//             } else if (
//               child.navLink === this.props.activePath &&
//               !child.permissions.includes(this.props.currentUser)
//             ) {
//               return this.props.redirectUnauthorized()
//             } else {
//               return null
//             }
//           })
//           : null}
//       </ul>
//     )
//   }

//   render() {
//     return (
//       <React.Fragment>
//         {this.renderChild(
//           this.props.group,
//           this.props.activeGroup,
//           this.props.handleGroupClick,
//           this.props.handleActiveItem,
//           null
//         )}
//       </React.Fragment>
//     )
//   }
// }
// export default SideMenuGroup
// import React from 'react'
// import { GET_COUNT_OF_STUDENT_BY_TYPE } from '../../../../../redux/actions/member'


// const SideMenuGroup = () => {
// const { GET_COUNT_OF_STUDENT_BY_TYPE, getCountOfStudentByType } = props

// useEffect(() => {
//   GET_COUNT_OF_STUDENT_BY_TYPE()
// }, [GET_COUNT_OF_STUDENT_BY_TYPE])
//   return (
//     <div>
     
//     </div>
//   )
// };
// const mapStateToProps = (state) => {
//   return {
//     getCountOfStudentByType: state.member.getCountOfStudentByType
//   }
// }
// export default  connect(mapStateToProps, { GET_COUNT_OF_STUDENT_BY_TYPE })(SideMenuGroup)
