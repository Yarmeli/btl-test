import { ExamCenter, Owner } from "@prisma/client";
import { Button, Table } from "react-daisyui";

type TableProps = {
  headers: String[];
  examsTableData?: (ExamCenter & { owner: Owner })[];
  ownersTableData?: Owner[];
};

const TableComponent = ({
  headers,
  examsTableData,
  ownersTableData,
}: TableProps) => {
  return (
    <Table zebra>
      <thead>
        <tr>
          <th>
            <span />
          </th>

          {headers.map((e, idx) => (
            <th key={idx}>
              <span>{e}</span>
            </th>
          ))}

          <th>
            <span />
          </th>
          <th>
            <span />
          </th>
        </tr>
      </thead>

      <Table.Body>
        {/* MAP Each entry */}

        {examsTableData &&
          examsTableData.map((e, idx) => (
            <Table.Row hover key={idx}>
              <span>{idx + 1}</span>
              <span>{e.name}</span>
              <span>{e.address}</span>
              <span>{e.town}</span>
              <span>{e.owner.username}</span>
              <span>{e.country}</span>
              <Button className="bg-success-content">Edit</Button>
              <Button className="bg-error">Delete</Button>
            </Table.Row>
          ))}

        {ownersTableData &&
          ownersTableData.map((e, idx) => (
            <Table.Row hover key={idx}>
              <span>{idx + 1}</span>
              <span>{e.username}</span>
              <span>{e.password}</span>
              <span>{e.forename}</span>
              <span>{e.surname}</span>
              <span>{e.dob.toLocaleDateString()}</span>
              <span>{e.gender}</span>
              <Button className="bg-success-content">Edit</Button>
              <Button className="bg-error">Delete</Button>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
