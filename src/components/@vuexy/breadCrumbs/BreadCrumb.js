import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { NavLink } from "react-router-dom";
class BreadCrumbs extends React.Component {
  render() {
    return (
      <div className="content-header row w-100" style={{ display: "flex", }}>
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              {this.props.breadCrumbTitle ? (
                <h2 className="content-header-title float-left mb-0">
                  {this.props.breadCrumbTitle}
                </h2>
              ) : (
                ""
              )}
              <div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
                <Breadcrumb tag="ol">
                  <BreadcrumbItem tag="li">
                    <NavLink to="/">
                      <HomeRoundedIcon style={{ color: '#0184FF' }} fontSize='medium' />
                    </NavLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem tag="li" className="text-primary">
                    {this.props.breadCrumbParent}
                  </BreadcrumbItem>
                  {this.props.breadCrumbParent2 ? (
                    <BreadcrumbItem tag="li" className="text-primary">
                      {this.props.breadCrumbParent2}
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  {this.props.breadCrumbParent3 ? (
                    <BreadcrumbItem tag="li" className="text-primary">
                      {this.props.breadCrumbParent3}
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  <BreadcrumbItem tag="li" active>
                    {this.props.breadCrumbActive}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BreadCrumbs;
