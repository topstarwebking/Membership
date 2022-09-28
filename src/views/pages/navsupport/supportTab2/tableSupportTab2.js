import React from "react";
import { GET_SUPPORT_VIEW_TICKET } from "../../../../redux/actions/support";
import { connect } from "react-redux";
import TicketTable from "../componets/table";

class TicketsTablesMain extends React.Component {
  state = {
    rowData: [],
    loading: true,
  };

  componentDidMount() {
    this.props.GET_SUPPORT_VIEW_TICKET();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.supportViewTicket !== this.props.supportViewTicket) {
      this.setState({
        rowData: this.props.supportViewTicket,
        loading: false,
      });
    }
  }

  render() {
    const { rowData, loading } = this.state;
    return (
      <div>
        <TicketTable data={rowData} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    supportViewTicket: state.support.supportViewTicket,
  };
};

export default connect(mapStateToProps, { GET_SUPPORT_VIEW_TICKET })(
  TicketsTablesMain
);
