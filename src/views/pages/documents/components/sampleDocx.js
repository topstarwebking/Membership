import React from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import { Download } from "react-feather";
import { Button } from "@material-ui/core";

class SampleDocx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
    };
  }

  async generateFromUrl() {
    const doc = new Document();
    // const blob = await fetch(
    //   ""
    // ).then(r => r.blob());

    // const image1 = Media.addImage(doc);

    doc.addSection({
      children: [
        new Paragraph(
          "name={firstName}, program={program}, email={email}, phone= {primary_no}, DOB= {dob},Current rank={current_rank_name}, Next rank={next_rank_name}, Age={age},studentType={studentType}, Status={staus} ,Gender={gender} ,primaryPhone={primaryPhone},secondaryPhone={secondaryPhone},street={street},town={town},country={country},zipPostalCode={zipPostalCode},location={location},studentBeltSize={studentBeltSize}, category={category} ,subcategory={subcategory},leadsTracking={leadsTracking},after_camp={after_camp},school={school},current_rank_img={current_rank_img},next_rank_img={next_rank_img},belt_rank_name={belt_rank_name},candidate={candidate},current_stripe={current_stripe},category={category}"
        ),
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
    });
  }

  render() {
    return (
      <div>
        <Button
          type="button"
          size="small"
          startIcon={
            <Download
              style={{ color: "#0184FF", fontWeight: "600", fontSize: "16px" }}
            />
          }
          onClick={this.generateFromUrl}
          fontSize="16px"
          style={{
            textTransform: "none",
            fontWeight: "600",
            color: "#0184FF",
            padding: "10px 10px",
            width: "100%",
            borderRadius: "6px",
            borderColor: "rgb(1, 132, 255)",
          }}
          variant="outlined"
        >
          Download Merge Key
        </Button>
      </div>
    );
  }
}

export default SampleDocx;
